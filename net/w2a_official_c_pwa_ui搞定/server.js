const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 代理 /getcode -> 你的后端
app.use('/getcode', createProxyMiddleware({
  target: 'http://192.168.110.21:5050',
  changeOrigin: true,
}));

// 托管静态页面（把路径改成你的前端输出或源码目录）
app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('Dev server on http://192.168.110.21:3000');
});