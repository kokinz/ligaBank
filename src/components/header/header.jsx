import React, {useState} from 'react';
import LoginPopup from '../popups/login-popup/login-popup';

function Header() {
  const [popupShown, setPopupShown] = useState(false);
  const [menuShown, setMenuShown] = useState(false);

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

  const handleMenuButtonClick = (evt) => {
    evt.preventDefault();

    setMenuShown(true);
  };

  const handleMenuButtonClose = (evt) => {
    evt.preventDefault();

    setMenuShown(false);
  };

  return(
    <header className={`header ${menuShown ? 'header--menu' : ''}`}>
      <div className="header__wrapper container">
        <a className="header__logo link" href="/" aria-label="Лига Банк">
          <svg className="header__logo-image header__logo-image--desktop" viewBox="0 0 150 27" width={150} height={27}>
            <use xlinkHref="#logo" />
          </svg>
          <svg className="header__logo-image header__logo-image--tablet" viewBox="0 0 134 24" width={134} height={24}>
            <use xlinkHref="#logo-tablet" />
          </svg>
          <svg className="header__logo-image header__logo-image--mobile" viewBox="0 0 116 19" width={116} height={19}>
            <use xlinkHref="#logo-mobile" />
          </svg>
        </a>

        <nav className={`header__nav nav ${menuShown ? 'header__nav--menu' : ''}`}>
          <ul className={`header__list list ${menuShown ? 'header__list--menu' : ''}`}>
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

          <a className={`header__user-link link ${menuShown ? 'header__user-link--menu' : ''}`} href="/" aria-label="Авторизация" onClick={handleLoginClick}>
            <svg className={`header__user-image ${menuShown ? 'header__user-image--menu' : ''}`} viewBox="0 0 20 22" width="20" height="22">
              <use xlinkHref="#user-login"></use>
            </svg>

            Войти в Интернет-банк
          </a>

          <button className={`header__menu-button button ${menuShown ? 'header__menu-button--menu' : ''}`} onClick={handleMenuButtonClick} aria-label="Меню">Меню</button>
          <button className={`header__menu-close button ${menuShown ? 'header__menu-close--menu' : ''}`} onClick={handleMenuButtonClose} aria-label="Закрыть меню">Закрыть Меню</button>
        </nav>
      </div>

      {popupShown && <LoginPopup onCloseClick={handlePopupClose} />}
    </header>
  );
}

export default Header;
