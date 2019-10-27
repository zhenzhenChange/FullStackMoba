module.exports = options => {
  const jwt = require('jsonwebtoken')
  const HTTPAssert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const authorization = req.headers.authorization
    HTTPAssert(authorization, 401, "请先登录")
    const token = String(authorization || '').split(' ').pop()
    HTTPAssert(token, 401, "请先登录")
    const {
      id
    } = jwt.verify(token, req.app.get('token'))
    req.user = await AdminUser.findById(id)
    HTTPAssert(req.user, 401, "请先登录")
    await next()
  }
}