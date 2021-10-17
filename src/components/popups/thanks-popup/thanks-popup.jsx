import React from 'react';
import PropTypes from 'prop-types';

function ThanksPopus ({onCloseClick}) {
  return (
    <div className="calculator__popup-wrapper">
      <div className="thanks popup">
        <p className="thanks__header">Спасибо за обращение в наш банк.</p>

        <p className="thanks__text">Наш менеджер скоро свяжется с вами по указанному номеру телефона.</p>

        <button className="thanks__close-button button" onClick={onCloseClick}>Закрыть</button>
      </div>
    </div>

  );
}

ThanksPopus.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default ThanksPopus;
