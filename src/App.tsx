import {Tasks} from 'components/Tasks/Tasks';
import {TaskStatus} from 'domain/tasks/tasksModel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {AddNewTask} from 'components/Tasks/AddNewTask';

function App(): JSX.Element {
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
