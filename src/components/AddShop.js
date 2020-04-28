import React from 'react';
import {Link} from "react-router-dom";

const AddShop = () => {

  const listShop = [
    {
      url: 'carrefour.svg',
      name: 'Carrefour'
    },
    {
      url: 'intermarche.svg',
      name: 'Intermarché'
    },
    {
      url: 'super_u.png',
      name: 'Super U'
    },
    {
      url: 'e-leclerc.svg',
      name: 'E Leclerc'
    },
    {
      url: 'monoprix.svg',
      name: 'Monoprix'
    },
    {
      url: 'intersport.svg',
      name: 'Intersport'
    },
    {
      url: 'auchan.svg',
      name: 'Auchan'
    },
    {
      url: 'picard.png',
      name: 'Picard'
    },
    {
      url: 'geant_casino.svg',
      name: 'Géant Casino'
    },
    {
      url: 'kiabi.png',
      name: 'Kiabi'
    },
    {
      url: 'yves_rocher',
      name: 'Yves Rocher'
    },
    {
      url: 'go_sport',
      name: 'GO Sport'
    },
  ];

  const GenerateShop = (props) => {
    const sortACS = props.shops.sort((a, b) => a.name.localeCompare(b.name));
    const listShop = sortACS.map((value) =>
      <Link key={value.name} to={`scanner/${value.name}/${value.url}`} className='Shop--container'>
        <img src={`img/logo/${value.url}`} alt={`${value.name}`} className='Shop--logo' />
        <h2>{value.name}</h2>
      </Link>
    );
    return (
      <div>
        {listShop}
      </div>
    )
  }

  return (
    <div>
      <GenerateShop shops={listShop} />
      <p>Un magasin est manquant ? Envoyer un email à yann.deroues@gmail.com</p>
    </div>
  )
}

export default AddShop;