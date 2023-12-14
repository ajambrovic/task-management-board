import { TaskPriority, type TaskModel } from 'domain/tasks/tasksModel';
import { selectTaskById } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppSelector } from 'redux/hooks';
import { convertTimestampToDate } from 'util/timeFormat';
import { TaskModal } from './TaskModal';
import './taskStyle.css';

export const Task = ({ taskId }: { taskId: TaskModel['id'] }) => {
  const task = useAppSelector((state) => selectTaskById(state, taskId));
  return (
    <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId} data-testid={`task-${taskId}`}>
      <Card.Body className="bg-white mb-2">
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle>Assigned to: {task.assignedTeamMember}</Card.Subtitle>
        <Card.Text>
          Task Due By: {convertTimestampToDate(task.dueByTimestamp)}
          <br />
          Task Priority: {TaskPriority[task.priority]}
        </Card.Text>
        <TaskModal
          task={task}
          action={tasksActions.editTask}
          shouldShowDelete
          buttonTitle="Edit task"
          id={`editTask${taskId}`}
        />
      </Card.Body>
    </ListGroup.Item>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
