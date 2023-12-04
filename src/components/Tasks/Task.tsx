import {type TaskModel} from 'domain/tasks/tasksModel';
import {selectTaskById} from 'domain/tasks/tasksSelector';
import ListGroup from 'react-bootstrap/ListGroup';
import {useAppSelector} from 'redux/hooks';
import {EditTask} from './EditTask';
import Stack from 'react-bootstrap/Stack';

export const Task = ({taskId}: {taskId: TaskModel['id']}) => {
  const task = useAppSelector(state => selectTaskById(state, taskId));
  return (
    <>
      <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId}>
        <Stack direction="horizontal">
          {task.name}
          <EditTask taskId={taskId} />
        </Stack>
      </ListGroup.Item>
    </>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
