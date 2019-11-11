const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: { // 英雄名称
    type: String
  },
  via: { // 英雄头像
    type: String
  },
  title: { // 英雄称号
    type: String
  },
  categories: [{ // 所属分类
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  scores: { // 评分系统
    difficult: { // 难度
      type: Number
    },
    skills: { // 技能
      type: Number
    },
    attack: { // 攻击
      type: Number
    },
    survive: { // 生存
      type: Number
    }
  },
  skills: [{ // 技能简介
    icon: { // 技能图标
      type: String
    },
    name: { // 技能名称
      type: String
    },
    description: { // 技能描述
      type: String
    },
    tips: { // 小提示
      type: String
    }
  }],
  withItems: [{ // 顺风出装
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  againstItems: [{ // 逆风出装
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  useSkills: { // 使用技巧
    type: String
  },
  combatSkills: { // 对抗技巧
    type: String
  },
  meleeIdeas: { // 团战思路
    type: String
  },
  partnerShip: { // 搭档关系
    hero: { // 搭配英雄
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: { // 搭配原因
      type: String
    }
  }
})

module.exports = mongoose.model('Hero', schema, 'heroes')