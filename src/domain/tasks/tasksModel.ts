import { type NetworkRequestModel } from 'domain/networkRequest/networkRequestModel';

export type TasksServerModel = TaskModel[];

export type TasksReduxModel = TasksLocalModal & TasksConvertedServerModel;

export type TasksConvertedServerModel = {
  ids: TaskModel['id'][];
  byId: Record<TaskModel['id'], TaskModel>;
};

export type TasksLocalModal = NetworkRequestModel & { error: string; searchQuery: string };

export type TaskModel = {
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
