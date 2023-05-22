import './assets/css/App.css';
import { IssuesView } from './views/IssuesView';
import { NewIssueView } from './views/NewIssueView';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NewIssueView></NewIssueView>
      </header>
    </div>
  );
}

export default App;