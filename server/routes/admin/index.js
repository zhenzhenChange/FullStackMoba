module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })

  const multer = require("multer")
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })

  const AdminUser = require('../../models/AdminUser')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const HTTPAssert = require('http-assert')

  const authMiddleWare = require('../../middleware/auth')
  const resourceMiddleWare = require('../../middleware/resource')

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

  // 列表 限制20条数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parents'
    }

    res.send(await req.Model.find().setOptions(queryOptions).limit(20))
  })

  // 编辑返回
  router.get('/:id', async (req, res) => {
    res.send(await req.Model.findById(req.params.id))
  })

  // 中间件，将api地址(resource)转换成单数且首字母大写形式
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)

  // 上传文件
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`

    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    const user = await AdminUser.findOne({
      username
    }).select('+password')
    HTTPAssert(user, 422, '用户不存在')

    const isValid = bcrypt.compareSync(password, user.password)
    HTTPAssert(isValid, 422, "用户名和密码不匹配")

    // 生成token
    const token = jwt.sign({
      id: user._id,
      username: user.username
    }, app.get('token'))

    res.send({
      token
    })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}