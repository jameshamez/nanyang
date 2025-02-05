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
        url: "https://nanyang-james24.vercel.app",
        title: "ค้นหา Eco Type ในตัวคุณ!",
        description: "ฉันได้ Eco Type เป็นสายธรรมชาติ! มาดูกันว่าคุณจะได้ Eco Type สายไหน!",
        images: [
            {
                url: "https://nanyang-james24.vercel.app/image/s1.png",
                width: 500,
                height: 500,
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
            <meta property="fb:app_id" content="653004017158901"></meta>
            <meta property="og:url" content="https://nanyang-jl85.vercel.app" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Nan Yang Textile Group" />
            <meta property="og:description" content="ฉันได้คะแนน XX% ใน ECO Quiz! มาดูกันว่าคุณจะได้เท่าไหร่!" />
            <meta property="og:image" content="https://nanyang-jl85.vercel.app/image/ecoscore1.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="th_TH" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

            {/* ✅ Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Nan Yang Textile Group" />
            <meta name="twitter:description" content="ฉันได้คะแนน XX% ใน ECO Quiz! มาดูกันว่าคุณจะได้เท่าไหร่!" />
            <meta name="twitter:image" content="https://nanyang-jl85.vercel.app/image/ecoscore1.png" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
