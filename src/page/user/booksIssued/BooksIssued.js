import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/nav';
import { LIBRARY_ACTION_BASE_URL } from '../../../constants/apiConstants';

export default function BooksIssued(props) {
    const [issued, setIssued] = useState([]);
    const [id, setId] = useState(props.match.params.id)
    useEffect(() => {
        getAllBooksIssued()
    }, [])
  
    const getAllBooksIssued = () => {
      axios.get(LIBRARY_ACTION_BASE_URL + `/${id}`).then(res => {
        if (res.status === 200) {
            setIssued([...res.data.responseObject.issued_books])
        }
      }).catch(err => {
        console.log(err, 'error')
      })
    }

    return (
      <>
        <NavBar />
        <Container fluid>
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
                </tr>
              </thead>
              <tbody>
                {issued &&
                  issued.map((book, id) => (
                    <tr>
                      <td>{id + 1}</td>
                      <td>{book.author}</td>
                      <td>{book.title}</td>
                      <td>{book.category}</td>
                      <td>{book.cost}</td>
                      <td>{book.total_pages}</td>
                      <td>{book.published_date}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </>
    );
  }
  