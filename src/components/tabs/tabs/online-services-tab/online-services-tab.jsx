import React from 'react';

function OnlineServicesTab() {
  return (
    <section className="tabs__tab tab tab--online-services">
      <h3 className="tab__header tab__header--online-services">Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</h3>

      <ul className="tab__list list">
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text tab__text--online-services">Мобильный банк,<br /> который всегда под рукой</p>
        </li>
        <li className="tab__item">
          <svg className="tab__icon" width="13" height="10">
            <use xlinkHref="#check-mark"></use>
          </svg>

          <p className="tab__text tab__text--online-services">Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</p>
        </li>
      </ul>

      <button className="tab__button tab__button--online-services button">Узнать подробнее</button>
    </section>
  );
}

export default OnlineServicesTab;
