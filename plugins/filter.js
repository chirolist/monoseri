import Vue from 'vue'

Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

Vue.filter('toStatusName', function (status) {
  switch(status){
    case 1:
      return '交換呼びかけ中';
    case 0:
      return '停止中';
  }
})

Vue.filter('chunk', function (str) {
  if(str.length > 8) {
    return str.substr(0, 8) + '...'
  } else {
    return str
  }
})
