class UserInfo {
    constructor(date, new_user, netgain_user, cumulate_user, cancel_user) {
        this.Cancel_user = cancel_user;  //取消关注人数
        this.Cumulate_user = cumulate_user;//累计关注人数
        this.Netgain_user = netgain_user; //净增关注人数
        this.New_user = new_user;   //新关注人数
        this.Date = date;        // 日期
    }
}
const AutoGetUserInfo = () => {
    //获取数据
    userInfoList.length = 0;
    GetUserInfo(startDay, endDay);
    setTimeout(CreateUserInfoTable, 1500);
}
//2018-08-16 date格式
const GetUserInfo = (beginDate, endDate) => {
    $.getJSON("https://mp.weixin.qq.com/misc/useranalysis",
        {
            begin_date: beginDate,
            end_date: endDate,
            source: '99999999',
            token: token,
            lang: 'zh_CN',
            f: 'json',
            ajax: '1',
            random: '0.3018668890073837'
        }, function (data) {
            list = data.category_list[0].list;//这就是存放用户信息的列表
            for (let i = 0; i < list.length; i++) {
                userInfoList.push(new UserInfo(list[i].date, list[i].new_user, list[i].netgain_user, list[i].cumulate_user, list[i].cancel_user));
            }
        });
};

const userInfoList = [];//存放用户信息的集合







