import {Tasks} from 'components/Tasks/Tasks';
import {TaskStatus} from 'domain/tasks/tasksModel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App(): JSX.Element {
  return (
    <Container fluid>
      <Row>
        <Tasks taskStatus={TaskStatus.ToDo}></Tasks>
        <Tasks taskStatus={TaskStatus.InProgress}></Tasks>
        <Tasks taskStatus={TaskStatus.Completed}></Tasks>
      </Row>
    </Container>
  );
}

export default App;
