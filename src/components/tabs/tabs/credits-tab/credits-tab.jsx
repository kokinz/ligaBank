import React from 'react';

function CreditsTab() {
  return (
    <section className="tabs__tab tab tab--credits">
      <h3 className="tab__header tab__header--credits">Лига Банк выдает кредиты под любые цели</h3>

      <ul className="tab__list list">
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Ипотечный кредит</p>
        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Автокредит</p>
        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Потребительский кредит</p>
        </li>
      </ul>

      <p className="tab__description">
        Рассчитайте ежемесячный платеж<br /> и ставку по кредиту воспользовавшись нашим <a href="/#" className="tabs__description-link">кредитным калькулятором</a>
      </p>
    </section>
  );
}

export default CreditsTab;
