import { BulkInsertView } from './views/BulkInsertView';
import { IssuesView } from './views/IssuesView';
import { NewIssueView } from './views/NewIssueView';
import { ActivitiesView } from './views/ActivitiesView';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ActivitiesView></ActivitiesView>
      </header>
    </div>
  );
}

export default App;
