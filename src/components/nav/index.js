import React from 'react';
import { Navbar } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark' style={{marginBottom: '20px'}}>
      <Navbar.Brand href='/'>
        <img
          alt=''
          src='/logo.svg'
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        Jpop Learning
      </Navbar.Brand>
    </Navbar>
  );
}
