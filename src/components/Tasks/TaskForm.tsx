import { type ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FormSelectField } from 'components/Tasks/components/FormSelectField';
import { FormTextAreaField } from 'components/Tasks/components/FormTextAreaField';
import { FormTextField } from 'components/Tasks/components/FormTextField';
import { TaskPriority, TaskStatus, type TaskModel } from 'domain/tasks/tasksModel';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch } from 'redux/hooks';
import { convertTimestampToDate } from 'util/timeFormat';

export const TaskForm = ({ task, action, shouldShowDelete = false, buttonTitle, id }: TaskFormProps) => {
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
            validate={validateForm}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(action(values));
              setSubmitting(false);
              handleClose();
            }}>
            {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting }) => (
              <Form noValidate id={id} onSubmit={handleSubmit}>
                <FormTextField controlId="taskName" label="Task name" placeholder="Enter task name" name={'name'} />
                <FormSelectField
                  controlId="taskStatus"
                  label="Task status"
                  name={'status'}
                  placeholder="Select task status">
                  <option value={TaskStatus.ToDo}>To do</option>
                  <option value={TaskStatus.InProgress}>In progress</option>
                  <option value={TaskStatus.Completed}>Completed</option>
                </FormSelectField>
                <FormTextAreaField
                  controlId="taskDescription"
                  label="Description"
                  placeholder="Enter task description"
                  name={'description'}
                />
                <FormSelectField
                  controlId="taskPriority"
                  label="Select task priority"
                  name={'priority'}
                  placeholder="Select task priority">
                  <option value={TaskPriority.Medium}>Medium</option>
                  <option value={TaskPriority.High}>High</option>
                  <option value={TaskPriority.Low}>Low</option>
                </FormSelectField>
                <FormTextField
                  controlId="teamMember"
                  label="Assigned team member"
                  placeholder="Enter assigned team member name"
                  name={'assignedTeamMember'}
                />
                <FormTextField
                  controlId="dueDate"
                  label="Due date"
                  placeholder="Enter due date"
                  type={'date'}
                  name={'dueByTimestamp'}
                  transform={convertTimestampToDate}
                />
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
          <Button variant="primary" type="submit" form={id}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const validateForm = (values: TaskModel) => {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }
  if (!values.assignedTeamMember.trim()) {
    errors.assignedTeamMember = 'Assigned team member is required';
  }
  if (!values.dueByTimestamp) {
    errors.dueByTimestamp = 'Due date is required';
  }
  return errors;
};

type TaskFormProps = {
  task: TaskModel;
  action: ActionCreatorWithPayload<TaskModel>;
  buttonTitle: string;
  shouldShowDelete?: boolean;
  id: string;
};
