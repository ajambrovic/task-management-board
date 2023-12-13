import { TaskStatus } from 'domain/tasks/tasksModel';
import { selectTasksByTaskStatus } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Task } from './Task';
import './tasksStyle.css';

export const Tasks = ({ taskStatus }: { taskStatus: TaskStatus }) => {
  const tasks = useAppSelector((state) => selectTasksByTaskStatus(state, taskStatus));
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      tasksActions.changeTaskStatus({
        id: e.dataTransfer.getData('text'),
        taskStatus,
      }),
    );
  };

  return (
    <Col md>
      <Card onDrop={handleDrop} onDragOver={handleDragOver} className="shadow-1-strong m-3 p-2 pb-0">
        <Card.Header>
          <strong>{TaskStatus[taskStatus]}</strong>
        </Card.Header>
        {tasks.map((task) => (
          <Task taskId={task.id} key={task.id} />
        ))}
      </Card>
    </Col>
  );
};
