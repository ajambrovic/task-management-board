import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter/Counter';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {counterActions} from './redux/counter/slice';
import {Tasks} from 'components/Tasks/Tasks';
import {TaskStatus} from 'domain/tasks/tasksModel';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const {value} = useAppSelector(state => state.counter);

  const increment = (): void => {
    dispatch(counterActions.increment());
  };

  const decrement = (): void => {
    dispatch(counterActions.decrement());
  };

  const incrementAsync = (): void => {
    dispatch(counterActions.incrementAsync());
  };

  const decrementAsync = (): void => {
    dispatch(counterActions.decrementAsync());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter
          onIncrement={increment}
          onDecrement={decrement}
          onIncrementAsync={incrementAsync}
          onDecrementAsync={decrementAsync}
          value={value}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <div>
        <Tasks taskStatus={TaskStatus.ToDo}></Tasks>
        <Tasks taskStatus={TaskStatus.InProgress}></Tasks>
        <Tasks taskStatus={TaskStatus.Completed}></Tasks>
      </div>
    </div>
  );
}

export default App;
