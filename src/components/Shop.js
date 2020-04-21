import React from 'react';
import {Link} from "react-router-dom";

const Shop = () => {

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
      url: 'super_u',
      name: 'Super U'
    },
    {
      url: 'leclerc',
      name: 'Leclerc'
    },
    {
      url: 'monoprix',
      name: 'Monoprix'
    },
    {
      url: 'intersport',
      name: 'Intersport'
    },
    {
      url: 'auchan',
      name: 'Auchan'
    },
    {
      url: 'picard',
      name: 'Picard'
    },
    {
      url: 'geant_casino',
      name: 'Géant Casino'
    },
    {
      url: 'kiabi',
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

export default Shop;