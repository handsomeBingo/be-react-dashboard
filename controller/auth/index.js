var mysql = require('../../model/mysql');
var resStatus = require('../../config/res-status')
let login = function (req, res) {
  // how to set session ?

  let {userName, phone, password} = req.body;
  mysql.table('crm_user')
    .field(['password', 'phone', 'userName', 'nickname', 'id'])
    .where({
      phone
    })
    .select()
    .then((r) => {
      let [result] = r
      if (result && result.password === password) {
        res.cookie('ACCESS_TOKEN', 1);
        let resData = {
          ...result,
          token: 'YOU_HAVE_GOT_ACCESS_TOKEN'
        }
        res.send(resStatus.DONE(resData, '登录成功'))
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

let getUserInfo = function (req, res) {
  let query = req.body
  mysql.table('crm_user').where({id: query.id}).field().find().then((r) => {
    if (r) res.send(resStatus.DONE(r))
    else res.send(resStatus.INTERNAL_ERR())
  })
}
let changeInfo = function (req, res) {
  let query = req.body
  mysql.table('crm_user').where({id: query.id}).update(query).then(affectRows => {
    if (affectRows) res.send(resStatus.DONE({}))
  }).catch((e) => {
    res.send(resStatus.INTERNAL_ERR({...e}))
  })
};

let register = function (req, res) {
  let isFullfilled = Object.values(req.body).every(i => i)
  if (isFullfilled) {
    let d = req.body;
    d.add_time = Math.floor(+new Date() / 1000)
    d.update_time = 0
    delete d.repassword;
    mysql.table('crm_user').where(`phone=${d.phone}`).find().then((r) => {
      if (r.phone) {
        res.send(resStatus.ALREADY_BE())
      } else {
        mysql.table('crm_user').add(d).then((r) => {
          if (r) res.send(resStatus.DONE())
        })
      }
    });
  } else {
    res.send(resStatus.NOT_FULFILL())
  }
};

module.exports = {
  login,
  getUserInfo,
  changeInfo,
  register
};
