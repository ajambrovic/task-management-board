import {type TaskStatus} from 'domain/tasks/tasksModel';
import {selectTasksByTaskStatus} from 'domain/tasks/tasksSelector';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {Task} from './Task';
import {tasksActions} from 'domain/tasks/tasksSlice';

export const Tasks = ({taskStatus}: {taskStatus: TaskStatus}) => {
  const tasks = useAppSelector(state => selectTasksByTaskStatus(state, taskStatus));
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, taskStatus: TaskStatus) => {
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
    <div
      className={'drag-drop-zone'}
      onDrop={e => {
        handleDrop(e, taskStatus);
      }}
      onDragOver={handleDragOver}>
      <h2>{taskStatus}</h2>
      <ol>
        {tasks.map(task => (
          <Task taskId={task.id} key={task.id} />
        ))}
      </ol>
    </div>
  );
};
