import {TaskPriority, TaskStatus, type TaskModel} from 'domain/tasks/tasksModel';
import {selectTaskById} from 'domain/tasks/tasksSelector';
import {tasksActions} from 'domain/tasks/tasksSlice';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {convertTimestampToDate} from 'util/timeFormat';

export const EditTask = ({taskId}: {taskId: TaskModel['id']}) => {
  const task = useAppSelector(state => selectTaskById(state, taskId));
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
      dispatch(tasksActions.editTask(generateTask(form as HTMLFormElement, taskId)));
      handleClose();
    }
  };

  const handleDelete = () => {
    dispatch(tasksActions.deleteTask(taskId));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="ms-auto">
        Edit task
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} id={'newTaskFrom'}>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task name</Form.Label>
              <Form.Control type="text" placeholder="Enter task name" required defaultValue={task.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskStatus">
              <Form.Label>Task status</Form.Label>
              <Form.Select aria-label="Select task status" className="mb-3" defaultValue={task.status}>
                <option value={TaskStatus.ToDo}>To do</option>
                <option value={TaskStatus.InProgress}>In progress</option>
                <option value={TaskStatus.Completed}>Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} required defaultValue={task.description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskPriority">
              <Form.Label>Task priority</Form.Label>
              <Form.Select aria-label="Select task priority" defaultValue={task.priority}>
                <option value={TaskPriority.Medium}>Medium</option>
                <option value={TaskPriority.High}>High</option>
                <option value={TaskPriority.Low}>Low</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="teamMember">
              <Form.Label>Assigned team member name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter assigned team member name"
                required
                defaultValue={task.assignedTeamMember}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due date</Form.Label>
              <Form.Control type="date" required defaultValue={convertTimestampToDate(task.dueByTimestamp)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete Task
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-auto">
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function generateTask(form: HTMLFormElement, id: TaskModel['id']): TaskModel {
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
    id,
  };
}
