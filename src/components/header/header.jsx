import React, {useState} from 'react';
import LoginPopup from '../popups/login-popup/login-popup';

function Header() {
  const [popupShown, setPopupShown] = useState(false);

  const handleEscKeydown = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();

      setPopupShown(false);

      document.body.style.height = '100%';
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscKeydown);
    }
  };

  const handleLoginClick = (evt) => {
    evt.preventDefault();

    setPopupShown(true);
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscKeydown);
  };

  const handlePopupClose = () => {
    setPopupShown(false);

    document.body.style.height = '100%';
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', handleEscKeydown);
  };

  return(
    <header className="header">
      <div className="header__wrapper container">
        <a className="header__logo link" href="/" aria-label="Лига Банк">
          <svg className="header__logo-image header__logo-image--desktop" viewBox="0 0 150 27" width={150} height={27}>
            <use xlinkHref="#logo" />
          </svg>
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
              <a className="header__link link" href="/">Конвертер валют</a>
            </li>
            <li className="header__item">
              <a className="header__link link" href="/">Контакты</a>
            </li>
          </ul>

          <a className="header__user-link link" href="/" aria-label="Авторизация" onClick={handleLoginClick}>
            <svg viewBox="0 0 20 22" width="20" height="22">
              <use xlinkHref="#user-login"></use>
            </svg>

            Войти в Интернет-банк
          </a>
        </nav>
      </div>

      {popupShown && <LoginPopup onCloseClick={handlePopupClose} />}
    </header>
  );
}

export default Header;
