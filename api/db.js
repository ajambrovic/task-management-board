// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createTaskDb } = require('./createTask');

module.exports = () => {
  const data = { tasks: [] };

  for (let i = 0; i < 10; i++) {
    data.tasks.push(createTaskDb());
  }

  return data;
};
