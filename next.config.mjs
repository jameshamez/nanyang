/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    webpack: (config) => {
        return config; // ใช้ Webpack
    },
};

export default nextConfig;