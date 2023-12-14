import { fireEvent, render, screen } from '@testing-library/react';
import { convertTasksServerDataToLocalData } from 'domain/tasks/tasksSaga';
import { tasksActions } from 'domain/tasks/tasksSlice';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { store } from 'redux/store';
import { renderWithProviders } from 'util/test-util';
import { Task } from './Task';

export const handlers = [
  http.get('/tasks', async () => {
    return HttpResponse.json(httpResponse);
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable API mocking after the tests are done.
afterAll(() => {
  server.close();
});

jest.mock('redux-saga', () => () => ({ run: jest.fn() }));

describe('Task', () => {
  it('renders task data', () => {
    renderWithProviders(<Task taskId={httpResponse[0].id} />);

    expect(screen.getByText(httpResponse[0].name)).toBeInTheDocument();
    expect(screen.getByText(`Assigned to: ${httpResponse[0].assignedTeamMember}`)).toBeInTheDocument();
    expect(screen.getByText(`Task Due By: ${new Date(httpResponse[0].dueByTimestamp).toString()}`)).toBeInTheDocument();
    expect(screen.getByText(`Task Priority: ${httpResponse[0].priority}`)).toBeInTheDocument();
  });

  it('handles drag start', () => {
    const handleDragStart = jest.fn();
    render(<Task taskId={httpResponse[0].id} />);

    fireEvent.dragStart(screen.getByText(httpResponse[0].name));

    expect(handleDragStart).toHaveBeenCalledWith(expect.any(Object));
    expect(handleDragStart).toHaveBeenCalledTimes(1);
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
  {
    id: '5d3d1538-b727-4f2c-890d-7112b9fd59cb',
    name: 'Versus Tonsor Vae3',
    status: 1,
    description: 'Vulgus',
    dueByTimestamp: 1702459242861,
    priority: 0,
    assignedTeamMember: 'Ivo Ivić',
  },
  {
    id: '1c173178-761b-47d8-92a8-eba5af959a3a',
    name: 'Crur Decerno Sulum',
    status: 1,
    description: 'Accendo',
    dueByTimestamp: 1702459242861,
    priority: 1,
    assignedTeamMember: 'Pero Perić',
  },
  {
    id: '8e09c142-fb77-4640-a701-11fafefa9318',
    name: '2Admoneo Conforto Dens Volo2',
    status: 0,
    description: 'Sum',
    dueByTimestamp: 1702459242862,
    priority: 0,
    assignedTeamMember: 'Ivo Ivić',
  },
  {
    id: '49e356b6-c4ba-4448-8dcb-9ca3a5ea73a1',
    name: 'Vorax Crastinus Uxor',
    status: 1,
    description: 'Quod',
    dueByTimestamp: 1702459242862,
    priority: 1,
    assignedTeamMember: 'Ivan Horvat',
  },
  {
    id: 'ba44ba96-d38a-4907-b8b8-372e564dd897',
    name: 'Usus Admoveo Vigilo Aeneus',
    status: 1,
    description: 'Cura',
    dueByTimestamp: 1702459242862,
    priority: 2,
    assignedTeamMember: 'Ivo Ivić',
  },
  {
    id: '93d4c8c2-7f9b-4d47-9ac9-b5083a3c671a',
    name: 'Artificiose Modi',
    status: 1,
    description: 'Bardus Voro',
    dueByTimestamp: 1702459242862,
    priority: 0,
    assignedTeamMember: 'Ivo Ivić',
  },
  {
    id: '2b25bde7-0094-46c2-bc8e-1823902a0d50',
    name: 'Stella Caput Non Adflicto',
    status: 1,
    description: 'Iure',
    dueByTimestamp: 1702459242862,
    priority: 0,
    assignedTeamMember: 'Pero Perić',
  },
  {
    id: '1933ace1-494c-4103-a8d3-f660ea0e164a',
    name: 'Stipes Cubo Theologus',
    status: 1,
    description: 'Synagoga Tredecim',
    dueByTimestamp: 1702459242862,
    priority: 2,
    assignedTeamMember: 'Pero Perić',
  },
  {
    id: 'caa9e198-6c03-400f-8721-0398f70c509d',
    name: 'Audeo Color2',
    status: 2,
    description: 'Animadverto',
    dueByTimestamp: 1702459242862,
    priority: 0,
    assignedTeamMember: 'Pero Perić',
  },
];
