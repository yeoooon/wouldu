const getDayString = (date: string) => {
  var yyyyMMdd = String(date);
  var sYear = yyyyMMdd.substring(0,4);
  var sMonth = yyyyMMdd.substring(4,6);
  var sDate = yyyyMMdd.substring(6,8);

  var dayNum = new Date(Number(sYear), Number(sMonth)-1, Number(sDate));

  var week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[dayNum.getDay()] + '요일';
};

export default getDayString;