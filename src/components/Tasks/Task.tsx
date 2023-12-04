import {TaskPriority, type TaskModel} from 'domain/tasks/tasksModel';
import {selectTaskById} from 'domain/tasks/tasksSelector';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useAppSelector} from 'redux/hooks';
import {convertTimestampToDate} from 'util/timeFormat';
import {EditTask} from './EditTask';

export const Task = ({taskId}: {taskId: TaskModel['id']}) => {
  const task = useAppSelector(state => selectTaskById(state, taskId));
  return (
    <ListGroup.Item draggable="true" onDragStart={handleDragStart} id={taskId}>
      <Card body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle>Assigned to: {task.assignedTeamMember}</Card.Subtitle>
        <Card.Text>
          Task Due By: {convertTimestampToDate(task.dueByTimestamp)}
          <br />
          Task Priority: {TaskPriority[task.priority]}
        </Card.Text>
        <EditTask taskId={taskId} />
      </Card>
    </ListGroup.Item>
  );
};

const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  event.dataTransfer.setData('text', event.currentTarget.id);
};
