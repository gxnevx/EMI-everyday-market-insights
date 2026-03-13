import "./globals.css";

export const metadata = {
  title: "EMI — Everyday Market Insights",
  description: "AI & Tech daily intelligence",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#F5F3E8",
  appleWebApp: {
    capable: true,
    title: "EMI",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
