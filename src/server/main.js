import express from "express";
import ViteExpress from "vite-express";
import { readFileSync, writeFile } from 'fs';
import md5 from 'md5-node';
const data = JSON.parse(readFileSync('./admin.json', 'utf8'));
const app = express();
const feedbacks = JSON.parse(readFileSync('./feedbacks.json', 'utf8'));

const allowList = [ '/', '/projects', '/members', '/about', '/contact', '/@vite/client', '/@id/__x00__plugin-vue:export-helper' ];

// 添加JSON解析中间件
app.use(express.json());  // 用于解析 application/json
app.use(express.urlencoded({ 
    extended: true
})) 

app.post("/feedback", (req, res) => {
    const json = req.body; 
    feedbacks.push(json);
    writeFile('./feedbacks.json', JSON.stringify(feedbacks, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});

app.get("/getFeedbacks", (req, res) => {
    const { name, pwd } = req.query;
    const pwdMD5 = md5(pwd).toUpperCase();
    for (const item of data) {
      if (name == item.username && pwdMD5 == item.password) {
        res.json(feedbacks);
        return;
      }
    }
    res.sendStatus(401);
})

app.use((req, res, next) => {
  // 排除 Vue Router 前端路由路径
  if (allowList.includes(req.path)) {
    return next();
  }

  // 排除静态资源
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|json|client|vue|mjs)$/)) {
    return next();
  }
  
  res.status(404).send(`<!DOCTYPE HTML>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 找不到页面 - RainSTR Studio</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            h1 {
                font-size: 2em;
            }
            button {
                padding: 10px 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
                cursor: pointer;
            }
            button:hover {
                background-color: #e9e9e9;
            }
        </style>
    </head>
    <body>
        <div>
          <h1>很抱歉，找不到此页面</h1>
          <hr/>
          <button onClick="location.assign('/')">返回首页</button>
        </div>
    </body>
    </html>`);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);