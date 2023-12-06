import {TaskPriority, TaskStatus, type TaskModel} from 'domain/tasks/tasksModel';
import {tasksActions} from 'domain/tasks/tasksSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {TaskForm} from './TaskForm';

export const AddNewTask = () => {
  const task: TaskModel = {
    id: '',
    name: '',
    status: TaskStatus.ToDo,
    description: '',
    dueByTimestamp: 0,
    priority: TaskPriority.Medium,
    assignedTeamMember: '',
  };

  return (
    <Row className="p-3 text-center">
      <Col>
        <TaskForm task={task} action={tasksActions.createTask} buttonTitle="Add task" />
      </Col>
    </Row>
  );
};
