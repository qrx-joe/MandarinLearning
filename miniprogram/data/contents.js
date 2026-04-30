// 学习内容数据 - 50天课程（三段式结构）
// Warm-up: 2分钟，慢速(0.8x)，重点词语/发音纠偏
// Core: 5分钟，常速(1.0x)，日常短句/场景对话
// Challenge: 3分钟，常速→快速(1.2x)，流利度训练/复合句

const ALL_CONTENTS = [
  // ========== Week 1: 基础发音纠偏 - n/l 不分 ==========
  {
    week: 1, day: 1, theme: "n/l 对比",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "牛奶", pinyin: "niú nǎi", note: "niú - 声母n，舌尖抵上齿龈" },
          { text: "水流", pinyin: "shuǐ liú", note: "liú - 声母l，舌尖抵上齿龈，气流从两边出来" },
          { text: "你好", pinyin: "nǐ hǎo", note: "nǐ - 声母n" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我想买牛奶。", pinyin: "Wǒ xiǎng mǎi niú nǎi." },
          { text: "河水流得很快。", pinyin: "Hé shuǐ liú de hěn kuài." },
          { text: "你明天有空吗？", pinyin: "Nǐ míng tiān yǒu kòng ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "奶奶去南宁买牛奶，路上看见水流得很急，她说：\"哪里有水，哪里就有生命。\"", pinyin: "Nǎi nai qù Nán níng mǎi niú nǎi, lù shang kàn jiàn shuǐ liú de hěn jí, tā shuō: \"Nǎ lǐ yǒu shuǐ, nǎ lǐ jiù yǒu shēng mìng.\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 2, theme: "n/l 强化",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "努力", pinyin: "nǔ lì", note: "nǔ - 声母n" },
          { text: "力量", pinyin: "lì liàng", note: "lì - 声母l" },
          { text: "年龄", pinyin: "nián líng", note: "nián-líng，n和l连读" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "努力学习很重要。", pinyin: "Nǔ lì xué xí hěn zhòng yào." },
          { text: "团结就是力量。", pinyin: "Tuán jié jiù shì lì liàng." },
          { text: "您今年多大年龄？", pinyin: "Nín jīn nián duō dà nián líng?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "老师鼓励我们：\"只要努力，就有力量改变年龄不能改变的东西——那就是我们的心态。\"", pinyin: "Lǎo shī gǔ lì wǒ men: \"Zhǐ yào nǔ lì, jiù yǒu lì liàng gǎi biàn nián líng bù néng gǎi biàn de dōng xi——nà jiù shì wǒ men de xīn tài.\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 3, theme: "n/l 场景",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "哪里", pinyin: "nǎ lǐ", note: "nǎ - 声母n；lǐ - 声母l" },
          { text: "蓝天", pinyin: "lán tiān", note: "lán - 声母l" },
          { text: "国内", pinyin: "guó nèi", note: "nèi - 声母n" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问您去哪里？", pinyin: "Qǐng wèn nín qù nǎ lǐ?" },
          { text: "今天的蓝天真美。", pinyin: "Jīn tiān de lán tiān zhēn měi." },
          { text: "我在国内旅行。", pinyin: "Wǒ zài guó nèi lǚ xíng." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "导游问：\"您想去哪里看蓝天？\"游客回答：\"哪里蓝天下有流水，我就想去哪里。\"", pinyin: "Dǎo yóu wèn: \"Nín xiǎng qù nǎ lǐ kàn lán tiān?\" Yóu kè huí dá: \"Nǎ lǐ lán tiān xià yǒu liú shuǐ, wǒ jiù xiǎng qù nǎ lǐ.\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 4, theme: "n/l 综合",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "历年", pinyin: "lì nián", note: "lì-nián，l和n连读" },
          { text: "南方", pinyin: "nán fāng", note: "nán - 声母n" },
          { text: "礼物", pinyin: "lǐ wù", note: "lǐ - 声母l" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "历年来这里变化很大。", pinyin: "Lì nián lái zhè lǐ biàn huà hěn dà." },
          { text: "南方冬天也很冷。", pinyin: "Nán fāng dōng tiān yě hěn lěng." },
          { text: "这是我给你的礼物。", pinyin: "Zhè shì wǒ gěi nǐ de lǐ wù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "老邻居见面：\"老李，你历年去南方，今年带什么礼物回来啦？\"", pinyin: "Lǎo lín jū jiàn miàn: \"Lǎo Lǐ, nǐ lì nián qù nán fāng, jīn nián dài shén me lǐ wù huí lái la?\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 5, theme: "平翘舌 - zh/ch/sh vs z/c/s",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "上海", pinyin: "Shàng hǎi", note: "shàng - 翘舌音sh" },
          { text: "四个", pinyin: "sì gè", note: "sì - 平舌音s" },
          { text: "知道", pinyin: "zhī dào", note: "zhī - 翘舌音zh" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "上海是个大城市。", pinyin: "Shàng hǎi shì gè dà chéng shì." },
          { text: "我有四个苹果。", pinyin: "Wǒ yǒu sì gè píng guǒ." },
          { text: "我知道这件事。", pinyin: "Wǒ zhī dào zhè jiàn shì." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "小测试：\"十四是十四，四十是四十，十四不是四十，四十不是十四。\"", pinyin: "Shí sì shì shí sì, sì shí shì sì shí, shí sì bú shì sì shí, sì shí bú shì shí sì.\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 6, theme: "平翘舌 强化",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "出差", pinyin: "chū chāi", note: "chū-chāi，翘舌音ch" },
          { text: "车站", pinyin: "chē zhàn", note: "chē-zhàn，翘舌音ch和zh" },
          { text: "散步", pinyin: "sàn bù", note: "sàn - 平舌音s" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我去北京出差。", pinyin: "Wǒ qù Běi jīng chū chāi." },
          { text: "车站在前面。", pinyin: "Chē zhàn zài qián miàn." },
          { text: "晚饭后去散步。", pinyin: "Wǎn fàn hòu qù sàn bù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "同事问：\"你出差去上海，从哪个车站走？\"我说：\"出差不急，先去散散步。\"", pinyin: "Tóng shì wèn: \"Nǐ chū chāi qù Shàng hǎi, cóng nǎ gè chē zhàn zǒu?\" Wǒ shuō: \"Chū chāi bù jí, xiān qù sàn sàn bù.\"" }
        ]
      }
    }
  },
  {
    week: 1, day: 7, theme: "平翘舌 综合",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "杂志", pinyin: "zá zhì", note: "zá-平舌z，zhì-翘舌zh" },
          { text: "支持", pinyin: "zhī chí", note: "zhī-chí，翘舌音" },
          { text: "身体", pinyin: "shēn tǐ", note: "shēn - 翘舌音sh" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我喜欢看杂志。", pinyin: "Wǒ xǐ huan kàn zá zhì." },
          { text: "谢谢你的支持。", pinyin: "Xiè xie nǐ de zhī chí." },
          { text: "注意身体健康。", pinyin: "Zhù yì shēn tǐ jiàn kāng." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "朋友说：\"这本杂志支持你多关心身体，少出差多散步。\"", pinyin: "Péng you shuō: \"Zhè běn zá zhì zhī chí nǐ duō guān xīn shēn tǐ, shǎo chū chāi duō sàn bù.\"" }
        ]
      }
    }
  },

  // ========== Week 2: 前后鼻音 + 声调 ==========
  {
    week: 2, day: 8, theme: "前后鼻音 - an/ang, en/eng, in/ing",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "人民", pinyin: "rén mín", note: "rén - 前鼻音en" },
          { text: "明星", pinyin: "míng xīng", note: "míng - 后鼻音ing" },
          { text: "心情", pinyin: "xīn qíng", note: "xīn-前鼻in，qíng-后鼻ing" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "人民都很勤劳。", pinyin: "Rén mín dōu hěn qín láo." },
          { text: "他是个大明星。", pinyin: "Tā shì gè dà míng xīng." },
          { text: "我今天心情很好。", pinyin: "Wǒ jīn tiān xīn qíng hěn hǎo." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "人民喜欢明星，明星关心人民的心情——这就是和谐社会。", pinyin: "Rén mín xǐ huan míng xīng, míng xīng guān xīn rén mín de xīn qíng——zhè jiù shì hé xié shè huì." }
        ]
      }
    }
  },
  {
    week: 2, day: 9, theme: "前后鼻音 强化",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "平安", pinyin: "píng ān", note: "píng-后鼻ing，ān-前鼻an" },
          { text: "认真", pinyin: "rèn zhēn", note: "rèn-zhēn，前鼻音en" },
          { text: "成功", pinyin: "chéng gōng", note: "chéng - 后鼻音eng" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "祝你一路平安。", pinyin: "Zhù nǐ yí lù píng ān." },
          { text: "学习要认真。", pinyin: "Xué xí yào rèn zhēn." },
          { text: "他这次成功了。", pinyin: "Tā zhè cì chéng gōng le." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "妈妈说：\"认真做事的人，终会成功。我只求你平安。\"", pinyin: "Mā ma shuō: \"Rèn zhēn zuò shì de rén, zhōng huì chéng gōng. Wǒ zhǐ qiú nǐ píng ān.\"" }
        ]
      }
    }
  },
  {
    week: 2, day: 10, theme: "前后鼻音 综合",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "新闻", pinyin: "xīn wén", note: "xīn-前鼻in，wén-前鼻en" },
          { text: "朋友", pinyin: "péng yǒu", note: "péng - 后鼻音eng" },
          { text: "同学", pinyin: "tóng xué", note: "tóng - 后鼻音ong" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "今天有什么新闻？", pinyin: "Jīn tiān yǒu shén me xīn wén?" },
          { text: "他是我老朋友。", pinyin: "Tā shì wǒ lǎo péng you." },
          { text: "我和他是大学同学。", pinyin: "Wǒ hé tā shì dà xué tóng xué." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "老同学见面：\"朋友，看新闻了吗？咱们的同学会上头条了！\"", pinyin: "Lǎo tóng xué jiàn miàn: \"Péng you, kàn xīn wén le ma? Zán men de tóng xué huì shàng tóu tiáo le!\"" }
        ]
      }
    }
  },
  {
    week: 2, day: 11, theme: "声调 - 四声练习",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "妈 麻 马 骂", pinyin: "mā má mǎ mà", note: "第一声到第四声" },
          { text: "衣服", pinyin: "yī fu", note: "yī - 第一声" },
          { text: "已经", pinyin: "yǐ jīng", note: "yǐ - 第三声" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "妈妈买了一件衣服。", pinyin: "Mā ma mǎi le yí jiàn yī fu." },
          { text: "我已经知道了。", pinyin: "Wǒ yǐ jīng zhī dào le." },
          { text: "这个意义很大。", pinyin: "Zhè gè yì yì hěn dà." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "妈妈对阿姨说：\"这件衣服我已经买了，意义不一样——这是给您的礼物。\"", pinyin: "Mā ma duì ā yí shuō: \"Zhè jiàn yī fu wǒ yǐ jīng mǎi le, yì yì bú yí yàng——zhè shì gěi nín de lǐ wù.\"" }
        ]
      }
    }
  },
  {
    week: 2, day: 12, theme: "声调 - 变调练习",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "的 得 地", pinyin: "de dé dì", note: "de-轻声，dé-第二声，dì-第四声" },
          { text: "银行", pinyin: "yín háng", note: "yín - 第二声" },
          { text: "引号", pinyin: "yǐn hào", note: "yǐn - 第三声" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我去银行取钱。", pinyin: "Wǒ qù yín háng qǔ qián." },
          { text: "这句话用引号。", pinyin: "Zhè jù huà yòng yǐn hào." },
          { text: "他在印刷厂工作。", pinyin: "Tā zài yìn shuā chǎng gōng zuò." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "老师讲解：\"银行的引号用得对，印刷得也很清楚——不仅学生懂了，我也很满意。\"", pinyin: "Lǎo shī jiǎng jiě: \"Yín háng de yǐn hào yòng de duì, yìn shuā de yě hěn qīng chu——bù jǐn xué sheng dǒng le, wǒ yě hěn mǎn yì.\"" }
        ]
      }
    }
  },
  {
    week: 2, day: 13, theme: "声调 - 多音字",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "读好书", pinyin: "dú hǎo shū", note: "hǎo - 第三声，形容词" },
          { text: "爱好", pinyin: "ài hào", note: "hào - 第四声，名词" },
          { text: "长大", pinyin: "zhǎng dà", note: "zhǎng - 第三声，动词" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "要读好书，先有好习惯。", pinyin: "Yào dú hǎo shū, xiān yǒu hǎo xí guàn." },
          { text: "他的爱好是画画。", pinyin: "Tā de ài hào shì huà huà." },
          { text: "孩子在慢慢长大。", pinyin: "Hái zi zài màn man zhǎng dà." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "没有爱好的孩子，很难读好书；但爱读书的孩子，一定在长大。", pinyin: "Méi yǒu ài hào de hái zi, hěn nán dú hǎo shū; dàn ài dú shū de hái zi, yí dìng zài zhǎng dà." }
        ]
      }
    }
  },
  {
    week: 2, day: 14, theme: "声调 综合",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "明天", pinyin: "míng tiān", note: "míng - 第二声" },
          { text: "命令", pinyin: "mìng lìng", note: "mìng - 第四声" },
          { text: "名誉", pinyin: "míng yù", note: "míng - 第二声" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "明天我要加班。", pinyin: "Míng tiān wǒ yào jiā bān." },
          { text: "这是上级的命令。", pinyin: "Zhè shì shàng jí de mìng lìng." },
          { text: "名誉比金钱重要。", pinyin: "Míng yù bǐ jīn qián zhòng yào." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "清明时节，父亲对儿子说：\"明天开始，听从命令做事，保住家族名誉。\"", pinyin: "Qīng míng shí jié, fù qīn duì ér zi shuō: \"Míng tiān kāi shǐ, tīng cóng mìng lìng zuò shì, bǎo zhù jiā zú míng yù.\"" }
        ]
      }
    }
  },

  // ========== Week 3: 日常问候 - 基础打招呼 ==========
  {
    week: 3, day: 15, theme: "打招呼",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "您好", pinyin: "Nín hǎo", note: "nín - 尊称" },
          { text: "早上好", pinyin: "Zǎo shang hǎo", note: "zǎo - 第三声" },
          { text: "晚上好", pinyin: "Wǎn shang hǎo", note: "wǎn - 第三声" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "您好！请问您贵姓？", pinyin: "Nín hǎo! Qǐng wèn nín guì xìng?" },
          { text: "早上好！今天天气不错。", pinyin: "Zǎo shang hǎo! Jīn tiān tiān qì bú cuò." },
          { text: "晚上好！您吃了吗？", pinyin: "Wǎn shang hǎo! Nín chī le ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "在小区里遇到邻居：\"早上好！最近怎么样？晚上好有空来我家喝茶。\"", pinyin: "Zài xiǎo qū lǐ yù dào lín jū: \"Zǎo shang hǎo! Zuì jìn zěn me yàng? Wǎn shang hǎo yǒu kòng lái wǒ jiā hē chá.\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 16, theme: "感谢与回应",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "谢谢", pinyin: "Xiè xie", note: "xiè - 第四声" },
          { text: "非常感谢", pinyin: "Fēi cháng gǎn xiè", note: "fēi cháng - 程度副词" },
          { text: "不客气", pinyin: "Bú kè qi", note: "kè qi - 礼貌" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "谢谢您帮我开门。", pinyin: "Xiè xie nín bāng wǒ kāi mén." },
          { text: "非常感谢您的帮助！", pinyin: "Fēi cháng gǎn xiè nín de bāng zhù!" },
          { text: "不客气，举手之劳。", pinyin: "Bú kè qi, jǔ shǒu zhī láo." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "买菜回来：\"谢谢老板多送了葱！\"老板说：\"不客气，非常感谢您常来照顾生意。\"", pinyin: "Mǎi cài huí lái: \"Xiè xie lǎo bǎn duō sòng le cōng!\" Lǎo bǎn shuō: \"Bú kè qi, fēi cháng gǎn xiè nín cháng lái zhào gù shēng yì.\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 17, theme: "道歉与礼貌",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "对不起", pinyin: "Duì bù qǐ", note: "道歉用语" },
          { text: "不好意思", pinyin: "Bù hǎo yì si", note: "轻微歉意" },
          { text: "打扰一下", pinyin: "Dǎ rǎo yí xià", note: "请人帮忙前" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "对不起，我迟到了。", pinyin: "Duì bù qǐ, wǒ chí dào le." },
          { text: "不好意思，请问现在几点？", pinyin: "Bù hǎo yì si, qǐng wèn xiàn zài jǐ diǎn?" },
          { text: "打扰一下，我想问个路。", pinyin: "Dǎ rǎo yí xià, wǒ xiǎng wèn gè lù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "撞到人后：\"对不起！不好意思，我没看见您。打扰一下，您没事吧？\"", pinyin: "Zhuàng dào rén hòu: \"Duì bù qǐ! Bù hǎo yì si, wǒ méi kàn jiàn nín. Dǎ rǎo yí xià, nín méi shì ba?\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 18, theme: "告别",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "再见", pinyin: "Zài jiàn", note: "zài - 再次" },
          { text: "明天见", pinyin: "Míng tiān jiàn", note: "次日" },
          { text: "保重", pinyin: "Bǎo zhòng", note: "bǎo zhòng - 关心" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "再见！路上小心。", pinyin: "Zài jiàn! Lù shang xiǎo xīn." },
          { text: "明天见，别忘了带伞。", pinyin: "Míng tiān jiàn, bié wàng le dài sǎn." },
          { text: "您多保重！有空常联系。", pinyin: "Nín duō bǎo zhòng! Yǒu kòng cháng lián xì." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "送别朋友：\"明天见不是再见，保重身体，一路顺风，有空常联系！\"", pinyin: "Sòng bié péng you: \"Míng tiān jiàn bú shì zài jiàn, bǎo zhòng shēn tǐ, yí lù shùn fēng, yǒu kòng cháng lián xì!\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 19, theme: "自我介绍",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "我叫", pinyin: "Wǒ jiào", note: "jiào - 称呼" },
          { text: "很高兴", pinyin: "Hěn gāo xìng", note: "gāo xìng - 愉快" },
          { text: "贵姓", pinyin: "Guì xìng", note: "guì xìng - 尊称" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "您好，我叫王小明。", pinyin: "Nín hǎo, wǒ jiào Wáng Xiǎo míng." },
          { text: "很高兴认识您！", pinyin: "Hěn gāo xìng rèn shi nín!" },
          { text: "请问您贵姓？", pinyin: "Qǐng wèn nín guì xìng?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "初次见面：\"您好，我叫李华，很高兴认识您。请问您贵姓？哦，张阿姨，以后请多关照！\"", pinyin: "Chū cì jiàn miàn: \"Nín hǎo, wǒ jiào Lǐ Huá, hěn gāo xìng rèn shi nín. Qǐng wèn nín guì xìng? Ó, Zhāng ā yí, yǐ hòu qǐng duō guān zhào!\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 20, theme: "寒暄",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "从哪里来", pinyin: "Cóng nǎ lǐ lái", note: "nǎ lǐ - 地点" },
          { text: "做什么工作", pinyin: "Zuò shén me gōng zuò", note: "gōng zuò - 职业" },
          { text: "住在哪里", pinyin: "Zhù zài nǎ lǐ", note: "zhù - 居住" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "您是从哪里来的？", pinyin: "Nín shì cóng nǎ lǐ lái de?" },
          { text: "我是老师。", pinyin: "Wǒ shì lǎo shī." },
          { text: "我住在市中心。", pinyin: "Wǒ zhù zài shì zhōng xīn." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "聊天开场：\"您从哪里来？做什么工作的？住在哪里？远不远？\"", pinyin: "Liáo tiān kāi chǎng: \"Nín cóng nǎ lǐ lái? Zuò shén me gōng zuò de? Zhù zài nǎ lǐ? Yuǎn bú yuǎn?\"" }
        ]
      }
    }
  },
  {
    week: 3, day: 21, theme: "久别重逢",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "好久不见", pinyin: "Hǎo jiǔ bú jiàn", note: "hǎo jiǔ - 时间长" },
          { text: "怎么样", pinyin: "Zěn me yàng", note: "zěn me yàng - 近况" },
          { text: "还不错", pinyin: "Hái bú cuò", note: "bú cuò - 挺好" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "好久不见！您还好吗？", pinyin: "Hǎo jiǔ bú jiàn! Nín hái hǎo ma?" },
          { text: "最近怎么样？", pinyin: "Zuì jìn zěn me yàng?" },
          { text: "我们都挺好的。", pinyin: "Wǒ men dōu tǐng hǎo de." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "老同学见面：\"好久不见！最近怎么样？——还不错，你呢？——我们都挺好的，孩子大了，省心多了。\"", pinyin: "Lǎo tóng xué jiàn miàn: \"Hǎo jiǔ bú jiàn! Zuì jìn zěn me yàng?——Hái bú cuò, nǐ ne?——Wǒ men dōu tǐng hǎo de, hái zi dà le, shěng xīn duō le.\"" }
        ]
      }
    }
  },

  // ========== Week 4: 日常问候 - 礼貌场景 ==========
  {
    week: 4, day: 22, theme: "接待客人",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "请进", pinyin: "Qǐng jìn", note: "qǐng - 礼貌" },
          { text: "请坐", pinyin: "Qǐng zuò", note: "zuò - 坐下" },
          { text: "请喝茶", pinyin: "Qǐng hē chá", note: "hē chá - 招待" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请进！欢迎欢迎。", pinyin: "Qǐng jìn! Huān yíng huān yíng." },
          { text: "请坐，别客气。", pinyin: "Qǐng zuò, bié kè qi." },
          { text: "请喝茶，这是新茶。", pinyin: "Qǐng hē chá, zhè shì xīn chá." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "开门迎客：\"请进！快请坐。您先请喝茶，别客气，就像自己家一样。\"", pinyin: "Kāi mén yíng kè: \"Qǐng jìn! Kuài qǐng zuò. Nín xiān qǐng hē chá, bié kè qi, jiù xiàng zì jǐ jiā yí yàng.\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 23, theme: "帮忙",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "帮忙", pinyin: "Bāng máng", note: "bāng - 帮助" },
          { text: "需要", pinyin: "Xū yào", note: "xū yào - 需求" },
          { text: "举手之劳", pinyin: "Jǔ shǒu zhī láo", note: "客套" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "需要帮忙吗？", pinyin: "Xū yào bāng máng ma?" },
          { text: "我来帮您提东西。", pinyin: "Wǒ lái bāng nín tí dōng xi." },
          { text: "不用谢，举手之劳。", pinyin: "Bú yòng xiè, jǔ shǒu zhī láo." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "看到老人提重物：\"需要帮忙吗？我来帮您。——太感谢了！——不用谢，举手之劳。\"", pinyin: "Kàn dào lǎo rén tí zhòng wù: \"Xū yào bāng máng ma? Wǒ lái bāng nín.——Tài gǎn xiè le!——Bú yòng xiè, jǔ shǒu zhī láo.\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 24, theme: "祝贺",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "恭喜", pinyin: "Gōng xǐ", note: "gōng xǐ - 祝贺" },
          { text: "生日快乐", pinyin: "Shēng rì kuài lè", note: "kuài lè - 祝福" },
          { text: "身体健康", pinyin: "Shēn tǐ jiàn kāng", note: "jiàn kāng - 身体" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "恭喜恭喜！祝你生日快乐！", pinyin: "Gōng xǐ gōng xǐ! Zhù nǐ shēng rì kuài lè!" },
          { text: "祝你身体健康，万事如意！", pinyin: "Zhù nǐ shēn tǐ jiàn kāng, wàn shì rú yì!" },
          { text: "祝你新年大吉！", pinyin: "Zhù nǐ xīn nián dà jí!" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "节日祝福：\"恭喜恭喜！祝你身体健康、万事如意、新年大吉、阖家幸福！\"", pinyin: "Jié rì zhù fú: \"Gōng xǐ gōng xǐ! Zhù nǐ shēn tǐ jiàn kāng, wàn shì rú yì, xīn nián dà jí, hé jiā xìng fú!\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 25, theme: "问路",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "洗手间", pinyin: "Xǐ shǒu jiān", note: "xǐ shǒu jiān - 卫生间" },
          { text: "出口", pinyin: "Chū kǒu", note: "chū kǒu - exit" },
          { text: "附近", pinyin: "Fù jìn", note: "fù jìn - 周边" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问洗手间在哪里？", pinyin: "Qǐng wèn xǐ shǒu jiān zài nǎ lǐ?" },
          { text: "请问出口怎么走？", pinyin: "Qǐng wèn chū kǒu zěn me zǒu?" },
          { text: "请问附近有没有超市？", pinyin: "Qǐng wèn fù jìn yǒu méi yǒu chāo shì?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "在商场：\"不好意思，请问洗手间在哪里？出口又在哪？附近有没有吃饭的地方？\"", pinyin: "Zài shāng chǎng: \"Bù hǎo yì si, qǐng wèn xǐ shǒu jiān zài nǎ lǐ? Chū kǒu yòu zài nǎ? Fù jìn yǒu méi yǒu chī fàn de dì fang?\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 26, theme: "购物问价",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "多少钱", pinyin: "Duō shao qián", note: "duō shao - 数量" },
          { text: "太贵", pinyin: "Tài guì", note: "guì - 价格高" },
          { text: "便宜", pinyin: "Pián yi", note: "pián yi - 降价" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "这个多少钱？", pinyin: "Zhè ge duō shao qián?" },
          { text: "太贵了，能便宜点吗？", pinyin: "Tài guì le, néng pián yi diǎn ma?" },
          { text: "给我装起来吧。", pinyin: "Gěi wǒ zhuāng qǐ lái ba." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "买衣服砍价：\"这个多少钱？——八十。——太贵了，五十卖不卖？——最低六十。——行，给我装起来吧。\"", pinyin: "Mǎi yī fu kǎn jià: \"Zhè ge duō shao qián?——Bā shí.——Tài guì le, wǔ shí mài bú mài?——Zuì dī liù shí.——Xíng, gěi wǒ zhuāng qǐ lái ba.\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 27, theme: "结账",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "一共", pinyin: "Yí gòng", note: "yí gòng - 总共" },
          { text: "刷卡", pinyin: "Shuā kǎ", note: "shuā kǎ - 支付" },
          { text: "扫码", pinyin: "Sǎo mǎ", note: "sǎo mǎ - 扫码" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "一共多少钱？", pinyin: "Yí gòng duō shao qián?" },
          { text: "我刷卡。", pinyin: "Wǒ shuā kǎ." },
          { text: "我扫码支付。", pinyin: "Wǒ sǎo mǎ zhī fù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "结账时：\"一共多少钱？——一百二十八。——我扫码支付吧。——好的，请扫码。——扫了，您看看。\"", pinyin: "Jié zhàng shí: \"Yí gòng duō shao qián?——Yì bǎi èr shí bā.——Wǒ sǎo mǎ zhī fù ba.——Hǎo de, qǐng sǎo mǎ.——Sǎo le, nín kàn kan.\"" }
        ]
      }
    }
  },
  {
    week: 4, day: 28, theme: "礼貌告别",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "我走了", pinyin: "Wǒ zǒu le", note: "zǒu le - 告别" },
          { text: "回头见", pinyin: "Huí tóu jiàn", note: "huí tóu - 稍后" },
          { text: "添麻烦", pinyin: "Tiān má fan", note: "tiān má fan - 致歉" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我走了，您留步。", pinyin: "Wǒ zǒu le, nín liú bù." },
          { text: "回头见，保持联系。", pinyin: "Huí tóu jiàn, bǎo chí lián xì." },
          { text: "给您添麻烦了。", pinyin: "Gěi nǐ tiān má fan le." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "拜访结束：\"给您添麻烦了，我走了。——别客气，回头见！——保持联系，您留步！\"", pinyin: "Bài fǎng jié shù: \"Gěi nín tiān má fan le, wǒ zǒu le.——Bié kè qi, huí tóu jiàn!——Bǎo chí lián xì, nín liú bù!\"" }
        ]
      }
    }
  },

  // ========== Week 5: 外出场景 - 问路/交通 ==========
  {
    week: 5, day: 29, theme: "问路",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "地铁站", pinyin: "Dì tiě zhàn", note: "dì tiě - subway" },
          { text: "公交站", pinyin: "Gōng jiāo zhàn", note: "gōng jiāo - bus" },
          { text: "火车站", pinyin: "Huǒ chē zhàn", note: "huǒ chē - train" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问地铁站怎么走？", pinyin: "Qǐng wèn dì tiě zhàn zěn me zǒu?" },
          { text: "附近哪里有公交站？", pinyin: "Fù jìn nǎ lǐ yǒu gōng jiāo zhàn?" },
          { text: "请问去医院怎么走？", pinyin: "Qǐng wèn qù yī yuàn zěn me zǒu?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "路人问路：\"请问地铁站怎么走？——往前走右转。——那公交站呢？——地铁站旁边就是。——谢谢！——不客气。\"", pinyin: "Lù rén wèn lù: \"Qǐng wèn dì tiě zhàn zěn me zǒu?——Wǎng qián zǒu yòu zhuǎn.——Nà gōng jiāo zhàn ne?——Dì tiě zhàn páng biān jiù shì.——Xiè xie!——Bú kè qi.\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 30, theme: "指路",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "往前走", pinyin: "Wǎng qián zǒu", note: "wǎng qián - forward" },
          { text: "往右拐", pinyin: "Wǎng yòu guǎi", note: "guǎi - turn" },
          { text: "第二个路口", pinyin: "Dì èr gè lù kǒu", note: "lù kǒu - intersection" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "一直往前走。", pinyin: "Yì zhí wǎng qián zǒu." },
          { text: "往右拐，然后往左拐。", pinyin: "Wǎng yòu guǎi, rán hòu wǎng zuǒ guǎi." },
          { text: "第二个路口右转。", pinyin: "Dì èr gè lù kǒu yòu zhuǎn." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "详细指路：\"您往前走，到第二个路口往右拐，然后一直走，看到医院再往左拐，就在前面。\"", pinyin: "Xiáng xì zhǐ lù: \"Nín wǎng qián zǒu, dào dì èr gè lù kǒu wǎng yòu guǎi, rán hòu yì zhí zǒu, kàn dào yī yuàn zài wǎng zuǒ guǎi, jiù zài qián miàn.\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 31, theme: "距离/时间",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "多远", pinyin: "Duō yuǎn", note: "duō yuǎn - distance" },
          { text: "大约", pinyin: "Dà yuē", note: "dà yuē - approximately" },
          { text: "对面", pinyin: "Duì miàn", note: "duì miàn - opposite" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问还有多远？", pinyin: "Qǐng wèn hái yǒu duō yuǎn?" },
          { text: "大约五分钟。", pinyin: "Dà yuē wǔ fēn zhōng." },
          { text: "应该在对面坐车。", pinyin: "Yīng gāi zài duì miàn zuò chē." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "乘客问司机：\"到火车站还有多远？——大约二十分钟。——您坐错方向了，应该在对面坐车。——啊？那我下车。\"", pinyin: "Chéng kè wèn sī jī: \"Dào huǒ chē zhàn hái yǒu duō yuǎn?——Dà yuē èr shí fēn zhōng.——Nín zuò cuò fāng xiàng le, yīng gāi zài duì miàn zuò chē.——Á? Nà wǒ xià chē.\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 32, theme: "乘车",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "哪站", pinyin: "Nǎ zhàn", note: "zhàn - station" },
          { text: "下车", pinyin: "Xià chē", note: "xià chē - get off" },
          { text: "叫", pinyin: "Jiào", note: "jiào - call" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问这是去火车站的车吗？", pinyin: "Qǐng wèn zhè shì qù huǒ chē zhàn de chē ma?" },
          { text: "请问哪站下？", pinyin: "Qǐng wèn nǎ zhàn xià?" },
          { text: "请叫我一下，我要下车。", pinyin: "Qǐng jiào wǒ yí xià, wǒ yào xià chē." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "上公交问：\"师傅，这是去火车站的吗？——是的。——请问哪站下？——终点前一站。——到了请叫我。——好嘞！\"", pinyin: "Shàng gōng jiāo wèn: \"Shī fu, zhè shì qù huǒ chē zhàn de ma?——Shì de.——Qǐng wèn nǎ zhàn xià?——Zhōng diǎn qián yí zhàn.——Dào le qǐng jiào wǒ.——Hǎo lei!\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 33, theme: "买票",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "买票", pinyin: "Mǎi piào", note: "mǎi piào - buy ticket" },
          { text: "多少钱一张", pinyin: "Duō shao qián yì zhāng", note: "yì zhāng - one ticket" },
          { text: "手机支付", pinyin: "Shǒu jī zhī fù", note: "mobile payment" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我要两张票。", pinyin: "Wǒ yào liǎng zhāng piào." },
          { text: "请问多少钱一张？", pinyin: "Qǐng wèn duō shao qián yì zhāng?" },
          { text: "我扫码支付。", pinyin: "Wǒ sǎo mǎ zhī fù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "窗口买票：\"我要两张去上海的票。——一百二一张。——我要两张。——两百四。我扫码支付。——请出示身份证。\"", pinyin: "Chuāng kǒu mǎi piào: \"Wǒ yào liǎng zhāng qù Shàng hǎi de piào.——Yì bǎi èr yì zhāng.——Wǒ yào liǎng zhāng.——Liǎng bǎi sì. Wǒ sǎo mǎ zhī fù.——Qǐng chū shì shēn fèn zhèng.\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 34, theme: "求助",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "厕所", pinyin: "Cè suǒ", note: "cè suǒ - restroom" },
          { text: "停车", pinyin: "Tíng chē", note: "tíng chē - park" },
          { text: "预约", pinyin: "Yù yuē", note: "yù yuē - reservation" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问附近有厕所吗？", pinyin: "Qǐng wèn fù jìn yǒu cè suǒ ma?" },
          { text: "请问可以停车吗？", pinyin: "Qǐng wèn kě yǐ tíng chē ma?" },
          { text: "请问需要预约吗？", pinyin: "Qǐng wèn xū yào yù yuē ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "在医院：\"请问附近有厕所吗？——出门左转。——可以停车吗？——地下可以。——挂号需要预约吗？——网上可以约。\"", pinyin: "Zài yī yuàn: \"Qǐng wèn fù jìn yǒu cè suǒ ma?——Chū mén zuǒ zhuǎn.——Kě yǐ tíng chē ma?——Dì xià kě yǐ.——Guà hào xū yào yù yuē ma?——Wǎng shang kě yǐ yuē.\"" }
        ]
      }
    }
  },
  {
    week: 5, day: 35, theme: "紧急情况",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "迷路", pinyin: "Mí lù", note: "mí lù - lost" },
          { text: "叫车", pinyin: "Jiào chē", note: "jiào chē - call taxi" },
          { text: "密码", pinyin: "Mì mǎ", note: "mì mǎ - password" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我迷路了。", pinyin: "Wǒ mí lù le." },
          { text: "请问能帮我叫辆车吗？", pinyin: "Qǐng wèn néng bāng wǒ jiào liàng chē ma?" },
          { text: "请问WiFi密码是多少？", pinyin: "Qǐng wèn WiFi mì mǎ shì duō shao?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "迷路求助：\"不好意思，我迷路了。能帮我叫辆车吗？——好的，您去哪？——去火车站。——连上WiFi，密码是八个八。\"", pinyin: "Mí lù qiú zhù: \"Bù hǎo yì si, wǒ mí lù le. Néng bāng wǒ jiào liàng chē ma?——Hǎo de, nín qù nǎ?——Qù huǒ chē zhàn.——Lián shang WiFi, mì mǎ shì bā ge bā.\"" }
        ]
      }
    }
  },

  // ========== Week 6: 外出场景 - 买菜/购物 ==========
  {
    week: 6, day: 36, theme: "买菜",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "怎么卖", pinyin: "Zěn me mài", note: "zěn me mài - pricing" },
          { text: "多少钱一斤", pinyin: "Duō shao qián yì jīn", note: "yì jīn - 500g" },
          { text: "新鲜", pinyin: "Xīn xiān", note: "xīn xiān - fresh" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "这个菜怎么卖？", pinyin: "Zhè ge cài zěn me mài?" },
          { text: "多少钱一斤？", pinyin: "Duō shao qián yì jīn?" },
          { text: "这个新鲜吗？", pinyin: "Zhè ge xīn xiān ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "买菜问价：\"老板，这青菜怎么卖？——三块一斤。——新鲜吗？——早上刚摘的。——给我称两斤。——六块，您拿好。\"", pinyin: "Mǎi cài wèn jià: \"Lǎo bǎn, zhè qīng cài zěn me mài?——Sān kuài yì jīn.——Xīn xiān ma?——Zǎo shang gāng zhāi de.——Gěi wǒ chēng liǎng jīn.——Liù kuài, nín ná hǎo.\"" }
        ]
      }
    }
  },
  {
    week: 6, day: 37, theme: "砍价",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "便宜", pinyin: "Pián yi", note: "pián yi - discount" },
          { text: "打折", pinyin: "Dǎ zhé", note: "dǎ zhé - 优惠" },
          { text: "太贵", pinyin: "Tài guì", note: "tài guì - too expensive" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "能不能便宜点？", pinyin: "Néng bù néng pián yi diǎn?" },
          { text: "太贵了，我不要了。", pinyin: "Tài guì le, wǒ bú yào le." },
          { text: "给我装起来吧。", pinyin: "Gěi wǒ zhuāng qǐ lái ba." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "讨价还价：\"这苹果怎么卖？——五块。——太贵了，四块卖不卖？——四块五。——行，给我装起来。——好嘞！\"", pinyin: "Tǎo jià huán jià: \"Zhè píng guǒ zěn me mài?——Wǔ kuài.——Tài guì le, sì kuài mài bú mài?——Sì kuài wǔ.——Xíng, gěi wǒ zhuāng qǐ lái.——Hǎo lei!\"" }
        ]
      }
    }
  },
  {
    week: 6, day: 38, theme: "结账",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "一共", pinyin: "Yí gòng", note: "yí gòng - total" },
          { text: "发票", pinyin: "Fā piào", note: "fā piào - receipt" },
          { text: "扫码", pinyin: "Sǎo mǎ", note: "sǎo mǎ - scan QR" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "一共多少钱？", pinyin: "Yí gòng duō shao qián?" },
          { text: "可以刷卡吗？", pinyin: "Kě yǐ shuā kǎ ma?" },
          { text: "请给我发票。", pinyin: "Qǐng gěi wǒ fā piào." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "超市结账：\"一共多少钱？——八十六块五。——我扫码。——请给我发票。——扫码在这边，发票去服务台。\"", pinyin: "Chāo shì jié zhàng: \"Yí gòng duō shao qián?——Bā shí liù kuài wǔ.——Wǒ sǎo mǎ.——Qǐng gěi wǒ fā piào.——Sǎo mǎ zài zhè biān, fā piào qù fú wù tái.\"" }
        ]
      }
    }
  },
  {
    week: 6, day: 39, theme: "退换货",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "退货", pinyin: "Tuì huò", note: "tuì huò - return" },
          { text: "坏了", pinyin: "Huài le", note: "huài le - broken" },
          { text: "退款", pinyin: "Tuì kuǎn", note: "tuì kuǎn - refund" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我想退货。", pinyin: "Wǒ xiǎng tuì huò." },
          { text: "这个东西坏了。", pinyin: "Zhè ge dōng xi huài le." },
          { text: "可以退款吗？", pinyin: "Kě yǐ tuì kuǎn ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "售后服务：\"我想退货，这个东西坏了。——有发票吗？——有。——可以退款，也可以换一件。——那我换一件吧。\"", pinyin: "Shòu hòu fú wù: \"Wǒ xiǎng tuì huò, zhè ge dōng xi huài le.——Yǒu fā piào ma?——Yǒu.——Kě yǐ tuì kuǎn, yě kě yǐ huàn yí jiàn.——Nà wǒ huàn yí jiàn ba.\"" }
        ]
      }
    }
  },
  {
    week: 6, day: 40, theme: "挑选",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "颜色", pinyin: "Yán sè", note: "yán sè - color" },
          { text: "大号", pinyin: "Dà hào", note: "dà hào - large size" },
          { text: "试试", pinyin: "Shì shi", note: "shì shi - try on" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "有别的颜色吗？", pinyin: "Yǒu bié de yán sè ma?" },
          { text: "有大一号的吗？", pinyin: "Yǒu dà yí hào de ma?" },
          { text: "我可以试试吗？", pinyin: "Wǒ kě yǐ shì shi ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "试衣服：\"有别的颜色吗？——有红色和蓝色。——有大一号的吗？——我给您找。——我可以试试吗？——试衣间在那边。\"", pinyin: "Shì yī fu: \"Yǒu bié de yán sè ma?——Yǒu hóng sè hé lán sè.——Yǒu dà yí hào de ma?——Wǒ gěi nín zhǎo.——Wǒ kě yǐ shì shi ma?——Shì yī jiān zài nà biān.\"" }
        ]
      }
    }
  },

  // ========== Week 7: 电话/语音 - 接电话 ==========
  {
    week: 7, day: 41, theme: "接电话",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "喂", pinyin: "Wéi", note: "wéi - 电话开场" },
          { text: "哪位", pinyin: "Nǎ wèi", note: "nǎ wèi - 询问身份" },
          { text: "稍等", pinyin: "Shāo děng", note: "shāo děng - 等待" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "喂，您好。请问您是哪位？", pinyin: "Wéi, nín hǎo. Qǐng wèn nín shì nǎ wèi?" },
          { text: "请问您找谁？", pinyin: "Qǐng wèn nín zhǎo shéi?" },
          { text: "稍等一下，我去叫他。", pinyin: "Shāo děng yí xià, wǒ qù jiào tā." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "接电话：\"喂，您好。请问您是哪位？——我找王老师。——稍等一下，我去叫他。——谢谢。——不客气。\"", pinyin: "Jiē diàn huà: \"Wéi, nín hǎo. Qǐng wèn nín shì nǎ wèi?——Wǒ zhǎo Wáng lǎo shī.——Shāo děng yí xià, wǒ qù jiào tā.——Xiè xie.——Bú kè qi.\"" }
        ]
      }
    }
  },
  {
    week: 7, day: 42, theme: "转告",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "转告", pinyin: "Zhuǎn gào", note: "zhuǎn gào - pass message" },
          { text: "在吗", pinyin: "Zài ma", note: "zài ma - 是否在场" },
          { text: "再打", pinyin: "Zài dǎ", note: "zài dǎ - call back" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请问李经理在吗？", pinyin: "Qǐng wèn Lǐ jīng lǐ zài ma?" },
          { text: "他不在，您稍后再打吧。", pinyin: "Tā bú zài, nín shāo hòu zài dǎ ba." },
          { text: "需要我转告吗？", pinyin: "Xū yào wǒ zhuǎn gào ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "代接电话：\"请问张主任在吗？——他不在开会去了。——需要我转告吗？——告诉他王医生打过电话。——好的。\"", pinyin: "Dài jiē diàn huà: \"Qǐng wèn Zhāng zhǔ rèn zài ma?——Tā bú zài kāi huì qù le.——Xū yào wǒ zhuǎn gào ma?——Gào sù tā Wáng yī shēng dǎ guò diàn huà.——Hǎo de.\"" }
        ]
      }
    }
  },
  {
    week: 7, day: 43, theme: "信号问题",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "信号", pinyin: "Xìn hào", note: "xìn hào - signal" },
          { text: "大声", pinyin: "Dà shēng", note: "dà shēng - louder" },
          { text: "打过去", pinyin: "Dǎ guò qù", note: "dǎ guò qù - call back" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "信号不好，我听不清。", pinyin: "Xìn hào bù hǎo, wǒ tīng bù qīng." },
          { text: "您能大点声吗？", pinyin: "Nín néng dà diǎn shēng ma?" },
          { text: "我再给您打过去。", pinyin: "Wǒ zài gěi nín dǎ guò qù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "通话中断：\"喂？喂？信号不好，我听不清。您能大点声吗？——还是不行。——那我挂了，再给您打过去。\"", pinyin: "Tōng huà zhōng duàn: \"Wéi? Wéi? Xìn hào bù hǎo, wǒ tīng bù qīng. Nín néng dà diǎn shēng ma?——Hái shì bù xíng.——Nà wǒ guà le, zài gěi nín dǎ guò qù.\"" }
        ]
      }
    }
  },
  {
    week: 7, day: 44, theme: "不方便接电话",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "不方便", pinyin: "Bù fāng biàn", note: "bù fāng biàn - inconvenient" },
          { text: "开会", pinyin: "Kāi huì", note: "kāi huì - meeting" },
          { text: "回电话", pinyin: "Huí diàn huà", note: "huí diàn huà - return call" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我现在不方便接电话。", pinyin: "Wǒ xiàn zài bù fāng biàn jiē diàn huà." },
          { text: "我在开会，稍后回您。", pinyin: "Wǒ zài kāi huì, shāo hòu huí nín." },
          { text: "我稍后给您回电话。", pinyin: "Wǒ shāo hòu gěi nín huí diàn huà." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "拒接来电：\"喂，我现在不方便接电话，在开会呢。我稍后给您回电话，大概一个小时后。——好的，再见。\"", pinyin: "Jù jiē lái diàn: \"Wéi, wǒ xiàn zài bù fāng biàn jiē diàn huà, zài kāi huì ne. Wǒ shāo hòu gěi nín huí diàn huà, dà gài yí gè xiǎo shí hòu.——Hǎo de, zài jiàn.\"" }
        ]
      }
    }
  },

  // ========== Week 8: 电话/语音 - 留言/结束 ==========
  {
    week: 8, day: 45, theme: "留言",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "留言", pinyin: "Liú yán", note: "liú yán - leave message" },
          { text: "回复", pinyin: "Huí fù", note: "huí fù - reply" },
          { text: "紧急", pinyin: "Jǐn jí", note: "jǐn jí - urgent" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "请看到回复我。", pinyin: "Qǐng kàn dào huí fù wǒ." },
          { text: "紧急事情，请尽快联系。", pinyin: "Jǐn jí shì qíng, qǐng jǐn kuài lián xì." },
          { text: "收到请回复。", pinyin: "Shōu dào qǐng huí fù." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "语音留言：\"张医生，我是李华。有紧急事情，请看到回复我，或者收到请回复短信。谢谢！\"", pinyin: "Yǔ yīn liú yán: \"Zhāng yī shēng, wǒ shì Lǐ Huá. Yǒu jǐn jí shì qíng, qǐng kàn dào huí fù wǒ, huò zhě shōu dào qǐng huí fù duǎn xìn. Xiè xie!\"" }
        ]
      }
    }
  },
  {
    week: 8, day: 46, theme: "打错电话",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "打错", pinyin: "Dǎ cuò", note: "dǎ cuò - wrong number" },
          { text: "电话", pinyin: "Diàn huà", note: "diàn huà - phone" },
          { text: "打扰", pinyin: "Dǎ rǎo", note: "dǎ rǎo - disturb" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "不好意思，打错了。", pinyin: "Bù hǎo yì si, dǎ cuò le." },
          { text: "您打错电话了。", pinyin: "Nín dǎ cuò diàn huà le." },
          { text: "不好意思，打扰了。", pinyin: "Bù hǎo yì si, dǎ rǎo le." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "拨错号码：\"喂，是张医生吗？——您打错电话了。——不好意思，打错了，打扰了！——没关系。\"", pinyin: "Bō cuò hào mǎ: \"Wéi, shì Zhāng yī shēng ma?——Nín dǎ cuò diàn huà le.——Bù hǎo yì si, dǎ cuò le, dǎ rǎo le!——Méi guān xi.\"" }
        ]
      }
    }
  },
  {
    week: 8, day: 47, theme: "微信语音",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "语音", pinyin: "Yǔ yīn", note: "yǔ yīn - voice" },
          { text: "收到", pinyin: "Shōu dào", note: "shōu dào - receive" },
          { text: "打字", pinyin: "Dǎ zì", note: "dǎ zì - type" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "我现在给您发语音。", pinyin: "Wǒ xiàn zài gěi nín fā yǔ yīn." },
          { text: "您收到我的语音了吗？", pinyin: "Nín shōu dào wǒ de yǔ yīn le ma?" },
          { text: "稍等，我打字回复您。", pinyin: "Shāo děng, wǒ dǎ zì huí fù nín." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "微信语音聊天：\"妈，我给您发语音了。——收到了，正在听。——您收到我的语音了吗？——听到了，稍等，我打字回复您，语音说得不太清楚。\"", pinyin: "Wēi xìn yǔ yīn liáo tiān: \"Mā, wǒ gěi nín fā yǔ yīn le.——Shōu dào le, zhèng zài tīng.——Nín shōu dào wǒ de yǔ yīn le ma?——Tīng dào le, shāo děng, wǒ dǎ zì huí fù nín, yǔ yīn shuō de bú tài qīng chu.\"" }
        ]
      }
    }
  },

  // ========== Week 9: 家庭社交 ==========
  {
    week: 9, day: 48, theme: "见面寒暄",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "好久不见", pinyin: "Hǎo jiǔ bú jiàn", note: "hǎo jiǔ - long time" },
          { text: "身体", pinyin: "Shēn tǐ", note: "shēn tǐ - health" },
          { text: "家里人", pinyin: "Jiā lǐ rén", note: "jiā rén - family" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "好久不见了！您身体怎么样？", pinyin: "Hǎo jiǔ bú jiàn le! Nín shēn tǐ zěn me yàng?" },
          { text: "孩子们都好吧？", pinyin: "Hái zi men dōu hǎo ba?" },
          { text: "家里人都好吗？", pinyin: "Jiā lǐ rén dōu hǎo ma?" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "见亲家：\"好久不见了！您身体怎么样？——挺好的。——孩子们都好吧？——都好，工作顺利。——家里人都好那就好。\"", pinyin: "Jiàn qīn jia: \"Hǎo jiǔ bú jiàn le! Nín shēn tǐ zěn me yàng?——Tǐng hǎo de.——Hái zi men dōu hǎo ba?——Dōu hǎo, gōng zuò shùn lì.——Jiā lǐ rén dōu hǎo nà jiù hǎo.\"" }
        ]
      }
    }
  },
  {
    week: 9, day: 49, theme: "招待客人",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "喝茶", pinyin: "Hē chá", note: "hē chá - tea" },
          { text: "客气", pinyin: "Kè qi", note: "kè qi - polite restraint" },
          { text: "多吃点", pinyin: "Duō chī diǎn", note: "duō chī - eat more" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "来，请喝茶。", pinyin: "Lái, qǐng hē chá." },
          { text: "别客气，就像自己家一样。", pinyin: "Bié kè qi, jiù xiàng zì jǐ jiā yí yàng." },
          { text: "多吃点，这是我做的菜。", pinyin: "Duō chī diǎn, zhè shì wǒ zuò de cài." }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "招待亲家：\"来，请喝茶，别客气。——您太客气了。——多吃点，这鱼是我早上买的，新鲜。——好吃，您手艺真好。\"", pinyin: "Zhāo dài qīn jia: \"Lái, qǐng hē chá, bié kè qi.——Nín tài kè qi le.——Duō chī diǎn, zhè yú shì wǒ zǎo shang mǎi de, xīn xiān.——Hǎo chī, nín shǒu yì zhēn hǎo.\"" }
        ]
      }
    }
  },

  // ========== Week 10: 节日祝福 ==========
  {
    week: 10, day: 50, theme: "节日祝福",
    segments: {
      warmUp: {
        title: "热身 · 重点词语",
        duration: 2, speed: 0.8,
        items: [
          { text: "新年快乐", pinyin: "Xīn nián kuài lè", note: "xīn nián - new year" },
          { text: "身体健康", pinyin: "Shēn tǐ jiàn kāng", note: "jiàn kāng - healthy" },
          { text: "万事如意", pinyin: "Wàn shì rú yì", note: "rú yì - as wished" }
        ]
      },
      core: {
        title: "核心 · 日常短句",
        duration: 5, speed: 1.0,
        items: [
          { text: "祝您新年快乐！", pinyin: "Zhù nín xīn nián kuài lè!" },
          { text: "祝您身体健康，阖家幸福！", pinyin: "Zhù nín shēn tǐ jiàn kāng, hé jiā xìng fú!" },
          { text: "祝您福如东海，寿比南山！", pinyin: "Zhù nín fú rú dōng hǎi, shòu bǐ nán shān!" }
        ]
      },
      challenge: {
        title: "挑战 · 流利对话",
        duration: 3, speed: 1.0,
        items: [
          { text: "春节拜年：\"张阿姨，给您拜年了！祝您新年快乐，身体健康，万事如意，阖家幸福，福如东海，寿比南山！\"", pinyin: "Chūn jié bài nián: \"Zhāng ā yí, gěi nín bài nián le! Zhù nín xīn nián kuài lè, shēn tǐ jiàn kāng, wàn shì rú yì, hé jiā xìng fú, fú rú dōng hǎi, shòu bǐ nán shān!\"" }
        ]
      }
    }
  }
]

function getDayContent(day) {
  const content = ALL_CONTENTS.find(c => c.day === day)
  if (content) {
    return {
      title: `第 ${content.week} 周 - 第 ${day} 天：${content.theme}`,
      segments: content.segments
    }
  }
  // Fallback: cycle through content if day > 50
  const index = (day - 1) % ALL_CONTENTS.length
  const fallback = ALL_CONTENTS[index]
  return {
    title: `第 ${fallback.week} 周 - 第 ${day} 天（循环）：${fallback.theme}`,
    segments: fallback.segments
  }
}

module.exports = {
  getDayContent,
  ALL_CONTENTS
}