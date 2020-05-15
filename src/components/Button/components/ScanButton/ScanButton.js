import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';

const ScanButton = () => (
  <Link to="/shop" className="button__action home">
    <div className="button__icon">
      <Plus size="28" />
    </div>
  </Link>
);

export default ScanButton;
