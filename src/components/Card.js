import React from 'react';
import Barcode from 'react-barcode';

const Card = () => {
  function GenerateCard() {
    const obj = JSON.parse(localStorage.getItem('list'));
      // let barCodeOptions = {
      //   width: 3,
      //   height: 100,
      //   displayValue: true,
      //   fontOptions: "",
      //   font: "monospace",
      //   textAlign: "center",
      //   textPosition: "bottom",
      //   textMargin: 2,
      //   fontSize: 20,
      //   margin: 10
      // };

    return obj && Object.keys(obj).map((value,index) => (
      <Barcode
        key={index}
        value={obj[value].id}
        format={obj[value].format}
        height={80}
        // displayValue={false}
      />
    ));
  }

  return (
    <div>
      <GenerateCard />
    </div>
  )
}

export default Card;
