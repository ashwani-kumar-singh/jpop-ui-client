import { Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import NavBar from '../../../components/nav';

export default function AddEditUsers() {
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [first_name, setFname] = useState('');
  const [last_name, setLastName] = useState('');

  return (
    <>
      <NavBar />
      <Container style={{ display: 'flex', flexDirection: 'column' }} fluid>
        <h1>Add/Edit user</h1>
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

        <Button>Submit</Button>
      </Container>
    </>
  );
}
