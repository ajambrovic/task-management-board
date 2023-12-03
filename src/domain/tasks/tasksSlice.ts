import {NetworkRequestStatus} from 'domain/networkRequest/networkRequestModel';
import {type TaskModel, TaskPriority, TaskStatus, type TasksReduxModel} from './tasksModel';
import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  initialLoad: true,
  ids: ['1', '2', '3'],
  byId: {
    '1': {
      id: '1',
      name: 'First task',
      status: TaskStatus.ToDo,
      description: 'ToDo',
      dueByTimestamp: 1702011443720,
      priority: TaskPriority.High,
      assignedTeamMember: 'Pero Perić',
    },
    '2': {
      id: '2',
      name: 'Second task',
      status: TaskStatus.InProgress,
      description: 'InProgress',
      dueByTimestamp: 1702011443720,
      priority: TaskPriority.Medium,
      assignedTeamMember: 'Ivan Horvart',
    },
    '3': {
      id: '3',
      name: 'Third task',
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
  reducers: {
    changeTaskStatus: (state, action: PayloadAction<{taskStatus: TaskStatus; id: TaskModel['id']}>) => {
      state.byId[action.payload.id].status = action.payload.taskStatus;
    },
  },
});

export const {actions: tasksActions, reducer: tasksReducer} = tasksSlice;
