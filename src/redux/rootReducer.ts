import {tasksReducer} from 'domain/tasks/tasksSlice';
import {counterReducer} from './counter/slice';

const rootReducer = {
  counter: counterReducer,
  tasks: tasksReducer,
};

export default rootReducer;
