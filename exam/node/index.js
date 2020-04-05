const Koa = require('koa'); //引入koa
const koa = new Koa(); //实例化koa
const cors = require('@koa/cors'); //引入cors包
const body = require('koa-bodyparser'); //引入bodyparser包

koa.use(body())
koa.use(cors());

//引入路由
const product=require("./route/product");
koa.use(product.routes())
koa.use(product.allowedMethods());

koa.listen(7878);