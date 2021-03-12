import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const main = {
  margin: '20px',
};

export default function LandingPage() {
  return (
    <MainWrapper>
      <Link to='/library' style={main}>
        <Button variant='primary'>Library</Button>
      </Link>
      <Link to='/user' style={main}>
        <Button variant='warning'>User</Button>
      </Link>
      <Link to='/book' style={main}>
        <Button variant='info'>Book</Button>
      </Link>
    </MainWrapper>
  );
}
