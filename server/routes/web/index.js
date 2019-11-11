module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  const newTitles = ["腾讯天美工作室群IP探索新动作，《魂斗罗：归来》联动《终结者》！", "皮影婉儿、人偶婉儿、纸雕婉儿、板绘婉儿...你Pick哪一个？", "新皮肤爆料丨一个技能三种形态，猜猜这位圣斗士是谁？", "《婉儿是怎么练成的》——揭秘婉儿学艺之路！", "七城灯火，与你共赏！《王者荣耀》周年庆千灯会正式开园", "11月5日全服不停机更新公告", "10月30日全服不停机修复公告", "10月30日全服不停机更新公告", "11月7日体验服停机更新公告", "11月6日体验服停机更新公告", "告别孤单 浪漫峡谷陪你狂欢 秒杀皮肤限时返场", "感恩有你 李白新星元登场 峡谷全新福利来袭", "【周年许愿树】活动公告", "【周年庆典 明星抽内测】活动公告", "极致网速，快乐上分，中国电信邀你畅快赢好礼", "佛山“舞狮”助兴  城市赛全国半决赛精彩对抗即将来临！", "十校王者少年即将抵达战场, 王者荣耀高校联赛第三周火热备战！", "【KPL今日预报】DYG.JC vs EDG.M，DYG.JC目标胜者组", "回忆“彩云之滇”上的电竞，王者荣耀城市赛全国大赛圆满落幕！", "你是赛评师：AG超玩会“六一”天秀获常规赛第十胜，这样的AG你可以爱了吗？"]
  const HeroesData = [{
    "name": "热门",
    "heroes": [{
      "name": "后羿",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
    }, {
      "name": "孙悟空",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
    }, {
      "name": "铠",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
    }, {
      "name": "鲁班七号",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
    }, {
      "name": "亚瑟",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
    }, {
      "name": "甄姬",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
    }, {
      "name": "孙尚香",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
    }, {
      "name": "典韦",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
    }, {
      "name": "韩信",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
    }, {
      "name": "庄周",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
    }]
  }, {
    "name": "战士",
    "heroes": [{
      "name": "赵云",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"
    }, {
      "name": "钟无艳",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"
    }, {
      "name": "吕布",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"
    }, {
      "name": "曹操",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"
    }, {
      "name": "典韦",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"
    }, {
      "name": "宫本武藏",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"
    }, {
      "name": "达摩",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"
    }, {
      "name": "老夫子",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"
    }, {
      "name": "关羽",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"
    }, {
      "name": "露娜",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"
    }, {
      "name": "花木兰",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"
    }, {
      "name": "亚瑟",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"
    }, {
      "name": "孙悟空",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"
    }, {
      "name": "刘备",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"
    }, {
      "name": "杨戬",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"
    }, {
      "name": "雅典娜",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"
    }, {
      "name": "哪吒",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"
    }, {
      "name": "铠",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"
    }, {
      "name": "狂铁",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"
    }, {
      "name": "李信",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"
    }, {
      "name": "盘古",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"
    }]
  }, {
    "name": "法师",
    "heroes": [{
      "name": "小乔",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"
    }, {
      "name": "墨子",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"
    }, {
      "name": "妲己",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"
    }, {
      "name": "嬴政",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"
    }, {
      "name": "高渐离",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"
    }, {
      "name": "扁鹊",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"
    }, {
      "name": "芈月",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"
    }, {
      "name": "周瑜",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"
    }, {
      "name": "甄姬",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"
    }, {
      "name": "武则天",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"
    }, {
      "name": "貂蝉",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"
    }, {
      "name": "安琪拉",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"
    }, {
      "name": "姜子牙",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"
    }, {
      "name": "王昭君",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"
    }, {
      "name": "张良",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"
    }, {
      "name": "不知火舞",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"
    }, {
      "name": "钟馗",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"
    }, {
      "name": "诸葛亮",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"
    }, {
      "name": "干将莫邪",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"
    }, {
      "name": "女娲",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"
    }, {
      "name": "杨玉环",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"
    }, {
      "name": "弈星",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"
    }, {
      "name": "米莱狄",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"
    }, {
      "name": "沈梦溪",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"
    }, {
      "name": "上官婉儿",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"
    }, {
      "name": "嫦娥",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"
    }]
  }, {
    "name": "坦克",
    "heroes": [{
      "name": "廉颇",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"
    }, {
      "name": "刘禅",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"
    }, {
      "name": "白起",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"
    }, {
      "name": "夏侯惇",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"
    }, {
      "name": "项羽",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"
    }, {
      "name": "程咬金",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"
    }, {
      "name": "刘邦",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"
    }, {
      "name": "牛魔",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"
    }, {
      "name": "张飞",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"
    }, {
      "name": "东皇太一",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"
    }, {
      "name": "苏烈",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"
    }, {
      "name": "梦奇",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"
    }, {
      "name": "孙策",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"
    }, {
      "name": "猪八戒",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"
    }]
  }, {
    "name": "刺客",
    "heroes": [{
      "name": "阿轲",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"
    }, {
      "name": "李白",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"
    }, {
      "name": "韩信",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"
    }, {
      "name": "兰陵王",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"
    }, {
      "name": "娜可露露",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"
    }, {
      "name": "橘右京",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"
    }, {
      "name": "百里玄策",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"
    }, {
      "name": "裴擒虎",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"
    }, {
      "name": "元歌",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"
    }, {
      "name": "司马懿",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"
    }, {
      "name": "云中君",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"
    }]
  }, {
    "name": "射手",
    "heroes": [{
      "name": "孙尚香",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"
    }, {
      "name": "鲁班七号",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"
    }, {
      "name": "马可波罗",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"
    }, {
      "name": "狄仁杰",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"
    }, {
      "name": "后羿",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"
    }, {
      "name": "李元芳",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"
    }, {
      "name": "虞姬",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"
    }, {
      "name": "成吉思汗",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"
    }, {
      "name": "黄忠",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"
    }, {
      "name": "百里守约",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"
    }, {
      "name": "公孙离",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"
    }, {
      "name": "伽罗",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"
    }]
  }, {
    "name": "辅助",
    "heroes": [{
      "name": "庄周",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"
    }, {
      "name": "孙膑",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"
    }, {
      "name": "蔡文姬",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"
    }, {
      "name": "太乙真人",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"
    }, {
      "name": "大乔",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"
    }, {
      "name": "鬼谷子",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"
    }, {
      "name": "明世隐",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"
    }, {
      "name": "盾山",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"
    }, {
      "name": "瑶",
      "via": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"
    }]
  }]


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

  // 导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})
    for (let cat of HeroesData) {
      if (cat.name === '热门') continue
      const category = await Category.findOne({
        name: cat.name
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      await Hero.insertMany(cat.heroes)
    }
    res.send(await Hero.find())
  })

  // 英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    const cats = await Category.aggregate([{
      $match: {
        parents: parent._id
      }
    }, {
      $lookup: {
        from: 'heroes',
        localField: '_id',
        foreignField: 'categories',
        as: 'heroList'
      }
    }])
    const subCats = cats.map(item => item._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: {
          $in: subCats
        }
      }).limit(10).lean()
    })
    res.send(cats)
  })

  // 文章详情接口
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: {
        $in: data.categories
      }
    }).limit(2)
    res.send(data)
  })

  app.use('/web/api', router)
}