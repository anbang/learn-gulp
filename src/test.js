var nowDate = new Date(),
    nowYear=nowDate.getFullYear()+"",
    nowMonth=(nowDate.getMonth()+1),
    nowDay=nowDate.getDate(),
    fullHours=nowDate.getHours(),
    fullMinutes=nowDate.getMinutes();
var nowTimeStr=nowYear+(nowMonth<10 ? '0'+nowMonth : nowMonth)+nowDay+fullHours+fullMinutes;

console.log(nowTimeStr);