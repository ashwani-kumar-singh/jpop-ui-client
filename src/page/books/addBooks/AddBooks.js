import { Button, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/nav'
import axios from 'axios';
import { POST_NEW_BOOK, GET_BOOK_BY_ID } from '../../../constants/apiConstants';

export default function AddBooks(props) {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescripton] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [publisher_id, setPubliserId] = useState('');
  const [total_pages, setTotalPage] = useState('');
  const [published_date, setPublisherDate] = useState('');
  const [id, setId] = useState(props.match.params.id)

  useEffect(() => {
    if (id !== undefined) {
      getBookById();
    }
  }, [])

  const getBookById=()=>{
    axios.get(GET_BOOK_BY_ID + `${id}`).then(res => {
      console.log(res, 'GETYiD');
      if (res.status === 200) {
        const { responseObject } = res.data;
        setIsbn(responseObject.isbn);
        setTitle(responseObject.title);
        setDescripton(responseObject.description);
        setAuthor(responseObject.author);
        setCategory(responseObject.category);
        setPubliserId(responseObject.publisher_id);
        setTotalPage(responseObject.total_pages);
        setPublisherDate(responseObject.published_date);
        setCost(responseObject.cost)

      }
    })
  }

  const postNewBook = () => {
    let data = {
      isbn, title, description, author, category, cost, publisher_id, total_pages, published_date
    }
    axios.post(POST_NEW_BOOK + `?logged_in=${1}`, { ...data }, { headers: { "Content-Type": "application/json" } }).then(res => {
      console.log(res, 'postNewBook')
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  const updateBook = () => {
    let data = {
      isbn, title, description, author, category, cost, publisher_id, total_pages, published_date
    }
    axios.put(POST_NEW_BOOK + `/${id}?logged_in=${1}`, { ...data }, { headers: { "Content-Type": "application/json" } }).then(res => {
    }).catch(err => {
      console.log(err.response, 'error')
    })  }

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
          onChange={(e) => setPublisherDate(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <Button onClick={id === undefined ?() => postNewBook() : ()=> updateBook()}>Submit</Button>
      </Container>
    </>
  );
}
