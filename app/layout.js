import "./globals.css";

export const metadata = {
  title: "Intro - Book experts & get advice",
  description: "Book the world's most in-demand experts & get advice over a video call. Access founders, operators, designers, and creatives 1-on-1.",
  openGraph: {
    title: "Intro - Book experts & get advice",
    description: "Book the world's most in-demand experts & get advice over a video call",
    url: "https://intro.co",
    siteName: "Intro",
    images: [
      {
        url: "https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/6554005e6af2390f6b31ca26_main-sharesheet-img.jpeg",
        width: 1200,
        height: 630,
        alt: "Intro - Book experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/63928c8ab84b244d28d503f4_favicon%20(1).png",
    apple: "https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/63928d06629df369084f96f0_intro-icon-og-256.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
