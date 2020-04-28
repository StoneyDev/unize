import React from 'react';
import Barcode from 'react-barcode';
import { Link, useHistory } from "react-router-dom";

const CardDetail = (props) => {
  let history = useHistory();
  const obj = JSON.parse(localStorage.getItem('list'));
  const result = obj.find(val => val.id === props.match.params.id);

  const deleteData = () => {
    const newArrayData = obj.filter(val => val.id !== result.id);
    localStorage.setItem('list', JSON.stringify(newArrayData));
    history.push("/");
  }

  return (
    <div>
      <Barcode
        value={result.id}
        format={result.format}
        height={80}
        background="transparent"
      />
      <h2>{result.name}</h2>

      <Link to={`/scanner/edit/${result.id}`}>Update</Link>
      <button onClick={deleteData}>Delete</button>
    </div>
  )
}

export default CardDetail;