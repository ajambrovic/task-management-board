import {type TaskModel} from 'domain/tasks/tasksModel';
import {selectTaskById} from 'domain/tasks/tasksSelector';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {tasksActions} from 'domain/tasks/tasksSlice';

export const Task = ({taskId}: {taskId: TaskModel['id']}) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => selectTaskById(state, taskId));
  const handleDelete = () => {
    dispatch(tasksActions.deleteTask(taskId));
  };

  return (
    <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId}>
      {task.name}
      <Button variant="primary" onClick={handleDelete}>
        Delete task
      </Button>
    </ListGroup.Item>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
