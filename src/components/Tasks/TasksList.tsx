import {type TaskStatus} from 'domain/tasks/tasksModel';
import {selectTasksByTaskStatus} from 'domain/tasks/tasksSelector';
import {useAppSelector} from 'redux/hooks';

export const Tasks = ({taskStatus}: {taskStatus: TaskStatus}) => {
  const tasks = useAppSelector(state => selectTasksByTaskStatus(state, taskStatus));
  return (
    <div>
      <h2>{taskStatus}</h2>
      <ol>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ol>
    </div>
  );
};
