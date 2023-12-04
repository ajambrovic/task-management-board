import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {NetworkRequestStatus} from 'domain/networkRequest/networkRequestModel';
import {TaskPriority, TaskStatus, type TaskModel, type TasksReduxModel} from './tasksModel';

const byIdDummyData = {
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
};

const initialState: TasksReduxModel = {
  networkRequestStatus: NetworkRequestStatus.Success,
  initialLoad: true,
  ids: ['1', '2', '3'],
  byId: byIdDummyData,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeTaskStatus: (state, action: PayloadAction<{taskStatus: TaskStatus; id: TaskModel['id']}>) => {
      state.byId[action.payload.id].status = action.payload.taskStatus;
    },
    createTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    deleteTask: (state, action: PayloadAction<TaskModel['id']>) => {
      const index = state.ids.findIndex(id => id === action.payload);
      const elementFound = index !== -1;
      if (elementFound) {
        state.ids.splice(index, 1);
        delete state.byId[action.payload];
      }
    },
    editTask: (state, action: PayloadAction<TaskModel>) => {
      state.byId[action.payload.id] = action.payload;
    },
  },
});

export const {actions: tasksActions, reducer: tasksReducer} = tasksSlice;
