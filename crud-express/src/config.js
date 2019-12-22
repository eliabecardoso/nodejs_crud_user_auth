module.exports = {
  development: {
    port: process.env.PORT || 25000,
    saltingRounds: 10, //para bcrypt hash = nr de saltos
    nroChatRooms: 3
  }
};
