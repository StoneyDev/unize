import React from 'react';
import Barcode from 'react-barcode';

const barCodeOptions = {    
  width: 3,
  height: 100,
  format: "EAN13",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  margin: 10     
}

const Card = () => {
  const obj = JSON.parse(localStorage.getItem('list'));

  return (
    <div>
      {obj && Object.keys(obj).map((value,index) => (
        <Barcode key={index} value={obj[value].id} {...barCodeOptions} />
      ))}
    </div>
  )
}

export default Card;
