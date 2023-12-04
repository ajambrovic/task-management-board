import {TaskStatus} from 'domain/tasks/tasksModel';
import {selectTasksByTaskStatus} from 'domain/tasks/tasksSelector';
import {tasksActions} from 'domain/tasks/tasksSlice';
import Col from 'react-bootstrap/Col';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {Task} from './Task';

export const Tasks = ({taskStatus}: {taskStatus: TaskStatus}) => {
  const tasks = useAppSelector(state => selectTasksByTaskStatus(state, taskStatus));
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
    <Col onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>{TaskStatus[taskStatus]}</h2>
      {tasks.map(task => (
        <Task taskId={task.id} key={task.id} />
      ))}
    </Col>
  );
};
