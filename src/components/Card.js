import React from 'react';
import Barcode from 'react-barcode';

const Card = () => {
  const obj = JSON.parse(localStorage.getItem('list'));

  function GenerateCard(props) {

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

     const listShops = props.barCode.map((value,index) =>
      <div key={index}>
        <Barcode
          value={value.id}
          format={value.format}
          height={80}
          background="transparent"
          // displayValue={false}
        />
        <h2>{value.shop}</h2>
      </div>
     );
     return (
       <div>
         {listShops}
       </div>
     );
  }

  return (
    <div>
      {obj && <GenerateCard barCode={obj} />}
    </div>
  )
}

export default Card;
