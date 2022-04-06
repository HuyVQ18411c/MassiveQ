function getCurrentTime(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes().toString();
  var seconds = date.getSeconds().toString();
  var formattedTime =
    hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);
  return formattedTime;
}
