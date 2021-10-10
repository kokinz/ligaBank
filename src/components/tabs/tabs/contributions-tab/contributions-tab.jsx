import React from 'react';

function ContributionsTab() {
  return (
    <section className="tabs__tab tab tab--contributions">
      <h3 className="tab__header">Вклады Лига Банка – это выгодная инвестиция в свое будущее</h3>

      <ul className="tab__list list">
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Проценты по вкладам до 7%</p>


        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Разнообразные условия</p>


        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text">Возможность ежемесячной капитализации или вывод процентов на банковскую карту</p>

        </li>
      </ul>

      <button className="tab__button button">Узнать подробнее</button>
    </section>
  );
}

export default ContributionsTab;
