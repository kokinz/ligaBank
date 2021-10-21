import React, {useRef} from 'react';
import PropTypes from 'prop-types';

function LoginPopup ({onCloseClick}) {
  const login = useRef();
  const password = useRef();
  const showPassword = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    localStorage.setItem('loginData', JSON.stringify({
      userLogin: login.current.value,
      userPassword: password.current.value,
    }));

    onCloseClick();
  };

  const handlePasswordMouseDown = (evt) => {
    evt.preventDefault();
    password.current.type = 'text';
  };

  const handlePasswordMouseUp = (evt) => {
    evt.preventDefault();
    password.current.type = 'password';
  };

  return (
    <div className="header__popup-wrapper">
      <form className="login popup" action="https://echo.htmlacademy.ru/" onSubmit={handleFormSubmit}>
        <p className="login__header">
          <svg viewBox="0 0 151 31" width="151" height="31" alt="Логотип">
            <use xlinkHref="#login-logo"></use>
          </svg>
        </p>

        <label className="login__label" htmlFor="login" >Логин</label>
        <input className="login__input" ref={login} type="text" id="login" autoFocus required />

        <label className="login__label" htmlFor="password">Пароль</label>
        <div className="login__input-wrapper">
          <input className="login__input" ref={password} type="password" id="password" required />

          <button className="login__show-password button" ref={showPassword} type="button" onMouseDown={handlePasswordMouseDown} onMouseUp={handlePasswordMouseUp} onPointerDown={handlePasswordMouseDown} onPointerUp={handlePasswordMouseUp}>
            Посмотреть пароль

            <svg viewBox="0 0 22 12" width="22" height="12" aria-label="Посмотреть пароль">
              <use xlinkHref="#password-eye"></use>
            </svg>
          </button>

          <a className="login__forgotten-password button" href="/">Забыли пароль?</a>
        </div>

        <button className="login__button button" type="submit">Войти</button>

        <button className="login__close-button button" onClick={onCloseClick}>Закрыть</button>
      </form>
    </div>

  );
}

LoginPopup.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default LoginPopup;
