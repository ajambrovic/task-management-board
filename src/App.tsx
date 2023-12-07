import { AddNewTask } from 'components/Tasks/AddNewTask';
import { Tasks } from 'components/Tasks/Tasks';
import { TaskStatus } from 'domain/tasks/tasksModel';
import { selectTasksIds } from 'domain/tasks/tasksSelector';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const taskIds = useAppSelector(selectTasksIds);

  useEffect(() => {
    if (taskIds.length === 0) {
      dispatch(tasksActions.loadTasks());
    }
  }, []);
  return (
    <Container fluid>
      <Row className="p-3">
        <Tasks taskStatus={TaskStatus.ToDo}></Tasks>
        <Tasks taskStatus={TaskStatus.InProgress}></Tasks>
        <Tasks taskStatus={TaskStatus.Completed}></Tasks>
      </Row>
      <AddNewTask />
    </Container>
  );
}

export default App;
