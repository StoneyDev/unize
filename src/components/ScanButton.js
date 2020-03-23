import React from 'react';
import { Redirect, Link, Router } from "react-router-dom";
import { Plus } from 'react-feather';
import Scanner from "./Scanner";

const ScanButton = () => {
  return (
    <Link to="/scanner" className={'ScanButton--container'}>
      <div className={'ScanButton--icon'}>
        <Plus size='30' />
      </div>
    </Link>
  )
};

export default ScanButton;