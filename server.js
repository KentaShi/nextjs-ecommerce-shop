const express = require("express");
const next = require("next");
const { parse } = require("url");

const PORT = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get("/test", (req, res) => {
        const parseUrl = parse(req.url, true);
        const { pathName, query } = parseUrl;

        return app.render(req, res, parseUrl);
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server listening on port${PORT}`);
    });
});
