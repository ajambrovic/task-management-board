import {Tasks} from 'components/Tasks/Tasks';
import {TaskStatus} from 'domain/tasks/tasksModel';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';

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

function AddNewTask() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Row className="p-3 text-center">
      <Col>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

export default App;
