import { type ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TaskForm } from 'components/Tasks/TaskForm';
import { type TaskModel } from 'domain/tasks/tasksModel';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch } from 'redux/hooks';

export const TaskModal = ({ task, action, shouldShowDelete = false, buttonTitle, id }: TaskModalProps) => {
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
          <TaskForm task={task} action={action} id={id} handleClose={handleClose} />
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

type TaskModalProps = {
  task: TaskModel;
  action: ActionCreatorWithPayload<TaskModel>;
  buttonTitle: string;
  shouldShowDelete?: boolean;
  id: string;
};
