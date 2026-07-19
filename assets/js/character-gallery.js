/* ============================================================
   GHOST CHANNEL — CHARACTER GALLERY
   瀑布流渲染 · 灯箱查看 · 内存友好
   ============================================================ */

/* ---------- 图片数据（在这里增删改，最方便） ---------- */
/*
   每张图片的字段：
   - thumb : 缩略图路径（400px 宽 WebP，用于网格）
   - full  : 高清原图路径（1600px 宽 WebP，用于灯箱）
   - title : 标题
   - desc  : 简介，可用 \n 换行
   （编号 FIG.XXX 由数组顺序自动生成，无需手写）
*/
const GALLERY_DATA = [
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fD91/1632X2912/0_0%2B-%2B2025-06-27T135940.088.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fD91/1632X2912/0_0%2B-%2B2025-06-27T135940.088.jpeg/webp',
        title: '苍白的挽歌',
        desc:  '鲜血褪去后的十字架，只剩下灰烬与沉默。\n不要试图唤醒沉睡的夜。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zUPx/1632X2912/0_0%2B-%2B2025-06-27T135753.101.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zUPx/1632X2912/0_0%2B-%2B2025-06-27T135753.101.jpeg/webp',
        title: '破碎的倒影',
        desc:  '乌鸦在塔楼盘旋，带走最后一丝温度。\n镜子里的那张脸，早就不属于我。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/KcOo/1632X2912/0_0%2B-%2B2025-06-27T135955.887.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/KcOo/1632X2912/0_0%2B-%2B2025-06-27T135955.887.jpeg/webp',
        title: '永夜的低语',
        desc:  '提灯的光芒无法穿透这片灵魂的荒芜。\n我们在深渊边缘，等待着被吞噬。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Zegj/1632X2912/0_0%2B-%2B2025-06-27T135749.214.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Zegj/1632X2912/0_0%2B-%2B2025-06-27T135749.214.jpeg/webp',
        title: '枯萎的黑蔷薇',
        desc:  '爱情与死亡，最终都成了干瘪的花瓣。\n风一吹，连同誓言一起散落。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/wWCn/1632X2912/0_0%2B-%2B2025-06-29T164042.175.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/wWCn/1632X2912/0_0%2B-%2B2025-06-29T164042.175.jpeg/webp',
        title: '第十三次葬礼',
        desc:  '墓碑上的名字早已斑驳不清。\n只有无尽的冷雨，还在诉说被遗忘的罪恶。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ABUm/1632X2912/0_0%2B-%2B2025-06-27T135746.920.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ABUm/1632X2912/0_0%2B-%2B2025-06-27T135746.920.jpeg/webp',
        title: '提线木偶',
        desc:  '丝线嵌进血肉，舞步伴随着关节碎裂的脆响。\n没有灵魂的躯壳，连流泪都是一种奢望。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jEbO/1632X2912/0_0%2B-%2B2025-06-29T164044.176.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jEbO/1632X2912/0_0%2B-%2B2025-06-29T164044.176.jpeg/webp',
        title: '血族之拥',
        desc:  '獠牙刺破苍白颈项的瞬间，是永生的赐福，亦是诅咒。\n黎明，是永远无法触及的痛。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C1qN/1632X2912/0_0%2B-%2B2025-06-29T163404.186.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C1qN/1632X2912/0_0%2B-%2B2025-06-29T163404.186.jpeg/webp',
        title: '黑天鹅的哀羽',
        desc:  '水面上漂浮着最后一片黑羽。\n她沉入寒冷的湖底，将秘密永远封存。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6dMw/1632X2912/0_0%2B-%2B2025-06-29T163406.720.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6dMw/1632X2912/0_0%2B-%2B2025-06-29T163406.720.jpeg/webp',
        title: '猩红之眼',
        desc:  '在黑暗中凝视深渊的人，眼底也会染上绝望的底色。\n别看，那里面藏着地狱。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/MbXq/1632X2912/0_0%2B-%2B2025-06-29T163400.717.jpeg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/MbXq/1632X2912/0_0%2B-%2B2025-06-29T163400.717.jpeg/webp',
        title: '尘封的契约',
        desc:  '用干涸的血迹写下的羊皮纸，字迹发黄斑驳。\n代价是交出你那千疮百孔的心。',
    },
        {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/7VbY/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9170545407399874201%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/7VbY/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9170545407399874201%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '褪色的祈祷',
        desc:  '荆棘爬满神像的眼睑，遮蔽了最后的怜悯。\n这里没有救赎，只有无尽的坠落。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/AZRu/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D2775562217282809817%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/AZRu/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D2775562217282809817%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '灰烬之舞',
        desc:  '华尔兹的旋律在空荡的舞池回荡，惨白色的裙摆扬起。\n我拥抱着虚无，直到骨骼化为尘埃。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/CONb/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5624854795872163898%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/CONb/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5624854795872163898%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '暗夜的囚徒',
        desc:  '锁链早已生锈，却依然紧缚着苍白的灵魂。\n谁也无法逃离这月光下冰冷的樊笼。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jcEK/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8524464809881057140%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/jcEK/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8524464809881057140%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '凋零的颂歌',
        desc:  '乌鸦啄食着最后一句誓言，残血染红了荒废的祭坛。\n神明早已远去，我们在废墟中狂欢。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/lF54/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7580093017687814497%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/lF54/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7580093017687814497%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '遗忘的古堡',
        desc:  '枯藤绞杀了时间的刻度，壁炉里只剩冰冷的余烬。\n留我一人，等待一个永远不会归来的人。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fqBx/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5117508936246923582%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/fqBx/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5117508936246923582%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '泣血的满月',
        desc:  '夜风如刃，割裂了虚伪的宁静。\n那轮猩红的月，是某人未能合上的眼睛。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ImRS/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8791694675974517942%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/ImRS/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8791694675974517942%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '深渊的倒影',
        desc:  '不要长久凝视黑水潭中自己的倒影。\n那张扭曲的笑脸，正慢慢剥离你仅存的理智。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/V9Ju/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D678570500604679020%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/V9Ju/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D678570500604679020%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '破碎的八音盒',
        desc:  '齿轮卡在绝望的休止符上，发条渐渐松弛。\n它再也唱不出那首属于你的安魂曲。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/0HVt/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D811944030965291166%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/0HVt/816X1456/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D811944030965291166%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '最后的守墓人',
        desc:  '铁铲碰触到枯骨的脆响，是这静谧之地唯一的歌。\n今夜，又要为谁掘开潮湿的新泥？',
    },    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/5EC0/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8834397722974600041%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/5EC0/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8834397722974600041%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '沉没的祈祷室',
        desc:  '圣水池里只剩下发黑的淤泥。\n十字架倒悬，神不再垂听我们的忏悔。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/HgOn/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4544225612477519196%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/HgOn/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4544225612477519196%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '夜风中的悲鸣',
        desc:  '穿过石像鬼残缺翅膀的风，像极了女巫的抽泣。\n在这无星之夜，谁在敲打紧闭的铁门？',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zdz9/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8899534702411729837%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/zdz9/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8899534702411729837%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '苍白玫瑰的葬礼',
        desc:  '白色的花瓣染上了不可名状的红斑。\n泥土之下，长眠着未曾开口的秘密。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/JHqG/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D30102866342815687%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/JHqG/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D30102866342815687%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '深海的凝视',
        desc:  '冰冷的海水漫过脚踝，那是海妖最温柔的邀请。\n闭上眼，跟随着幽蓝色的火光沉溺吧。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/8MFJ/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7311792723546566157%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/8MFJ/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7311792723546566157%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '锈蚀的怀表',
        desc:  '秒针早已在那个雨夜停止了跳动。\n时间被永远困在了失去你的那一秒。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/IMTD/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D6547126368980796797%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/IMTD/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D6547126368980796797%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '荆棘王冠',
        desc:  '滴落的不是鲜血，而是早已干涸的执念。\n戴上它，在废墟中做自己孤独的王。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/cZti/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5811969873260493042%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/cZti/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5811969873260493042%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '乌鸦的晚宴',
        desc:  '它们在枯枝上冷眼旁观，等待着腐朽的盛宴。\n这具躯壳，不过是留给黑夜的最后祭品。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/5Xqk/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8089585606082626032%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/5Xqk/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8089585606082626032%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '迷雾中的幻影',
        desc:  '不要追逐雾中那个穿着黑丝绒长裙的背影。\n那是通往幽冥的单程引路人。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/659l/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8407251227727386565%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/659l/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8407251227727386565%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '断裂的琴弦',
        desc:  '大提琴的最后一声低吟，划破了教堂的寂静。\n没有听众，只有那些空洞注视着你的彩绘玻璃。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Vm7J/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D815181503231014959%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Vm7J/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D815181503231014959%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '无主的墓碑',
        desc:  '上面的墓志铭已经被狂风和酸雨抹去。\n也许很久以后，我也会躺在这里，无人问津。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6OIm/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D1985561132720601117%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6OIm/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D1985561132720601117%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '提线者的嗤笑',
        desc:  '木偶在舞台中央绝望地舞动着僵硬的关节。\n而在幕布后的阴影里，传来一声冰冷的轻笑。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/0WHz/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D478639697880377334%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/0WHz/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D478639697880377334%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '永不破晓',
        desc:  '我们用黑色的曼陀罗将窗户死死封住。\n只要不去看那虚伪的太阳，黑夜就可以永恒。',
    },
        {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/yJx0/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4837566458750460223%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/yJx0/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4837566458750460223%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '缝合的灵魂',
        desc:  '苍白的躯体在手术台上，被黑色的丝线强行缝合。\n你给我的不是新生，而是更漫长的折磨。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/aeaA/2560X1856/4k.png/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/aeaA/2560X1856/4k.png/webp',
        title: '猩红色的倒计时',
        desc:  '漏斗里的血沙即将流尽，审判的钟声在迷雾中回荡。\n没有谁能逃脱这场宿命的清算。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/XaPn/848X1424/2.png/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/XaPn/848X1424/2.png/webp',
        title: '囚笼中的夜莺',
        desc:  '就算把眼泪熬干，也无法穿透这冰冷的铁栅栏。\n我的歌声，只唱给死去的玫瑰听。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C3yh/848X1424/4.png/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/C3yh/848X1424/4.png/webp',
        title: '镜中恶鬼',
        desc:  '烛光摇曳，镜面浮现出一张熟悉又狰狞的笑脸。\n我们究竟是谁剥夺了谁的呼吸？',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/IoBd/848X1424/3.png/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/IoBd/848X1424/3.png/webp',
        title: '枯骨与权杖',
        desc:  '王座之上只有累累白骨，还在死死抓着权力的幻影。\n再辉煌的帝国，最终也不过是一抔黄土。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Wf0o/848X1424/1re.png/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/Wf0o/848X1424/1re.png/webp',
        title: '最后的悼念者',
        desc:  '撑着黑伞的影子渐渐融入浓雾，连同那一束枯萎的百合。\n这世上，再也没有人会呼唤你的名字。',
    },
        {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/7FxZ/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8373107930984000860%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/7FxZ/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D8373107930984000860%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '囚徒的夜祷',
        desc:  '铁窗外的月光切割着支离破碎的灵魂。\n没有神明会聆听这满是罪孽的呢喃。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6yYs/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7961694365540459592%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6yYs/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7961694365540459592%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '枯骨与王座',
        desc:  '荆棘王冠早已被干涸的鲜血染成暗红。\n他守着一座死去的王国，直到化作尘埃。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/F4Vy/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7928808015378676111%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/F4Vy/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7928808015378676111%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '迷雾中的幽灵',
        desc:  '钟楼的阴影里藏着未亡人的秘密。\n你听，那是她游荡在冷风中的叹息。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/r2tk/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3012620871880632532%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/r2tk/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3012620871880632532%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '渗血的油画',
        desc:  '画笔蘸满执念，勾勒出她生前的模样。\n可画布的边缘，却开始滴落温热的腥红。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/NJBO/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9189434653061615092%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/NJBO/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9189434653061615092%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '鸦群的审判',
        desc:  '它们用空洞的眼眸注视着这片荒芜的墓园。\n谁也无法逃脱这来自深渊的凝视。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/yWG2/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7567843026618815396%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/yWG2/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7567843026618815396%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '沉没的黑白键',
        desc:  '积灰的钢琴再也奏不出昔日的狂想。\n只剩下虫蛀的木头，在午夜发出断续的悲鸣。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/X7Lz/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D333262658081019808%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/X7Lz/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D333262658081019808%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '荆棘里的安眠',
        desc:  '用疼痛编织的摇篮，是她最后的归宿。\n闭上眼，就能回到那个没有背叛的幻梦中去。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/higP/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9136578047077972878%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/higP/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D9136578047077972878%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '苍白的烛泪',
        desc:  '摇曳的烛火即将燃烧殆尽，如同这残喘的生命。\n无尽的黑暗，才是绝对的仁慈。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/WXJN/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5807044570569589344%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/WXJN/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D5807044570569589344%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '遗忘之境',
        desc:  '迷雾吞噬了通向古堡的最后一条小径。\n留在这里吧，与游魂交换彼此的孤寂。',
    },
    {
        thumb: 'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6Pb1/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3655522995291667329%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        full:  'https://img3.tofaka.com/autoupload/1N2_UJVYUo2KjM-_22IFnCfNcKcqEnRmcljopnyJoMs/20260719/6Pb1/848X1424/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3655522995291667329%26skey%3D%40crypt_5a237c93_ed3a555a3aaee4dafb5cc80bc48c37fb%26mmweb_appid%3Dwx_webfilehelper.jpg/webp',
        title: '撕裂的信笺',
        desc:  '那些关于誓言的字迹，被泪水氤氲成扭曲的黑斑。\n没有救赎，只有冷风中空洞的回音。',
    }

];


/* ---------- DOM 引用 ---------- */
const grid = document.getElementById('cgGrid');
const lb = document.getElementById('cgLightbox');
const lbImg = document.getElementById('cgLbImg');
const lbFig = document.getElementById('cgLbFig');
const lbTitle = document.getElementById('cgLbTitle');
const lbDesc = document.getElementById('cgLbDesc');
const lbIndex = document.getElementById('cgLbIndex');
const lbTotal = document.getElementById('cgLbTotal');
const lbPrev = document.getElementById('cgLbPrev');
const lbNext = document.getElementById('cgLbNext');
const lbClose = document.getElementById('cgLbClose');
const lbBg = lb.querySelector('.cg-lightbox-bg');

let currentIndex = -1;

/* ---------- 工具：编号补零 ---------- */
function pad(n, width = 3) {
    return String(n).padStart(width, '0');
}

/* ---------- 渲染网格 ---------- */
function renderGrid() {
    const total = GALLERY_DATA.length;
    document.getElementById('cgTotalCount').textContent = pad(total);
    lbTotal.textContent = pad(total, 2);

    const frag = document.createDocumentFragment();
    let loadedCount = 0;
    const loadedEl = document.getElementById('cgLoadedCount');

    GALLERY_DATA.forEach((item, i) => {
        const fig = 'FIG.' + pad(i + 1);
        const card = document.createElement('div');
        card.className = 'cg-item';
        card.style.animationDelay = (0.03 * i) + 's';
        card.dataset.index = i;

        card.innerHTML = `
            <div class="cg-item-img-wrap">
                <img src="${item.thumb}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
                <div class="cg-crosshair"></div>
            </div>
            <div class="cg-item-caption">
                <span class="cg-item-fig">${fig}</span>
                <div class="cg-item-title">${escapeHtml(item.title)}</div>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(i));

        // 统计加载完成的缩略图数
        const imgEl = card.querySelector('img');
        imgEl.addEventListener('load', () => {
            loadedCount++;
            loadedEl.textContent = pad(loadedCount);
        });
        imgEl.addEventListener('error', () => {
            loadedCount++;
            loadedEl.textContent = pad(loadedCount);
            imgEl.style.opacity = '0.2';
            imgEl.alt = '[加载失败]';
        });

        frag.appendChild(card);
    });

    grid.appendChild(frag);
}

/* ---------- 打开灯箱 ---------- */
function openLightbox(index) {
    currentIndex = index;
    const item = GALLERY_DATA[index];

    lbFig.textContent = 'FIG.' + pad(index + 1);
    lbTitle.textContent = item.title;
    lbDesc.textContent = item.desc;
    lbIndex.textContent = pad(index + 1, 2);

    // 先清空 src 触发浏览器释放上一张
    lbImg.removeAttribute('src');
    // 用 requestAnimationFrame 让 DOM 更新
    requestAnimationFrame(() => {
        lbImg.src = item.full;
        lbImg.alt = item.title;
    });

    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // 预加载相邻图，切换更流畅
    preloadNeighbors(index);
}

/* ---------- 关闭灯箱（并释放内存） ---------- */
function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // 关键：清空 src，让浏览器立即释放高清图的解码位图
    setTimeout(() => {
        lbImg.removeAttribute('src');
    }, 300);
    currentIndex = -1;
}

/* ---------- 切换 ---------- */
function showPrev() {
    if (currentIndex < 0) return;
    const i = (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    openLightbox(i);
}
function showNext() {
    if (currentIndex < 0) return;
    const i = (currentIndex + 1) % GALLERY_DATA.length;
    openLightbox(i);
}

/* ---------- 相邻预加载 ---------- */
function preloadNeighbors(index) {
    const nextIdx = (index + 1) % GALLERY_DATA.length;
    const prevIdx = (index - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    [nextIdx, prevIdx].forEach(i => {
        const preImg = new Image();
        preImg.src = GALLERY_DATA[i].full;
    });
}

/* ---------- 事件绑定 ---------- */
lbClose.addEventListener('click', closeLightbox);
lbBg.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'ArrowRight') showNext();
});

/* 触摸滑动切换 */
let touchStartX = 0;
lb.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });
lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
        dx > 0 ? showPrev() : showNext();
    }
}, { passive: true });

/* 页面离开时兜底释放（虽然浏览器会自动做，但显式写更保险） */
window.addEventListener('pagehide', () => {
    lbImg.removeAttribute('src');
    document.querySelectorAll('.cg-item img').forEach(img => {
        // 只释放视口外的
        const rect = img.getBoundingClientRect();
        if (rect.bottom < -500 || rect.top > window.innerHeight + 500) {
            img.removeAttribute('src');
        }
    });
});

/* ---------- 汉堡菜单（沿用 characters.css 的类名） ---------- */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}

/* ---------- HTML 转义（防止标题里的特殊字符破坏结构） ---------- */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ---------- 启动 ---------- */
renderGrid();
/* ---------- 声明弹窗逻辑 ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const noticeModal = document.getElementById('cgNoticeModal');
    const noticeClose = document.getElementById('cgNoticeClose');
    const noticeConfirm = document.getElementById('cgNoticeConfirm');

    if (!noticeModal) return;

    // 检查本地缓存是否已经点击过确认（关闭后以后不再弹出）
    // 如果你想让每次刷新页面都弹，请删掉下面这个 if 条件的判断，只保留内部的 setTimeout 即可
    if (!localStorage.getItem('ghost_channel_notice_agreed')) {
        // 延迟 0.5 秒弹出，增加终端启动的仪式感
        setTimeout(() => {
            noticeModal.classList.add('show');
            noticeModal.setAttribute('aria-hidden', 'false');
        }, 500);
    }

    const closeNotice = () => {
        noticeModal.classList.remove('show');
        noticeModal.setAttribute('aria-hidden', 'true');
        // 记录到浏览器本地，下次再进页面不再打扰
        localStorage.setItem('ghost_channel_notice_agreed', 'true');
    };

    if (noticeClose) noticeClose.addEventListener('click', closeNotice);
    if (noticeConfirm) noticeConfirm.addEventListener('click', closeNotice);
});

