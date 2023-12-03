import {type TaskStatus} from 'domain/tasks/tasksModel';
import {selectTasksByTaskStatus} from 'domain/tasks/tasksSelector';
import {useAppSelector} from 'redux/hooks';
import {Task} from './Task';

export const Tasks = ({taskStatus}: {taskStatus: TaskStatus}) => {
  const tasks = useAppSelector(state => selectTasksByTaskStatus(state, taskStatus));

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };

  return (
    <div
      className={'drag-drop-zone'}
      onDrop={e => {
        handleDrop(e);
      }}
      onDragOver={e => {
        handleDragOver(e);
      }}
      onDragEnter={e => {
        handleDragEnter(e);
      }}
      onDragLeave={e => {
        handleDragLeave(e);
      }}>
      <h2>{taskStatus}</h2>
      <ol>
        {tasks.map(task => (
          <Task taskId={task.id} key={task.id} />
        ))}
      </ol>
    </div>
  );
};
