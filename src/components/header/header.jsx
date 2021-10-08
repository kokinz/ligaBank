import React from 'react';

function Header() {
  return(
    <header className="header">
      <div className="header__wrapper container">
        <a className="header__logo link" href="/" aria-label="Лига Банк">
          <svg className="header__logo-image" viewBox="0 0 30 27" width={28} height={25}>
            <use xlinkHref="#logo" />
          </svg>

          ЛИГА Банк
        </a>

        <nav className="header__nav nav">
          <ul className="header__list list">
            <li className="header__item">
              <a className="header__link link" href="/">Услуги</a>
            </li>
            <li className="header__item">
              <a className="header__link link" href="/">Рассчитать кредит</a>
            </li>
            <li className="header__item">
              <a className="header__link link header__link--active" href="/">Конвертер валют</a>
            </li>
            <li className="header__item">
              <a className="header__link link" href="/">Контакты</a>
            </li>
            <li className="header__item">
              <a className="header__link link" href="/">Задать вопрос</a>
            </li>
          </ul>

          <a className="header__user-link link" href="/" aria-label="Авторизация">
            <svg viewBox="0 0 20 22" width="20" height="22">
              <use xlinkHref="#user-login"></use>
            </svg>

            Войти в Интернет-банк
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
