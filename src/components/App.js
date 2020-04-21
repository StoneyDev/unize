import React from 'react';
import Card from './Card';
import ScanButton from "./ScanButton";

const App = () => {

  const clear = () => {
    localStorage.clear();
  }
  return (
    <div className="px-4 h-100">
      <Card />
      <ScanButton />
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default App;