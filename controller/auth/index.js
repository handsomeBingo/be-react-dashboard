var mysql = require('../../model/mysql');
let login = function (req, res) {
  let {userName, phone, password} = req.body;
  mysql.table('crm_user')
    .field(['password', 'phone'])
    .where({
      phone
    })
    .find()
    .then((r) => {
      if (r && r.password === password) {
        res.cookie('ACCESS_TOKEN', 1);
        res.send({
          status: 0,
          data: {
            ACCESS_TOKEN: 'YOU_HAVE_GET_ACCESS_TO_THE_SOURCE'
          },
          msg: 'ok'
        })
      } else {
        res.cookie('ACCESS_TOKEN', '');
        res.send({
          status: -1,
          data: {},
          msg: '用户不存在或密码不正确'
        })
      }
    })
};
let changeInfo = function (req, res) {

};

let register = function (req, res) {
  res.send(req.body)
};

module.exports = {
  login,
  changeInfo,
  register
};
