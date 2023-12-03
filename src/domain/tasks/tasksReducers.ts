import {NetworkRequestStatus} from 'domain/networkRequest/networkRequestModel';
import {type TasksReduxModel} from './tasksModel';
import {createSlice} from '@reduxjs/toolkit';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.InProgress,
  initialLoad: false,
  ids: [],
  byId: {},
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const {actions: tasksActions, reducer: tasksReducer} = tasksSlice;
