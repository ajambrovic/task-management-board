import {combineReducers} from '@reduxjs/toolkit';
import {tasksReducer} from 'domain/tasks/tasksSlice';
import {counterReducer} from './counter/slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  tasks: tasksReducer,
});

export default rootReducer;
