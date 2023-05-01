import './App.css';
import { TasksProvider } from './components/containers/tasksContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <TasksProvider></TasksProvider>

      </header>
    </div>
  );
}

export default App;
