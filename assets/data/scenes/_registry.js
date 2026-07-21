/* ============================================================
   GHOST CHANNEL — SCENES REGISTRY
   ============================================================
   所有互动场景的总索引。列表页从此文件读取并自动渲染。

   ★★★ AI 协作规则 ★★★
   1. 新增场景时，在对应数组【末尾 append 一条】，不要重排、不要删。
   2. id 全站唯一，命名规则 [type]-[character]-[序号两位]
      例: weibo-hayabusa-01 / call-asang-01 / thread-001
   3. file 字段是相对于 pages/scenes/[type]/[folder]/ 的文件名，不带路径。
   4. 头像/图片路径从 pages/scenes/[type]/index.html 视角写：../../../assets/...
      从 pages/scenes/[type]/[folder]/xxx.html 视角写：../../../../assets/...
      —— 但在 registry 里统一按【列表页视角】写：../../../assets/images/...
   5. 修改 schema 需和 shadow 确认后统一升级所有条目。
   ============================================================ */

window.SCENES_REGISTRY = {

    /* ------------------------------------------------------------
       微博 · weibo
       ------------------------------------------------------------
       字段 schema：
       {
         id:         string  必填  例 'weibo-hayabusa-01'
         file:       string  必填  详情页文件名（在 pages/scenes/social/posts/ 下）
         author:     string  必填  发帖者角色名
         handle:     string  可选  '@隼_shadow' 形式的用户名
         avatar:     string  必填  头像图片路径
         preview:    string  必填  正文预览（<=60字）
         time:       string  必填  '2024-08-15 23:47' 形式
         likes:      number  可选  默认 0
         comments:   number  可选  默认 0
         reposts:    number  可选  默认 0
         hasImage:   boolean 可选  是否有配图
         tag:        string  可选  标签，例 '#霖城之夜#'
       }
       ------------------------------------------------------------ */
    weibo: [
        // 示例（Phase 2 会填真数据，这里先占位）
        // {
        //   id: 'weibo-hayabusa-01',
        //   file: 'weibo-hayabusa-01.html',
        //   author: '隼',
        //   handle: '@隼_shadow',
        //   avatar: '../../../assets/images/char/hayabusa-avatar.webp',
        //   preview: '今晚的月色真不错。',
        //   time: '2024-08-15 23:47',
        //   likes: 1247,
        //   comments: 89,
        //   reposts: 34,
        //   hasImage: true
        // }
    ],

    /* ------------------------------------------------------------
       朋友圈 · moments
       ------------------------------------------------------------
       字段 schema：与 weibo 基本相同，多一个 images 数组（九宫格）
       {
         id, file, author, avatar, preview, time, likes, comments,
         images: ['path1.webp', 'path2.webp', ...]  最多9张
       }
       ------------------------------------------------------------ */
    moments: [],

    /* ------------------------------------------------------------
       通话记录 · calls （通用数据库，不绑定固定手机主人）
       ------------------------------------------------------------
       字段 schema：
       {
         id:         string  必填  例 'call-hayabusa-asang-01'
         file:       string  必填  详情页文件名
         caller:     string  必填  主叫方角色名
         callee:     string  必填  被叫方角色名
         time:       string  必填  '2024-08-14 03:12'
         duration:   string  必填  '00:47' | null（未接为 null）
         type:       string  必填  'outgoing' | 'incoming' | 'missed'
         preview:    string  必填  一句话概述（<=30字）
         audioLike:  boolean 可选  是否伪装为语音条视觉
       }
       ------------------------------------------------------------ */
    calls: [],

    /* ------------------------------------------------------------
       监控 · surveillance
       ------------------------------------------------------------
       字段 schema：
       {
         id:         string  必填  例 'cctv-alley-01'
         file:       string  必填  详情页文件名
         location:   string  必填  地点，例 '南三环 · 巷道'
         timestamp:  string  必填  '2024-08-15 02:33:41'
         thumbnail:  string  必填  列表页缩略图
         tag:        string  必填  '[CLASSIFIED]' | '[PUBLIC]' | '[LEAKED]'
         codeName:   string  可选  代号，例 'CAM_A17'
       }
       ------------------------------------------------------------ */
       surveillance: [
        {
            id:        'cctv-alley-01',
            file:      'alley-2024-08-15.html',
            location:  '南三环 · 巷道',
            timestamp: '2024-08-15 02:33:41',
            thumbnail: '',                    // 图片路径待补充
            tag:       '[CLASSIFIED]',
            codeName:  'CAM_A17'
        }
    ],


    /* ------------------------------------------------------------
       论坛 · forum （早期贴吧/天涯风）
       ------------------------------------------------------------
       字段 schema：
       {
         id:            string  必填  'thread-001'（顺序编号）
         file:          string  必填  详情页文件名
         title:         string  必填  帖子标题（<=40字）
         author:        string  必填  楼主昵称
         authorAvatar:  string  必填  楼主头像
         section:       string  必填  '灵异discuss' | '同城闲聊' | '追星' 等
         replies:       number  必填  回复数
         views:         number  必填  阅读数
         lastReply:     string  必填  '2024-08-16 08:22'
         pinned:        boolean 可选  是否置顶
         hot:           boolean 可选  是否加"热"标签
       }
       ------------------------------------------------------------ */
        forum: [
            {
      id:           'thread-001',
      file:         'thread-001.html',
      title:        '昨晚高架底下那辆没声音的黑车，谁遇上了？',
      author:       '燃油泵',
      authorAvatar: '',  
      section:      '霖城城东',
      replies:      15,
      views:        8421,
      lastReply:    '2024-09-11 02:35',
      pinned:       false,
      hot:          true
    },
        {
      id:           'thread-002',
      file:         'thread-002.html',
      title:        '【求证】布莱尔区蓝线地铁，凌晨2点半那班车的最后一节车厢…',
      author:       '夜班行尸走肉',
      authorAvatar: '',
      section:      '灵异discuss',
      replies:      14,
      views:        1304,
      lastReply:    '2026-10-16 04:00',
      pinned:       false,
      hot:          true
    },
      {
    id:           'thread-003',
    file:         'thread-003.html',
    title:        '[绞索角校园日常] 捞人！北校区图书馆，那个穿“乌鸦队”复古夹克的男生！',
    author:       '草莓波波冰',
    authorAvatar: '',
    section:      '阿卡迪亚校园墙',
    replies:      7,
    views:        452,
    lastReply:    '2023-10-24 20:12',
    pinned:       false,
    hot:          true
  },
    {
    id:           'thread-004',
    file:         'thread-004.html',
    title:        '[绞索角日常] 救命！周末要和暧昧对象第一次正式约会，这破城市到底哪里氛围好啊？',
    author:       '抹茶星冰乐',
    authorAvatar: '',
    section:      '同城闲聊',
    replies:      7,
    views:        688,
    lastReply:    '2023-11-03 22:45',
    pinned:       false,
    hot:          true
  },
      {
      id:           'thread-005',
      file:         'thread-005.html',
      title:        '昨夜在锦瑟巷淘到一支旧乌木笔，写出的字竟如活物...',
      author:       '落榜闲人',
      authorAvatar: '',
      section:      '【大晟】鬼市留言壁',
      replies:      7,
      views:        4028,
      lastReply:    '1023-09-08 23:55',
      pinned:       false,
      hot:          true
    }



    ],


    /* ------------------------------------------------------------
       拨号盘 · dial
       ------------------------------------------------------------
       特殊结构：不是数组而是对象。
       contacts 字段是全站号码本，用户在拨号盘输入号码后匹配这个列表。
       
       字段 schema：
       {
         number:      string  必填  '138-0001-0001' 格式（11位，含分隔符）
         name:        string  必填  接通后显示的名字 | null=空号
         reachable:   boolean 必填  true=能打通, false=空号/关机/忙音
         file:        string  必填时  rhachable=true 时必填，指向对话详情页
         unreachableType: string 可选  'empty'|'busy'|'off' 三选一，默认 'empty'
         hint:        string  可选  拨号盘"?"按钮里显示的提示，例 '试试这个号码'
       }
       ------------------------------------------------------------ */
        /* ------------------------------------------------------------
       拨号盘 · dial
       ------------------------------------------------------------ */
    dial: {
        /* 信息流(主界面卡片) */
        feeds: [
            {
                id:         'feed-demo-line',
                type:       'msg',
                title:      '一条没有来源的短信',
                preview:    '"试着打这个号码,有人会接。"凌晨三点收到,发送者未知。',
                time:       '2024-08-15 03:12',
                phonePage:  'demo-line.html'
            }
        ],

        /* 号码本 */
        contacts: [
            {
                number:     '138-0815',
                name:       '???',
                reachable:  true,
                file:       'demo-talk-01.html',
                feedId:     'feed-demo-line'
            },
            {
                number:     '666-6666',
                name:       null,
                reachable:  false,
                unreachableType: 'empty',
                feedId:     'feed-demo-line'
            }
        ]
    }

};

/* 冻结防止误改（可选，若 AI 需要动态修改就注释掉）
   Object.freeze(window.SCENES_REGISTRY);
*/
