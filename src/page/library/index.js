import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { GET_ALL_USER, GET_ALL_BOOKS, LIBRARY_ACTION_BASE_URL } from '../../constants/apiConstants';

export default function LibraryPage() {
  const [books, setBook] = useState([]);
  const [selectedBook, setSelectedBook] = useState('')
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [users, setUser] = useState([]);
  useEffect(() => {
    fetchAllUser();
    fetchAllBooks()
  }, [])

  const fetchAllUser = () => {
    axios.get(GET_ALL_USER).then(res => {
      if (res.status === 200) {
        console.log(res.data, 'alluser');
        const users = res.data.responseObject;
        const updatedUser = users.map(user => ({
          ...user,
          label: user.email,
          value: user.email
        }))
        setUser([...updatedUser]);
      }
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  const fetchAllBooks = () => {
    axios.get(GET_ALL_BOOKS).then(res => {
      if (res.status === 200) {
        const books = res.data.responseObject;
        const updatedList = books.map(book => ({
          ...book,
          label: book.title,
          value: book.title

        }))
        setBook([...updatedList])
      }
      console.log(res)
    }).catch(err => {
      console.log(err, 'error')
    })
  }

  const handleUserSelection = (e) => {
    console.log(e);
    setSelectedUser(e.label);
    setSelectedUserId(e.id)
  }

  const handleBookSelection = (e) => {
    console.log(e);
    setSelectedBook(e.label);
    setSelectedBookId(e.id)
  }

  const handleSubmitBooks = () => {
    axios.post(LIBRARY_ACTION_BASE_URL + `/${selectedUserId}/books/${selectedBookId}`+ `?logged_in=${1}`,  { headers: { "Content-Type": "application/json" }}).then(res=>{
      console.log(res, 'addingbook');
      if(res.status === 200 ){
        setSelectedBookId(null);
        setSelectedUserId(null);
        setSelectedBook('');
        setSelectedUser('');
      }
    }).catch(error=>{
      console.log(error.response);
    })
  }
  return (
    <div>
      <h1>Issue Book</h1>
      <Link to="/library/return">
        <Button variant='danger'>Return Book</Button>
      </Link>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
        <div style={{ width: '50%' }}>
          <Select
            className="basic-multi-select"
            value={users && users.filter((obj) => obj.value === selectedUser)}
            onChange={(e) => handleUserSelection(e)}
            options={users}
          />
        </div>
        <div style={{ width: '50%' }}>
          <Select
            className="basic-multi-select"
            value={books && books.filter((obj) => obj.value === selectedBook)}
            onChange={(e) => handleBookSelection(e)}
            options={books}
          />
        </div>
      </div>
      <div>
        <Button onClick={()=>handleSubmitBooks()}>ISSUE</Button>
      </div>
    </div>
  );
}

