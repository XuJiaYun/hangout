const server = "";
module.exports = {
  api: {
    loginsession: "https://api.weixin.qq.com/sns/jscode2session",
    login: server + "/user/login",
    register: server + "/user/register",
    update: server + "/user/update"

  }
}