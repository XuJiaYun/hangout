const formatDateAndTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':');
}


const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getBetweenTime(dateA){
  var currentTime = Date.parse(new Date())/1000;
  var finalTime = Date.parse(new Date(dateA))/1000;
  var countDownDay = Math.ceil((finalTime-currentTime)/3600/24)
  return countDownDay;
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateAndTime: formatDateAndTime,
  getBetweenTime: getBetweenTime
}
