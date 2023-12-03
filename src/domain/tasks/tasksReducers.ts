import {NetworkRequestStatus} from 'domain/networkRequest/networkRequestModel';
import {TaskPriority, TaskStatus, type TasksReduxModel} from './tasksModel';
import {createSlice} from '@reduxjs/toolkit';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  initialLoad: true,
  ids: ['1', '2', '3'],
  byId: {
    '1': {
      id: '1',
      name: 'A',
      status: TaskStatus.ToDo,
      description: 'ToDo',
      dueByTimestamp: 1702011443720,
      priority: TaskPriority.High,
      assignedTeamMember: 'Pero Perić',
    },
    '2': {
      id: '2',
      name: 'B',
      status: TaskStatus.InProgress,
      description: 'InProgress',
      dueByTimestamp: 1702011443720,
      priority: TaskPriority.Medium,
      assignedTeamMember: 'Ivan Horvart',
    },
    '3': {
      id: '3',
      name: 'C',
      status: TaskStatus.Completed,
      description: 'Completed',
      dueByTimestamp: 1701511443720,
      priority: TaskPriority.Low,
      assignedTeamMember: 'Pero Perić',
    },
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const {actions: tasksActions, reducer: tasksReducer} = tasksSlice;
