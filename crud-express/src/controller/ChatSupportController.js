const enviromnent = process.env.NODE_ENV;
const stage = require("../config")[enviromnent];

module.exports = {
  async store(req, res) {
    const msg = req.body;
    console.log(msg);

    req.io.of("/room").emit("newMsgHelp", msg);

    return res.send();
  }
};
