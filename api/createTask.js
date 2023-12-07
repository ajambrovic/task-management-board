/* eslint-disable @typescript-eslint/no-var-requires */
const { faker } = require('@faker-js/faker');
const { random, upperFirst } = require('lodash');

const teamMembers = ['Pero Perić', 'Ivo Ivić', 'Ivan Horvat'];
const status = [0, 1, 2];

function createTaskDb() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(random(2, 4)).split(' ').map(upperFirst).join(' '),
    status: status[random(0, status.length - 1)],
    description: faker.lorem.words(random(1, 2)).split(' ').map(upperFirst).join(' '),
    dueByTimestamp: new Date().getTime(),
    priority: status[random(0, status.length - 1)],
    assignedTeamMember: teamMembers[random(0, teamMembers.length - 1)],
  };
}

function createTask(task) {
  return {
    ...task,
    id: faker.string.uuid(),
  };
}

module.exports = {
  createTaskDb,
  createTask,
};
