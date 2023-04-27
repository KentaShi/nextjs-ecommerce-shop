/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: "http://localhost:3000",
        MONGODB_URL:
            "mongodb+srv://kentanam1197:Cxzzxccxzz%40mongodb11@cluster0.v3wiiw9.mongodb.net/next_ecommerce_app?retryWrites=true&w=majority",
    },
};

module.exports = nextConfig;
