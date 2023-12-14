import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { TaskPriority } from 'domain/tasks/tasksModel';
import { convertTasksServerDataToLocalData } from 'domain/tasks/tasksSaga';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { configureAppStore } from 'redux/store';
import { renderWithProviders } from 'util/test-util';
import { convertTimestampToDate } from 'util/timeFormat';
import { Task } from './Task';

describe('Task', () => {
  it('renders task data', () => {
    const store = configureAppStore();
    store.dispatch(
      tasksActions.tasksLoadSuccess({ data: convertTasksServerDataToLocalData(httpResponse), searchQuery: '' }),
    );
    renderWithProviders(<Task taskId={httpResponse[0].id} />, { store });

    expect(screen.getByText(httpResponse[0].name)).toBeInTheDocument();
    expect(screen.getByText(`Assigned to: ${httpResponse[0].assignedTeamMember}`)).toBeInTheDocument();

    const expectedText = new RegExp(`Task Due By: ${convertTimestampToDate(httpResponse[0].dueByTimestamp)}`);
    expect(screen.getByText(expectedText)).toBeInTheDocument();

    const expectedPriorityText = new RegExp(`Task Priority: ${TaskPriority[httpResponse[0].priority]}`);
    expect(screen.getByText(expectedPriorityText)).toBeInTheDocument();
  });

  it('handles drag start and drop', async () => {
    const store = configureAppStore();
    store.dispatch(
      tasksActions.tasksLoadSuccess({ data: convertTasksServerDataToLocalData(httpResponse), searchQuery: '' }),
    );

    const { container } = renderWithProviders(<App />, { store });

    const handle = container.querySelector(`#${httpResponse[0].id}`) as HTMLDivElement;

    fireEvent.mouseDown(handle, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(handle, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(handle);

    await waitFor(() => {
      expect(screen.getByTestId(`task-${httpResponse[0].id}`)).toBeInTheDocument();
    });
  });
});

const httpResponse = [
  {
    id: 'ad8fa8d4-0ea2-4718-83f0-b5265befc9f2',
    name: '3Curatio Ducimus Excepturi',
    status: 1,
    description: 'Crinis',
    dueByTimestamp: 1702459242861,
    priority: 1,
    assignedTeamMember: 'Ivan Horvat',
  },
];
