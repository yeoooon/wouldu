const getDayString = (date: string) => {
  // 2022-11-29T00:00:00.000Z
  var yyyyMMdd = date.substring(0, 10);
  var sYear = yyyyMMdd.split('-')[0];
  var sMonth = yyyyMMdd.split('-')[1];
  var sDate = yyyyMMdd.split('-')[2];

  var dayNum = new Date(Number(sYear), Number(sMonth)-1, Number(sDate));

  var week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[dayNum.getDay()];
};

export default getDayString;