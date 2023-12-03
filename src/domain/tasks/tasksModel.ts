import {type NetworkRequestModel} from 'domain/networkRequest/networkRequestModel';

export type TasksServerModel = TasksModel[];

export type TasksReduxModel = TasksLocalModal & TasksConvertedServerModel;

export type TasksConvertedServerModel = {
  ids: TasksModel['id'][];
  byId: Record<TasksModel['id'], TasksModel>;
};

export type TasksLocalModal = NetworkRequestModel & {
  initialLoad: boolean;
};

export type TasksModel = {
  id: string;
  name: string;
  status: TaskStatus;
  description: string;
  dueByTimestamp: number;
  priority: TaskPriority;
  assignedTeamMember: string;
};

export enum TaskPriority {
  Low,
  Medium,
  High,
}

export enum TaskStatus {
  ToDo,
  InProgress,
  Completed,
}
