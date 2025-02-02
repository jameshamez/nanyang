import { Geist, Geist_Mono } from "next/font/google";
import Head from 'next/head';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Nan Yang Textile Group",
    description: "ฉันได้คะแนน XX% ใน ECO Quiz! มาดูกันว่าคุณจะได้เท่าไหร่!",
    openGraph: {
        url: "https://nanyang-ss9w.vercel.app/result",
        title: "Nan Yang Textile Group",
        description: "Nan Yang Textile Group",
        images: [
            {
                url: "https://nanyang-ss9w.vercel.app/image/score1.png",
                width: 1200,
                height: 630,
                alt: "ECO Quiz Score",
            },
        ],
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="th">
        <Head>
            {/* ✅ Favicon ที่ถูกต้อง */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <meta name="theme-color" content="#ffffff" />

            {/* ✅ Open Graph Meta Tags */}
            <meta property="og:url" content="https://nanyang-ss9w.vercel.app" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Nan Yang Textile Group" />
            <meta property="og:description" content="ฉันได้คะแนน XX% ใน ECO Quiz! มาดูกันว่าคุณจะได้เท่าไหร่!" />
            <meta property="og:image" content="https://nanyang-ss9w.vercel.app/image/score1.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="th_TH" />

            {/* ✅ Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Nan Yang Textile Group" />
            <meta name="twitter:description" content="ฉันได้คะแนน XX% ใน ECO Quiz! มาดูกันว่าคุณจะได้เท่าไหร่!" />
            <meta name="twitter:image" content="https://nanyang-ss9w.vercel.app/image/score1.png" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
