import React from 'react';
import Card from './Card';
import ScanButton from "./ScanButton";

const App = () => {

  const clear = () => {
    localStorage.clear();
  }
  return (
    <div >
      <Card />
      <ScanButton />
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default App;