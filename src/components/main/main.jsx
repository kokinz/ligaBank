import React from 'react';
import Promo from '../promo/promo';
import Tabs from '../tabs/tabs';
import Calculator from '../calculator/calculator';

function Main() {
  return(
    <main className="page-main">
      <h1 className="visually-hidden">Лига Банк</h1>

      <Promo />

      <Tabs />

      <Calculator />
    </main>
  );
}

export default Main;
