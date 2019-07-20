//创建一个类 保存每天文章信息
class ArticleInfo {
    // 构造  
    constructor(Id, Date, YueDuSum, DianZanSum, Status, TopReadCount) {
        this.Id = Id;
        this.Date = Date;//发文时间
        this.YueDuSum = YueDuSum;//阅读数
        this.DianZanSum = DianZanSum;//点赞数
        this.Status = Status;//状态
        this.TopReadCount = TopReadCount;
    }
}
//所有文章li(每天的文章对应一个li)
const $AllArticelLi = $("#list>li");

//给每个文章li创建 对应的按钮 class=JLFBtn 绑定事件
const CreatBtn = () => {
    //遍历所有文章列表 创建按钮 dayNum自定义属性
    for (let i = 0; i < $AllArticelLi.length; i++) {
        $AllArticelLi.eq(i).find("div[class='weui-desktop-mass__overview']").append(`<button dayNum="${i}"  class='JLFBtn btn btn-danger'>Start</button>`);
    }
    //绑定点击事件  
    $("#list").on("click", "button[class^='JLFBtn']", function () {
        const o = GetArticleInfo(this);
        layer.tips(`总阅读数:${o.YueDuSum}   总点赞数:${o.DianZanSum}`, $(this));
        //alert(`总阅读数:${o.YueDuSum}   总点赞数:${o.DianZanSum}`);
    });
};
//获取一天的文章信息 o: 含有[daynum]属性的button  e:$AllArticelLi li的编号 0开始
const GetArticleInfo = (o, e) => {
    let dayNum;
    //o有传参
    if (o != null) {
        dayNum = $(o).attr("dayNum");
    } else {
        //o没有传参
        dayNum = e;
    }

    //阅读总数
    let yueDuSum = 0;
    //点赞总数
    let dianzanSum = 0;
    //统计阅读总数
    $AllArticelLi.eq(dayNum).find("li[class^='weui-desktop-mass-media__data appmsg-view']>span").each((i, o) => {
        yueDuSum += parseInt($.trim($(o).text()));
    });
    //统计点赞总数 weui-desktop-mass-media__data appmsg-like
    $AllArticelLi.eq(dayNum).find("li[class^='weui-desktop-mass-media__data appmsg-like']>span").each((i, o) => {
        dianzanSum += parseInt($.trim($(o).text()));
    });
    //发文时间
    const time = $AllArticelLi.eq(dayNum).find("em[class='weui-desktop-mass__time']").text();
    //发文天数编号
    const Id = parseInt(dayNum) + 1;
    //该天的状态（已删除,发送完毕）
    const status = $.trim($AllArticelLi.eq(dayNum).find("span[class^='js_status_txt']").text());
    //头条阅读数
    const topReadCount = $.trim($AllArticelLi.eq(dayNum).find("span[class='weui-desktop-mass-media__data__inner']:eq(0)").text());
    const articleInfo = new ArticleInfo(Id, time, yueDuSum, dianzanSum, status, topReadCount);
    return articleInfo;
};