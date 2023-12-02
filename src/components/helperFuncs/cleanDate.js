// Converts Date string to MM/DD/YY Format
function cleanDate(dateStr) {
  dateStr = new Date(dateStr);
  var year = String(dateStr.getFullYear());

  var month = (1 + dateStr.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = dateStr.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year.slice(2);
}

export default cleanDate;
