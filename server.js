const express = require("express");
const next = require("next");
const { parse } = require("url");

const PORT = 3000;
const hostname = "localhost";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    //custom path /test, it will render file test.js in folder page/test.js
    // server.get("/test", (req, res) => {
    //     return app.render(req, res, "/test", req.query);
    // });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server is running on http://${hostname}:${PORT}`);
    });
});
