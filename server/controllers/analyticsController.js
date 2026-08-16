const axios = require('axios');
const Visitor = require('../models/Visitor');
const PageView = require('../models/PageView');
const ClickEvent = require('../models/ClickEvent');
const { Op } = require('sequelize');

const initSession = async (req, res) => {
  try {
    const { sessionId, userAgent } = req.body;
    let ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // clean ipv6 localhost
    if (ipAddress === '::1') {
      ipAddress = '127.0.0.1';
    } else if (ipAddress && ipAddress.includes('::ffff:')) {
      ipAddress = ipAddress.split('::ffff:')[1];
    }

    let visitor = await Visitor.findOne({ where: { sessionId } });

    if (!visitor) {
      let geo = { country: 'Unknown', city: 'Unknown', lat: 0, lon: 0 };
      
      // Don't call IP API for localhost in dev to prevent errors, use dummy data
      if (ipAddress !== '127.0.0.1') {
        try {
          const geoRes = await axios.get(`http://ip-api.com/json/${ipAddress}`);
          if (geoRes.data.status === 'success') {
            geo = {
              country: geoRes.data.country,
              city: geoRes.data.city,
              lat: geoRes.data.lat,
              lon: geoRes.data.lon
            };
          }
        } catch (e) {
          console.error("GeoIP Error:", e.message);
        }
      }

      visitor = await Visitor.create({
        sessionId,
        ipAddress,
        country: geo.country,
        city: geo.city,
        lat: geo.lat,
        lon: geo.lon,
        userAgent
      });
    } else {
      visitor.lastActive = new Date();
      await visitor.save();
    }

    res.json({ success: true, visitorId: visitor.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trackPageview = async (req, res) => {
  try {
    const { sessionId, pageUrl, referrer } = req.body;
    const visitor = await Visitor.findOne({ where: { sessionId } });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });

    visitor.lastActive = new Date();
    await visitor.save();

    await PageView.create({
      visitorId: visitor.id,
      pageUrl,
      referrer
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trackClicks = async (req, res) => {
  try {
    const { sessionId, pageUrl, clicks } = req.body;
    const visitor = await Visitor.findOne({ where: { sessionId } });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });

    visitor.lastActive = new Date();
    await visitor.save();

    const clickData = clicks.map(c => ({
      visitorId: visitor.id,
      pageUrl,
      x: c.x,
      y: c.y,
      screenWidth: c.w,
      screenHeight: c.h
    }));

    await ClickEvent.bulkCreate(clickData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Active users in last 5 minutes
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeVisitors = await Visitor.findAll({
      where: { lastActive: { [Op.gte]: fiveMinsAgo } }
    });

    // Top pages (today)
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const pageviews = await PageView.findAll({
      where: { timestamp: { [Op.gte]: startOfDay } }
    });

    // Clicks for heatmap (we only return recent clicks to prevent huge payloads)
    // Client can pass a specific pageUrl to filter
    const { heatmapUrl } = req.query;
    let clicks = [];
    if (heatmapUrl) {
      clicks = await ClickEvent.findAll({
        where: { pageUrl: heatmapUrl },
        order: [['timestamp', 'DESC']],
        limit: 5000 // Limit to avoid crashing browser
      });
    }

    res.json({
      activeVisitors,
      activeCount: activeVisitors.length,
      pageviews: pageviews.length,
      clicks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initSession,
  trackPageview,
  trackClicks,
  getDashboardStats
};
