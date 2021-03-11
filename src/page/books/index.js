import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/nav';
import { GET_ALL_BOOKS, DELETE_BOOK } from '../../constants/apiConstants';

const allBooks = [
  {
    id: 2,
    title: 'book2',
    description: 'book2 description',
    author: 'author2',
    category: 'category 2',
    cost: 1110,
    isbn: 'AS12344543',
    total_pages: 10000,
    publisher_id: 23,
    published_date: '2019-12-04',
  },
];

export default function Books() {
  const [books, setBooks] = useState([...allBooks]);
  useEffect(() => {
    fetchAllBooks()
  }, [])

  const fetchAllBooks = () => {
    axios.get(GET_ALL_BOOKS).then(res => {
      if (res.status === 200) {
        setBooks([...res.data.responseObject])
      }
      console.log(res)
    }).catch(err => {
      console.log(err, 'error')
    })
  }

  const deleteBook = (id) => {
    axios.delete(DELETE_BOOK + `${id}`).then(res => {
      if (res.status === 200) {
        let newBook = books.filter(book => book.id !== id);
        setBooks([...newBook])
      }
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  return (
    <>
      <NavBar />
      <Container fluid>
        <Link to='/book/add'>
          <Button>Add Book</Button>
        </Link>
        <div style={{ margin: '40px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>title</th>
                <th>category</th>
                <th>cost</th>
                <th>total_pages</th>
                <th>published_date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book, id) => (
                  <tr>
                    <td>{id + 1}</td>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{book.category}</td>
                    <td>{book.cost}</td>
                    <td>{book.total_pages}</td>
                    <td>{book.published_date}</td>
                    <td>
                      <Link to={`/book/${book.id}`}>
                        <Button variant='info'>Edit</Button>
                      </Link>
                    </td>
                    <td>
                      <Button variant='danger' onClick={() => deleteBook(book.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
