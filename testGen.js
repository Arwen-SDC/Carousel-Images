var rng = (userContext, event, done) => {
  const id = Math.floor(Math.random() * 10000000) + 1;
  userContext.vars.id = id;
  return done();
}
module.exports.rng = rng;