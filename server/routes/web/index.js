module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')

  const newTitles = ["腾讯天美工作室群IP探索新动作，《魂斗罗：归来》联动《终结者》！", "皮影婉儿、人偶婉儿、纸雕婉儿、板绘婉儿...你Pick哪一个？", "新皮肤爆料丨一个技能三种形态，猜猜这位圣斗士是谁？", "《婉儿是怎么练成的》——揭秘婉儿学艺之路！", "七城灯火，与你共赏！《王者荣耀》周年庆千灯会正式开园", "11月5日全服不停机更新公告", "10月30日全服不停机修复公告", "10月30日全服不停机更新公告", "11月7日体验服停机更新公告", "11月6日体验服停机更新公告", "告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场", "感恩有你 李白新星元登场 峡谷全新福利来袭", "【周年许愿树】活动公告", "【周年庆典 明星抽内测】活动公告", "极致网速，快乐上分，中国电信邀你畅快赢好礼", "佛山“舞狮”助兴  城市赛全国半决赛精彩对抗即将来临！", "十校王者少年即将抵达战场, 王者荣耀高校联赛第三周火热备战！", "【KPL今日预报】DYG.JC vs EDG.M，DYG.JC目标胜者组", "回忆“彩云之滇”上的电竞，王者荣耀城市赛全国大赛圆满落幕！", "你是赛评师：AG超玩会“六一”天秀获常规赛第十胜，这样的AG你可以爱了吗？"]

  // 导入新闻数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parents: parent
    }).lean()
    const newList = newTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - .5)
      return {
        categories: randomCats.slice(0, 2),
        title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newList)
    res.send(newList)
  })

  // 新闻列表接口
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([{
      $match: {
        parents: parent._id
      }
    }, {
      $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'newList'
      }
    }, {
      $addFields: {
        newList: {
          $slice: ['$newList', 5]
        }
      }
    }])
    const subCats = cats.map(item => item._id)
    cats.unshift({
      name: '热门',
      newList: await Article.find().where({
        categories: {
          $in: subCats
        }
      }).populate('categories').limit(5).lean()
    })
    cats.map(cat => {
      cat.newList.map(item => {
        item.categoryName = (cat.name === "热门") ? item.categories[0].name : cat.name
        return item
      })
      return cat
    })
    res.send(cats)
  })

  app.use('/web/api', router)
}