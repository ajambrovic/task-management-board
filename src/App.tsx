import { Header } from 'components/Header/Header';
import { AddNewTask } from 'components/Tasks/AddNewTask';
import { Tasks } from 'components/Tasks/Tasks';
import { ToastAlert } from 'components/ToastAlerts/ToastAlert';
import { TaskStatus } from 'domain/tasks/tasksModel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App(): JSX.Element {
  return (
    <>
      <ToastAlert />
      <Container fluid>
        <Header />
        <Row className="p-3">
          <Tasks taskStatus={TaskStatus.ToDo}></Tasks>
          <Tasks taskStatus={TaskStatus.InProgress}></Tasks>
          <Tasks taskStatus={TaskStatus.Completed}></Tasks>
        </Row>
        <AddNewTask />
      </Container>
    </>
  );
}

export default App;
