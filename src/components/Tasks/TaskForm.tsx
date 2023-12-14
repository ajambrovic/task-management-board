import { type ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FormSelectField } from 'components/Tasks/components/FormSelectField';
import { FormTextAreaField } from 'components/Tasks/components/FormTextAreaField';
import { FormTextField } from 'components/Tasks/components/FormTextField';
import { TaskPriority, TaskStatus, type TaskModel } from 'domain/tasks/tasksModel';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useAppDispatch } from 'redux/hooks';
import { convertTimestampToDate } from 'util/timeFormat';

export const TaskForm = ({ task, action, id, handleClose }: TaskFormProps) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={task}
      validate={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(action(values));
        setSubmitting(false);
        handleClose();
      }}>
      {({ handleSubmit }) => (
        <Form noValidate id={id} onSubmit={handleSubmit}>
          <FormTextField controlId="taskName" label="Task name" placeholder="Enter task name" name={'name'} />
          <FormSelectField controlId="taskStatus" label="Task status" name={'status'} placeholder="Select task status">
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
  id: string;
  handleClose: () => void;
};
