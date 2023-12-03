import './App.css';
import {Tasks} from 'components/Tasks/Tasks';
import {TaskStatus} from 'domain/tasks/tasksModel';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <Tasks taskStatus={TaskStatus.ToDo}></Tasks>
          <Tasks taskStatus={TaskStatus.InProgress}></Tasks>
          <Tasks taskStatus={TaskStatus.Completed}></Tasks>
        </div>
      </header>
    </div>
  );
}

export default App;
