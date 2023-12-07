import { combineReducers } from '@reduxjs/toolkit';
import { tasksReducer } from 'domain/tasks/tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
