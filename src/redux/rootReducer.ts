import {tasksReducer} from 'domain/tasks/tasksReducers';
import {counterReducer} from './counter/slice';

const rootReducer = {
  counter: counterReducer,
  tasks: tasksReducer,
};

export default rootReducer;
