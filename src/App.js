import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './page/landing';
import Books from './page/books';
import LibraryPage from './page/library';
import AddEditBooks from './page/books/addEditBooks/AddEditBooks';
import User from './page/user';
import AddEditUsers from './page/user/addEditUser/AddEditUser';

function App() {
  return (
    <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/book' exact component={Books} />
        <Route path='/book/add' exact component={AddEditBooks} />
        <Route path='/book/:id' exact component={AddEditBooks} />
        <Route path='/library' exact component={LibraryPage} />
        <Route path='/user' exact component={User} />
        <Route path='/user/add' exact component={AddEditUsers} />
        <Route path='/user/:id' exact component={AddEditUsers} />
    </Switch>
  );
}

export default App;
