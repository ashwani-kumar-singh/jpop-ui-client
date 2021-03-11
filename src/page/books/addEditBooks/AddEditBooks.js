import { Button, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/nav'
import axios from 'axios';
import { POST_NEW_BOOK } from '../../../constants/apiConstants';

export default function AddEditBooks() {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescripton] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [publisher_id, setPubliserId] = useState('');
  const [total_pages, setTotalPage] = useState('');
  const [published_date, setPublicerDate] = useState('');

  const postNewBook = () => {
    let data = {
      isbn, title, description, author, category, cost, publisher_id, total_pages, published_date
    }
    axios.post(POST_NEW_BOOK + `?logged_in=${1}`, { data }).then(res => {
      console.log(res, 'postNewBook')
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  return (
    <>
      <NavBar />
      <Container style={{ display: 'flex', flexDirection: 'column' }} fluid>
        <h1>Add/Edit book</h1>

        <input
          placeholder='isbn'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='description'
          value={description}
          onChange={(e) => setDescripton(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <input
          placeholder='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <input
          placeholder='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <input
          placeholder='cost'
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        
        <input
          placeholder='publisher_id'
          value={publisher_id}
          onChange={(e) => setPubliserId(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='total_pages'
          value={total_pages}
          onChange={(e) => setTotalPage(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='published_date'
          value={published_date}
          onChange={(e) => setPublicerDate(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <Button onClick={() => postNewBook()}>Submit</Button>
      </Container>
    </>
  );
}
