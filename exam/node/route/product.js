const Router = require("koa-router");
const router = new Router();
const db = require("../db");
const config = require("../config");
const api = config.api;

//渲染数据
router.get(`/${api}/showproduct`, async ctx => {
    let page = ctx.request.query.page ||1;
    let page_size = ctx.request.query.page_size ||3;
    let page_num = (page - 1) * page_size
        console.log(page_num,page_size)
    let [row] = await db.query(`select * from product limit ${page_num},${page_size}; select count(*) num from product `);
    console.log(row)
    // console.log(row[1][0].num)
    ctx.body = {
        code: 200,
        data: row[0],
        total:row[1][0].num
    }
})
//添加商品
router.post(`/${api}/addproduct`, async ctx => {

    let product_name = ctx.request.body.product_name;
    let product_price = ctx.request.body.product_price;
    let product_num = ctx.request.body.product_num;
    let datas = {
        product_name,
        product_price,
        product_num
    }
    let [row] = await db.query(`insert into product set ?`, datas);
    ctx.body = {
        code: "200",
    }
})
//删除商品
router.delete(`/${api}/delproduct/:id`, async ctx => {
    let id = ctx.params.id;
    let [row] = await db.query(`delete from product where id=${id}`);
    ctx.body = {
        code: "200",
        message: "删除成功"
    }
})
//更改商品
router.get(`/${api}/updateproduct/:id`, async ctx => {
    let id = ctx.params.id;
    console.log(id)
    let [row] = await db.query(`select * from product where id=${id}`);
    ctx.body = {
        code: "200",
        data: row
    }
})
//确定修改
router.put(`/${api}/updateproduct`, async ctx => {

    let product_name = ctx.request.body.product_name;
    let product_price = ctx.request.body.product_price;
    let product_num = ctx.request.body.product_num;
    let id = ctx.request.query.id
    console.log(id)
    const [row] = await db.query(`update product set product_name='${product_name}',product_price='${product_price}',product_num='${product_num}'where id=${id}`);
    ctx.body = {
        code: "200",
        message: "更改成功"
    }
})
module.exports = router