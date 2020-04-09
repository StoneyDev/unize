import React from 'react';
import { Link } from "react-router-dom";
import { Plus } from 'react-feather';

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