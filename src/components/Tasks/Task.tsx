import {type TaskModel} from 'domain/tasks/tasksModel';
import {selectTaskById} from 'domain/tasks/tasksSelector';
import ListGroup from 'react-bootstrap/ListGroup';
import {useAppSelector} from 'redux/hooks';
import {EditTask} from './EditTask';

export const Task = ({taskId}: {taskId: TaskModel['id']}) => {
  const task = useAppSelector(state => selectTaskById(state, taskId));
  return (
    <>
      <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId}>
        {task.name}
      </ListGroup.Item>
      <EditTask taskId={taskId} />
    </>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
