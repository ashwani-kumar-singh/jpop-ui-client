import { Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/nav';
import axios from 'axios';
import { POST_NEW_USER, GET_USER_INFO_BY_ID } from '../../../constants/apiConstants';

export default function AddUsers(props) {
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [first_name, setFname] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(props.match.params.id)

  useEffect(() => {
    if (id !== undefined) {
      getUserById();
    }
  }, [])

  const getUserById = () => {
    axios.get(GET_USER_INFO_BY_ID + `${id}`).then(res => {
      if (res.status === 200) {
        const { user_details } = res.data.responseObject;
        setAddress(user_details.address);
        setContact(user_details.contact);
        setEmail(user_details.email);
        setLastName(user_details.last_name);
        setFname(user_details.first_name);
      }
    })
  }

  const postNewUser = () => {
    let data = {
      first_name, last_name, address, email, contact, password
    }
    axios.post(POST_NEW_USER + `?logged_in=${1}`, { ...data }, { headers: { "Content-Type": "application/json" } }).then(res => {
      console.log(res, 'postNewUser')
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  const putUpdateUser = () => {
    let data = {
      first_name, last_name, address, email, contact, password
    }
    axios.put(POST_NEW_USER + `/${id}?logged_in=${1}`, { ...data }, { headers: { "Content-Type": "application/json" } }).then(res => {
      console.log(res, 'putUpdateUser')
    }).catch(err => {
      console.log(err.response, 'error')
    })
  }

  return (
    <>
      <NavBar />
      <Container style={{ display: 'flex', flexDirection: 'column' }} fluid>
        <h1>Add User</h1>
        <input
          placeholder='contact'
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <input
          placeholder='first_name'
          value={first_name}
          onChange={(e) => setFname(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <input
          placeholder='last_name'
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />
        <input
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '5px', padding: '8px', border: '1px solid #cccccc' }}
        />

        <Button onClick={!id ? () => postNewUser() : () => putUpdateUser()}>Submit</Button>
      </Container>
    </>
  );
}
