import {type TaskStatus} from 'domain/tasks/tasksModel';
import {selectTasksByTaskStatus} from 'domain/tasks/tasksSelector';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {Task} from './Task';
import {tasksActions} from 'domain/tasks/tasksSlice';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

export const Tasks = ({taskStatus}: {taskStatus: TaskStatus}) => {
  const tasks = useAppSelector(state => selectTasksByTaskStatus(state, taskStatus));
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>, taskStatus: TaskStatus) => {
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
    <Col
      className={'drag-drop-zone'}
      onDrop={e => {
        handleDrop(e, taskStatus);
      }}
      onDragOver={handleDragOver}>
      <h2>{taskStatus}</h2>
      <ListGroup>
        {tasks.map(task => (
          <Task taskId={task.id} key={task.id} />
        ))}
      </ListGroup>
    </Col>
  );
};
