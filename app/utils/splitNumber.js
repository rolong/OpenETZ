
let splitNumber = (() => {  
  let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g
  let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g
  return (num) => num && num.toString()
    .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','))
})()


function sliceAddress(str,len){
  len = len || 8
  return `${str.slice(0,len)}...${str.slice(str.length-len,str.length)}`
}

function timeStamp2Date(d){
  let time = 0,
      timeStr = '';

  if(d.lastIndexOf('.') === -1){
    time = parseInt(d)*1000
  }else{
    time = parseInt(d.slice(0,d.lastIndexOf('.')))*1000
  }
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  timeStr = `${day}/${month+1}/${year}`
  return timeStr
}

function timeStamp2FullDate(d){
  let time = 0,
      fullTime = '';

  // if(d.lastIndexOf('.') === -1){
  //   time = parseInt(d)*1000
  // }else{
  //   time = parseInt(d.slice(0,d.lastIndexOf('.')))*1000
  // }

  if(d.length === 0){
    fullTime = 'pending'
    return fullTime 
  }else{
    time = parseInt(d)*1000
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let second = date.getSeconds()

    fullTime = `${day}/${month+1}/${year} ${hour}:${min}:${second}`
    return fullTime
  }
}
function timeSFullData(t){
  
  let fullTime = '';
  let date = new Date(t*1000)
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let second = date.getSeconds()

  fullTime = `${day}/${month+1}/${year} ${hour}:${min}:${second}`
  return fullTime
}
function splitDecimal(str){
  let y = String(str).indexOf(".") + 1
  let count = String(str).length - y

  let be = String(str).slice(0,y-1)

  let newString = ''
  if(y > 0) {
    if(count > 8){
      newString = `${be}.${String(str).slice(y,9+be.length)}`
    }else{
      newString = `${be}.${String(str).slice(y,)}`
    }
  }else{
    newString = String(str)
  }
  return newString
}

export { 
  splitNumber,
  sliceAddress,
  timeStamp2Date,
  timeStamp2FullDate,
  splitDecimal,
  timeSFullData
}