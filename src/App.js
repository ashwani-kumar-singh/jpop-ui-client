import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './page/landing';
import Books from './page/books';
import LibraryPage from './page/library';
import AddBooks from './page/books/addBooks/AddBooks';
import User from './page/user';
import AddEditUsers from './page/user/addEditUser/AddEditUser';
import BooksIssued from './page/user/booksIssued/BooksIssued';
import ReturnBook from './page/library/libraryAction/ReturnBook';

function App() {
  return (
    <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/book' exact component={Books} />
        <Route path='/book/add' exact component={AddBooks} />
        <Route path='/book/:id' exact component={AddBooks} />
        <Route path='/library' exact component={LibraryPage} />
        <Route path='/user' exact component={User} />
        <Route path='/user/add' exact component={AddEditUsers} />
        <Route path='/user/:id' exact component={AddEditUsers} />
        <Route path='/issued/:id' exact component={BooksIssued} />
        <Route path='/library/return' exact component={ReturnBook} />
    </Switch>
  );
}

export default App;
