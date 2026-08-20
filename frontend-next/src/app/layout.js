import { Plus_Jakarta_Sans } from "next/font/google";
import "./index.css";
import "./App.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-main",
});

export const metadata = {
  title: "পছন্দের পণ্য বেছে নিন | kinaboo.com",
  description: "পছন্দের পণ্য বেছে নিন, হাতে পেয়ে টাকা দিন। সেরা পণ্য, সেরা দাম, নিরাপদ ডেলিভারি।",
  openGraph: {
    title: "পছন্দের পণ্য বেছে নিন | kinaboo.com",
    description: "পছন্দের পণ্য বেছে নিন, হাতে পেয়ে টাকা দিন। সেরা পণ্য, সেরা দাম, নিরাপদ ডেলিভারি।",
    siteName: "kinaboo.com",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "পছন্দের পণ্য বেছে নিন | kinaboo.com",
    description: "পছন্দের পণ্য বেছে নিন, হাতে পেয়ে টাকা দিন। সেরা পণ্য, সেরা দাম, নিরাপদ ডেলিভারি।",
    images: ["/og-default.jpg"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={plusJakartaSans.variable}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
