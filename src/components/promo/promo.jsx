import React from 'react';

function Promo() {
  return(
    <section className="promo">
      <ul className="promo__slider slider list">
        <li className="slider__item slider__item--credit container">
          <h2 className="promo__header">Лига Банк</h2>

          <p className="promo__description">Кредиты на любой случай</p>

          <a href="/" className="promo__link link button">Рассчитать кредит</a>
        </li>
        <li className="slider__item slider__item--confidence container visually-hidden">
          <h2 className="promo__header promo__header--confidence">Лига Банк</h2>

          <p className="promo__description promo__description--confidence">Ваша уверенность в завтрашнем дне</p>
        </li>
        <li className="slider__item slider__item--branch container visually-hidden">
          <h2 className="promo__header promo__header--branch">Лига Банк</h2>

          <p className="promo__description promo__description--branch">Всегда рядом</p>

          <a href="/" className="promo__link promo__link--branch link button">Найти отделение</a>
        </li>
      </ul>
      <ul className="promo__slider-controls list">
        <li className="promo__slider-control promo__slider-control--active"></li>
        <li className="promo__slider-control"></li>
        <li className="promo__slider-control"></li>
      </ul>
    </section>
  );
}

export default Promo;
