// eslint-disable-next-line @typescript-eslint/no-var-requires
const createTask = require('./createTask');

module.exports = (req, _res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
    req.body = createTask(req.body.name);
  }

  next();
};
