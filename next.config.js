/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: "http://localhost:3000",
        SERVER_CHAT: "http://localhost:5000/api",
        MONGODB_URL:
            "mongodb+srv://kentanam1197:Cxzzxccxzz%40mongodb11@cluster0.v3wiiw9.mongodb.net/next_ecommerce_app?retryWrites=true&w=majority",
        ACCESS_TOKEN_SECRET:
            "wE2c&tn.q]As-E:vD9B[cqfHxYmmA)r*@[?Qs<mGK'n*KdW6,",
        REFRESH_TOKEN_SECRET:
            "Bh~FC*{rR+X!Cr8CwN_wkaU{d+9%@#77!(5W(K(y*R.kUCm/UTRzcgc]3<;B",
    },
}

module.exports = nextConfig
