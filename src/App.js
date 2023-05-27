import { IssuesView } from './views/IssuesView';
import { Register } from  './views/RegisterView';
import { NewIssueView } from './views/NewIssueView';
import { Login } from  './views/LoginView';
import { ActivitiesView} from './views/ActivitiesView';
import { Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { UsersView } from './views/UsersView';
import { BulkInsertView } from './views/BulkInsertView';
import { Error404View } from './views/Error404View';
import { EditProfileView } from './views/EditProfileView';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<NavigationBar/>}>
            <Route path="/" element={<IssuesView/>}></Route>
            <Route path="/activities" element={<ActivitiesView/>}></Route>
            <Route path="/users" element={<UsersView/>}></Route>
            <Route path="/new_issue" element={<NewIssueView/>}></Route>
            <Route path="/bulk_insert" element={<BulkInsertView/>}></Route>
            <Route path="/edit_profile" element={<EditProfileView/>}></Route>
            <Route path="*" element={<Error404View/>}></Route>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
