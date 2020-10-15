import { listenAndServe,
         acceptWebSocket,
         Response,
         acceptable,
         ServerRequest,
         renderFileToString,
       } from "./deps.ts";

import chat from "./chat.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

listenAndServe({ port: 5000 }, async (req) => {
    if (req.method === "GET" && req.url === "/ws") {
      if (acceptable(req)) {
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        }).then(chat);
      }
    }

    if (req.method === "GET" && req.url === "/") {
        req.respond({
          status:200,
          headers:  req.headers,
          body: await Deno.open('./pages/index.html'),
      })
    }

    if (req.method === "GET" && req.url === "/paper") {
        req.respond({
          status:200,
          headers:  req.headers,
          body: await Deno.open('./pages/paper.html'),
      })
    }

    if (req.method === "GET" && req.url === "/chat") {
        req.respond({
          status:200,
          headers:  req.headers,
          body: await Deno.open('./pages/chat.html'),
      })
    }

    if (req.method === "GET" && req.url === "/app.css") {
        req.respond({
          status:200,
          headers:  req.headers,
          body: await Deno.open('./pages/public/app.css'),
      })
    }

    if (req.method === "GET" && req.url === "/styles.css") {
        req.respond({
          status:200,
          headers:  req.headers,
          body: await Deno.open('./pages/public/styles.css'),
      })
    }
  });


console.log("Server started on port 5000");
