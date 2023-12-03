import {Tasks} from 'components/Tasks/Tasks';
import {type TaskModel, TaskPriority, TaskStatus} from 'domain/tasks/tasksModel';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useAppDispatch} from 'redux/hooks';
import {tasksActions} from 'domain/tasks/tasksSlice';

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
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    const form = document.getElementById('newTaskFrom');
    if (form === null) {
      return;
    }
    setValidated(true);
    if ((form as HTMLFormElement).checkValidity()) {
      dispatch(tasksActions.createTask(generateTask(form as HTMLFormElement)));
      handleClose();
    }
  };

  return (
    <Row className="p-3 text-center">
      <Col>
        <Button variant="primary" onClick={handleShow}>
          Add new task
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit} id={'newTaskFrom'}>
              <Form.Group className="mb-3" controlId="taskName">
                <Form.Label>Task name</Form.Label>
                <Form.Control type="text" placeholder="Enter task name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskStatus">
                <Form.Label>Task status</Form.Label>
                <Form.Select aria-label="Select task status" className="mb-3">
                  <option value={TaskStatus.ToDo}>To do</option>
                  <option value={TaskStatus.InProgress}>In progress</option>
                  <option value={TaskStatus.Completed}>Completed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskPriority">
                <Form.Label>Task priority</Form.Label>
                <Form.Select aria-label="Select task priority">
                  <option value={TaskPriority.Medium}>Medium</option>
                  <option value={TaskPriority.High}>High</option>
                  <option value={TaskPriority.Low}>Low</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMember">
                <Form.Label>Assigned team member name</Form.Label>
                <Form.Control type="text" placeholder="Enter assigned team member name" required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

function generateTask(form: HTMLFormElement): TaskModel {
  const name = (form.elements[0] as HTMLInputElement).value;
  const statusString = (form.elements[1] as HTMLSelectElement).value;
  const description = (form.elements[2] as HTMLTextAreaElement).value;
  const priorityString = (form.elements[3] as HTMLSelectElement).value;
  const assignedTeamMember = (form.elements[4] as HTMLInputElement).value;

  const status: TaskStatus = TaskStatus[statusString as keyof typeof TaskStatus];
  const priority: TaskPriority = TaskPriority[priorityString as keyof typeof TaskPriority];

  return {
    name,
    status,
    description,
    priority,
    assignedTeamMember,
    dueByTimestamp: new Date().getTime(),
    id: new Date().getTime().toString(),
  };
}

export default App;
