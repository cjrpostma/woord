import React from 'react';
import { Link, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../styles';

const Title = styled.h1`
  color: red;
  font-family: 'Roboto', sans-serif;
  font-size: 6rem;
  animation: 1s ${fadeIn} ease-in;
`;

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, min-content);
  height: 100vh;
  justify-items: center;
  width: 100%;
`;

const App = () => (
  <Wrapper>
    <p>Navigation - Top</p>
    <Title>Woord</Title>
    <p>Subheader</p>
    <main>This is the main wrapper.</main>
    <p>Navigation - Bottom</p>
  </Wrapper>
);

export default App;
