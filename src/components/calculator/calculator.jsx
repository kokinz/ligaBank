import React, {useState, useRef} from 'react';

function Calculator() {
  const [creditTarget, setCreditTarget] = useState('');

  const details = useRef();

  const handleSelectorClick = (evt) => {
    if (!details.current.open) {
      details.current.open = true;
      return;
    }

    details.current.open = false;
    setCreditTarget(evt.target.title);
  };

  return(
    <section className="calculator container">
      <h2 className="calculator__header">Кредитный калькулятор</h2>

      <form className="calculator__form" action="https://echo.htmlacademy.ru/">
        <fieldset className="calculator__fieldset calculator__fieldset--first-step">
          <legend className="calculator__legend">Шаг 1. Цель кредита</legend>

          <details className="calculator__details" ref={details}>
            <summary className="calculator__summary">
              <input className="calculator__option-input" type="radio" name="item" id="default" title="Выберите цель кредита" defaultChecked />

              <input className="calculator__option-input" type="radio" name="item" id="item1" title="Ипотечное кредитование" onClick={handleSelectorClick} />

              <input className="calculator__option-input" type="radio" name="item" id="item2" title="Автомобильное кредитование" onClick={handleSelectorClick} />
            </summary>

            <ul className="calculator__options list">
              <li className="calculator__option">
                <label className="calculator__label" htmlFor="item1">Ипотечное кредитование</label>
              </li>

              <li className="calculator__option">
                <label className="calculator__label" htmlFor="item2">Автомобильное кредитование</label>
              </li>
            </ul>
          </details>
        </fieldset>
      </form>
    </section>
  );
}

export default Calculator;
