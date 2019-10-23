module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })

  // 新建
  router.post('/', async (req, res) => {
    res.send(await req.Model.create(req.body))
  })

  // 更新
  router.put('/:id', async (req, res) => {
    res.send(await req.Model.findByIdAndUpdate(req.params.id, req.body))
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 列表 限制10条数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parents'
    }
    res.send(await req.Model.find().setOptions(queryOptions).limit(10))
  })

  // 编辑返回
  router.get('/:id', async (req, res) => {
    res.send(await req.Model.findById(req.params.id))
  })

  // 中间件，将api地址(resource)转换成单数且首字母大写形式
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}