const HTTP_STATUS = {
  ERR_401(msg) {
    return {
      code: 401,
      msg
    }
  },
  NOT_FULFILL(data, msg = '请检查必填信息') {
    return {
      data: {},
      code: 250,
      msg
    }
  },
  DONE(data, msg = 'ok') {
    return {
      data,
      code: 0,
      msg
    }
  },
  ALREADY_BE(data, msg = '用户已存在') {
    return {
      data: {},
      code: 100,
      msg
    }
  },
  INTERNAL_ERR(data = {}, msg = '内部错误') {
    return {
      data,
      msg,
      code: 500
    }
  }
}
module.exports = HTTP_STATUS
