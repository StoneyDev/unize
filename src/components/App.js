import React, { useState } from 'react';
import Card from './Card';
import Scanner from './Scanner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ScanButton from "./ScanButton";

const App = () => {
  // const [scanning, setScanning] = useState(false);

  return (
    <div >
      {/*<button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>*/}
      <Card />
      <ScanButton />
    </div>
  );
};

export default App;