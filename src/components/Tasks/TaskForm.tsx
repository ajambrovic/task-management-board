import { type ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FormTextField } from 'components/Tasks/components/FormTextField';
import { TaskPriority, TaskStatus, type TaskModel } from 'domain/tasks/tasksModel';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from 'redux/hooks';
import { convertTimestampToDate } from 'util/timeFormat';

export const TaskForm = ({
  task,
  action,
  shouldShowDelete = false,
  buttonTitle,
}: {
  task: TaskModel;
  action: ActionCreatorWithPayload<TaskModel>;
  buttonTitle: string;
  shouldShowDelete?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(tasksActions.deleteTask(task.id));
  }, []);

  const defaultDate = task.dueByTimestamp !== 0 ? convertTimestampToDate(task.dueByTimestamp) : undefined;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonTitle}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{buttonTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={task}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(action(values));
              handleClose();
            }}>
            {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting }) => (
              <Form noValidate id="my-form" onSubmit={handleSubmit}>
                <FormTextField controlId="taskName" label="Task name" placeholder="Enter task name" name={'name'} />
                <Form.Group className="mb-3" controlId="taskStatus" as={Row}>
                  <Form.Label column sm={4}>
                    Task status
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select aria-label="Select task status" className="mb-3" defaultValue={task.status}>
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
                    <Form.Control as="textarea" rows={3} required defaultValue={task.description} />
                    <Form.Control.Feedback type="invalid">Please enter a task description</Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskPriority" as={Row}>
                  <Form.Label column sm={4}>
                    Task priority
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select aria-label="Select task priority" defaultValue={task.priority}>
                      <option value={TaskPriority.Medium}>Medium</option>
                      <option value={TaskPriority.High}>High</option>
                      <option value={TaskPriority.Low}>Low</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <FormTextField
                  controlId="teamMember"
                  label="Assigned team member"
                  placeholder="Enter assigned team member name"
                  name={'assignedTeamMember'}
                />
                <Form.Group className="mb-3" controlId="dueDate" as={Row}>
                  <Form.Label column sm={4}>
                    Due date
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="date" required defaultValue={defaultDate} />
                    <Form.Control.Feedback type="invalid">Please select a valid due date</Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          {shouldShowDelete && (
            <Button variant="danger" onClick={handleDelete}>
              Delete Task
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose} className="ms-auto">
            Close
          </Button>
          <Button variant="primary" type="submit" form="my-form">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
