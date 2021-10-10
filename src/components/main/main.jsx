import React from 'react';
import Promo from '../promo/promo';
import Tabs from '../tabs/tabs';

function Main() {
  return(
    <main className="page-main">
      <h1 className="visually-hidden">Лига Банк</h1>

      <Promo />

      <Tabs />
    </main>
  );
}

export default Main;
