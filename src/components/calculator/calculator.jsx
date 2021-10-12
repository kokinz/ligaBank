import React, {useState, useRef} from 'react';

function Calculator() {
  const [creditTarget, setCreditTarget] = useState('');

  const details = useRef();
  const propertyValue = useRef();

  const handleSelectorClick = (evt) => {
    if (!details.current.open) {
      details.current.open = true;
      return;
    }

    details.current.open = false;
    setCreditTarget(evt.target.title);
  };

  const handlePropertyValueType = (evt) => {
    const number = parseInt(evt.target.value.replace(/[^0-9]/g, ''), 10) || '';
    const chars = [...number.toString()];

    if (chars.length !== 0) {
      const stringWithSpace = chars.reduceRight((acc, char, index, array) => {
        const spaceOrNothing = (array.length - index) % 3 === 0 ? ' ' : '';

        return spaceOrNothing + char + acc;
      });

      const result = stringWithSpace[0] === ' ' ? stringWithSpace.slice(1) : stringWithSpace;

      propertyValue.current.value = result;

      return;
    }

    propertyValue.current.value = 0;
  };

  return(
    <section className="calculator container">
      <h2 className="calculator__header">Кредитный калькулятор</h2>

      <form className="calculator__form" action="https://echo.htmlacademy.ru/">
        <fieldset className="calculator__fieldset calculator__fieldset--first-step">
          <legend className="calculator__legend">Шаг 1. Цель кредита</legend>

          <details className="calculator__selector selector" ref={details}>
            <summary className="selector__summary">
              <input className="selector__option-input" type="radio" name="item" id="default" title="Выберите цель кредита" defaultChecked />

              <input className="selector__option-input" type="radio" name="item" id="item1" title="Ипотечное кредитование" onClick={handleSelectorClick} />

              <input className="selector__option-input" type="radio" name="item" id="item2" title="Автомобильное кредитование" onClick={handleSelectorClick} />
            </summary>

            <ul className="selector__options list">
              <li className="selector__option">
                <label className="selector__label" htmlFor="item1">Ипотечное кредитование</label>
              </li>

              <li className="selector__option">
                <label className="selector__label" htmlFor="item2">Автомобильное кредитование</label>
              </li>
            </ul>
          </details>
        </fieldset>
        {creditTarget ?
          <>
            <fieldset className="calculator__fieldset calculator__fieldset--second-step">
              <legend className="calculator__legend calculator__legend">Шаг 2. Введите параметры кредита</legend>

              <label className="calculator__label" htmlFor="propertyValue">Стоимость недвижимости</label>
              <div className="calculator__input-wrapper calculator__input-wrapper--rubles">
                <button className="calculator__button-minus" type="button">Минус</button>

                <input className="calculator__input calculator__input" ref={propertyValue} type="text" id="propertyValue" defaultValue={'2 000 000'} onChange={handlePropertyValueType}/>

                <button className="calculator__button-plus" type="button">Плюс</button>
              </div>
              <p className="calculator__prompt">От 1 200 000  до 25 000 000 рублей</p>

              <label className="calculator__label" htmlFor="initialFee">Первоначальный взнос</label>
              <div className="calculator__input-wrapper">
                <input className="calculator__input calculator__input" type="text" id="initialFee" defaultValue={200000} />

                <input type="range" />
              </div>

              <label className="calculator__label" htmlFor="loanTerms">Срок кредитования</label>
              <div className="calculator__input-wrapper">
                <input className="calculator__input calculator__input" type="number" id="loanTerms" defaultValue={5} />

                <input type="range" />
              </div>

              <input type="checkbox" id="maternityCapital" />
              <label className="calculator__label" htmlFor="maternityCapital">Использовать материнский капитал</label>
            </fieldset>

            <div className="calculator__offer offer">
              <p className="offer__header">Наше предложение</p>

              <div>
                <p className="offer__number">1 330 000 рублей </p>
                <p className="offer__text">Сумма ипотеки </p>
              </div>

              <div>
                <p className="offer__number">9,40% </p>
                <p className="offer__text">Процентная ставка </p>
              </div>

              <div>
                <p className="offer__number">27 868 рублей </p>
                <p className="offer__text">Ежемесячный платеж </p>
              </div>

              <div>
                <p className="offer__number">61 929 рублей </p>
                <p className="offer__text">Необходимый доход </p>
              </div>

              <button className="offer__button button">Оформить заявку</button>
            </div>
          </>
          : ''}
      </form>
    </section>
  );
}

export default Calculator;
