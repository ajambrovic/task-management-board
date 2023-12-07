import { TaskPriority, type TaskModel } from 'domain/tasks/tasksModel';
import { selectTaskById } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppSelector } from 'redux/hooks';
import { convertTimestampToDate } from 'util/timeFormat';
import { TaskForm } from './TaskForm';

export const Task = ({ taskId }: { taskId: TaskModel['id'] }) => {
  const task = useAppSelector((state) => selectTaskById(state, taskId));
  return (
    <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId}>
      <Card.Body className="sortable-item rounded bg-white shadow-2 mb-2">
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle>Assigned to: {task.assignedTeamMember}</Card.Subtitle>
        <Card.Text>
          Task Due By: {convertTimestampToDate(task.dueByTimestamp)}
          <br />
          Task Priority: {TaskPriority[task.priority]}
        </Card.Text>
        <TaskForm task={task} action={tasksActions.editTask} shouldShowDelete buttonTitle="Edit task" />
      </Card.Body>
    </ListGroup.Item>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
