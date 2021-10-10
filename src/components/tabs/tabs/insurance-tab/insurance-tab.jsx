import React from 'react';

function InsuranceTab() {
  return (
    <section className="tabs__tab tab tab--insurance">
      <h3 className="tab__header tab__header--insurance">Лига Страхование — застрахуем все что захотите</h3>

      <ul className="tab__list list">
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Автомобильное страхование</p>
        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Страхование жизни и здоровья</p>
        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Страхование недвижимости</p>
        </li>
      </ul>

      <button className="tab__button button">Узнать подробнее</button>
    </section>
  );
}

export default InsuranceTab;
