import {TaskPriority, TaskStatus, type TaskModel} from 'domain/tasks/tasksModel';
import {tasksActions} from 'domain/tasks/tasksSlice';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import {useAppDispatch} from 'redux/hooks';

export const AddNewTask = () => {
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
              <Form.Group className="mb-3" controlId="taskName" as={Row}>
                <Form.Label column sm={4}>
                  Task name
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="Enter task name" required />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskStatus" as={Row}>
                <Form.Label column sm={4}>
                  Task status
                </Form.Label>
                <Col sm={8}>
                  <Form.Select aria-label="Select task status" className="mb-3">
                    <option value={TaskStatus.ToDo}>To do</option>
                    <option value={TaskStatus.InProgress}>In progress</option>
                    <option value={TaskStatus.Completed}>Completed</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskDescription" as={Row}>
                <Form.Label column sm={4}>
                  Description
                </Form.Label>
                <Col sm={8}>
                  <Form.Control as="textarea" rows={3} required />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="taskPriority" as={Row}>
                <Form.Label column sm={4}>
                  Task priority
                </Form.Label>
                <Col sm={8}>
                  <Form.Select aria-label="Select task priority">
                    <option value={TaskPriority.Medium}>Medium</option>
                    <option value={TaskPriority.High}>High</option>
                    <option value={TaskPriority.Low}>Low</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="teamMember" as={Row}>
                <Form.Label column sm={4}>
                  Assigned team member
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" placeholder="Enter assigned team member name" required />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" controlId="dueDate" as={Row}>
                <Form.Label column sm={4}>
                  Due date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="date" required />
                </Col>
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
};

function generateTask(form: HTMLFormElement): TaskModel {
  const name = (form.elements[0] as HTMLInputElement).value;
  const statusString = (form.elements[1] as HTMLSelectElement).value;
  const description = (form.elements[2] as HTMLTextAreaElement).value;
  const priorityString = (form.elements[3] as HTMLSelectElement).value;
  const assignedTeamMember = (form.elements[4] as HTMLInputElement).value;
  const dueDateString = (form.elements[5] as HTMLInputElement).value;

  const status: TaskStatus = parseInt(statusString, 10) as TaskStatus;
  const priority: TaskPriority = parseInt(priorityString, 10) as TaskPriority;
  const dueByTimestamp = new Date(dueDateString).getTime();

  return {
    name,
    status,
    description,
    priority,
    assignedTeamMember,
    dueByTimestamp,
    id: new Date().getTime().toString(),
  };
}
