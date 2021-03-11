import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/nav';
import { GET_ALL_USER, DELETE_USER } from '../../constants/apiConstants';

const allUsers = [
  {
    id: 1,
    contact: 'contact1',
    email: 'dummy@gmail.com',
    address: 'address 1 lane 1, UK',
    first_name: 'updated fname1',
    last_name: 'lname1',
  },
];

export default function User() {
  const [user, setUser] = useState([...allUsers]);
  useEffect(() => {
    fetchAllUser()
  }, [])

  const fetchAllUser = () => {
    axios.get(GET_ALL_USER).then(res => {
      if (res.status === 200) {
        setUser([...res.data.responseObject]);
      }
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  const deleteUser = (id) => {
    axios.delete(DELETE_USER + `${id}`).then(res => {
      if (res.status === 200) {
        let newUsers = user.filter(user => user.id !== id);
        setUser([...newUsers])
      }
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }
  return (
    <>
      <NavBar />
      <Container fluid>
        <Link to='/user/add'>
          <Button>Add User</Button>
        </Link>
        <div style={{ margin: '40px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>contact</th>
                <th>email</th>
                <th>address</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.map((user, id) => (
                  <tr>
                    <td>{id + 1}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <Link to={`/user/${user.id}`}>
                        <Button variant='info'>Edit</Button>
                      </Link>
                    </td>
                    <td>
                      <Button variant='danger' onClick={() => deleteUser(user.id)}>Delete</Button>
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
