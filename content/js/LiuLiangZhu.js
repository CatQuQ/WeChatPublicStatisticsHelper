class LiuLiangZhu {
    constructor(date, money) {
        this.Date = date;        // 日期
        this.Money = money / 100;   //钱
    }
}

let TotalMoney = 0;//每月1号 到 当前日
const LiuLiangZhuList = [];

const GetLiuLiangZhu = (beginDate, endDate) => {
    $.getJSON("https://mp.weixin.qq.com/promotion/publisher/publisher_stat",
        {
            "action": "biz_ads_stat",
            "page": "1",
            "page_size": "10",
            "start_date": beginDate,
            "end_date": endDate,
            "slot": "1",
            "token": token,
            "appid": "",
            "spid": "",
            "_": "1534775904961",
        },
        function (data, textStatus, jqXHR) {
            //data.list 每天流量主 
            //data.summary 起始日-截止日 汇总
            if(typeof data.list == "undefined"){
                LiuLiangZhuList.push(new LiuLiangZhu("暂无数据",NaN));
                return;
            }
            const list = data.list;
            for (let i = 0; i < list.length; i++) {
                const date = data.list[i].date;
                const money = data.list[i].income;
                LiuLiangZhuList.push(new LiuLiangZhu(date, money));
            }
        });
};

const GetTotalMoney = () => {
    $.getJSON("https://mp.weixin.qq.com/promotion/publisher/publisher_stat",
        {
            "action": "biz_ads_stat",
            "page": "1",
            "page_size": "10",
            "start_date": startDay,
            "end_date": endDay,
            "slot": "1",
            "token": token,
            "appid": "",
            "spid": "",
            "_": "1534775904961",
        },
        function (data, textStatus, jqXHR) {
            //data.list 每天流量主 
            //data.summary 起始日-截止日 汇总
            if (typeof data.summary.income == "undefined") {
                TotalMoney = "暂无数据";

            } else {
                TotalMoney = (data.summary.income / 100);
            }
        });
}

const AutoGetLiuLiangZhu = () => {
    //获取数据
    LiuLiangZhuList.length = 0;
    GetLiuLiangZhu(startDay, endDay);
    GetTotalMoney();
    setTimeout(CreateLiuLiangZhuInfoTable, 1500);
}


