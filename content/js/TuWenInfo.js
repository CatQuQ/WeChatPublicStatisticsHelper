class TuWenInfo {
    constructor(gzhReadCount,tuWenReadCount,fenXiangZhuanFaCount,date) {
       this.Date=date;
       this.GZHReadCount=gzhReadCount;//公众号会话阅读次数
       this.TuWenReadCount=tuWenReadCount;//图文总阅读次数
       this.FenXiangZhuanFaCount=fenXiangZhuanFaCount;//分享转发次数
    }
}

const TuWenInfoList=[];

const GetTuWenInfo=(beginDate, endDate)=>{
    $.getJSON("https://mp.weixin.qq.com/misc/appmsganalysis",
    {
        "action":"report",
        "type":"daily",
        "begin_date":beginDate,
        "end_date":endDate,
        "token":token,
        "lang":"zh_CN",
        "f":"json",
        "ajax":"1",
        "random":"0.8973625561251151"
    }, function (data) {
        const list=data.item;   //user_source 0 - user_source  99999999 为一组 个数不是固定的
        let result=[];
        let temp=[];
        for(let i=0;i < list.length;i++){
             const e=list[i];
             if(e.user_source!=99999999){
                temp.push(e);   
             }else{
                 temp.push(e);
                 result.push(temp);
                 temp=[];
             }
        }
        console.log(result);
         //开始处理 根据user source进行判断
         // user source=0  转发数 公众号打开次数
         // user source= 99999999 图文阅读数
         for (let i = 0; i < result.length; i++) {
             const e = result[i];
             //e 里面存了 [user source:0] [user source:1][user source:2]...[user source:99999]
             let date;
             let gzhReadCount;
             let fenXiangZhuanFaCount;
             let tuWenReadCount;
             e.forEach(p => {
                 if(p.user_source==0){
                    date=p.ref_date;
                    gzhReadCount= p.int_page_read_count;
                    fenXiangZhuanFaCount=p.share_count;
                 }
                 if(p.user_source==99999999){
                     tuWenReadCount=p.int_page_read_count;
                 }
                 if(typeof  tuWenReadCount==='undefined'){
                    tuWenReadCount="出错了";
                 }
             });
             TuWenInfoList.push(new TuWenInfo(gzhReadCount,tuWenReadCount,fenXiangZhuanFaCount,date));
         }
    });
};

const AutoGetTuWenInfo = () => {
    
    //获取数据
    TuWenInfoList.length = 0;
    GetTuWenInfo(startDay, endDay);
    setTimeout(CreateTuWenInfoTable, 1500);
}
