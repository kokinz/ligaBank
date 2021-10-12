import React, {useState, useRef} from 'react';

function Calculator() {
  const [data, setData] = useState({
    creditTarget: '',
    propertyValue: '2 000 000',
  });

  const details = useRef();
  const propertyValue = useRef();

  const handleSelectorClick = (evt) => {
    if (!details.current.open) {
      details.current.open = true;
      return;
    }

    setData({
      ...data,
      creditTarget: evt.target.title,
    });

    details.current.open = false;
  };

  const handlePropertyValueType = (evt) => {
    const number = parseInt(evt.target.value.replace(/[^0-9]/g, ''), 10) || '';
    const chars = [...number.toString()];
    const cursorPosition = evt.target.selectionStart;

    if (chars.length !== 0) {
      const stringWithSpace = chars.reduceRight((acc, char, index, array) => {
        const spaceOrNothing = (array.length - index) % 3 === 0 ? ' ' : '';

        return spaceOrNothing + char + acc;
      });

      const result = stringWithSpace[0] === ' ' ? stringWithSpace.slice(1) : stringWithSpace;

      setData({
        ...data,
        propertyValue: result,
      });

      propertyValue.current.selectionStart = propertyValue.current.selectionEnd = cursorPosition;

      return;
    }

    setData({
      ...data,
      propertyValue: '0',
    });

    propertyValue.current.selectionStart = propertyValue.current.selectionEnd = 0;
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
        {data.creditTarget ?
          <>
            <fieldset className="calculator__fieldset calculator__fieldset--second-step">
              <legend className="calculator__legend calculator__legend">Шаг 2. Введите параметры кредита</legend>

              <label className="calculator__label" htmlFor="propertyValue">Стоимость недвижимости</label>
              <div className="calculator__input-wrapper calculator__input-wrapper--rubles">
                <button className="calculator__button-minus" type="button">Минус</button>

                <input className="calculator__input" ref={propertyValue} type="text" id="propertyValue" defaultValue="2 000 000" value={data.propertyValue} onChange={handlePropertyValueType} />

                <label className="calculator__input-text" htmlFor="propertyValue"> рублей</label>

                <button className="calculator__button-plus" type="button">Плюс</button>
              </div>
              <p className="calculator__prompt">От 1 200 000 &nbsp;до 25 000 000 рублей</p>

              <label className="calculator__label" htmlFor="initialFee">Первоначальный взнос</label>
              <div className="calculator__input-wrapper calculator__input-wrapper--rubles">
                <input className="calculator__input" type="text" id="initialFee" defaultValue="200 000" />

                <label className="calculator__input-text calculator__input-text--initial-fee" htmlFor="propertyValue"> рублей</label>
              </div>

              <input className="calculator__range" id="initialFeeRange" type="range" min="10" max="100" defaultValue="10" />
              <label htmlFor="initialFeeRange" className="calculator__range-text">10%</label>

              <label className="calculator__label" htmlFor="loanTerms">Срок кредитования</label>
              <div className="calculator__input-wrapper">
                <input className="calculator__input calculator__input--loan-terms" type="text" id="loanTerms" defaultValue="5" />

                <label className="calculator__input-text calculator__input-text--loan-terms" htmlFor="loanTerms"> лет</label>
              </div>

              <input className="calculator__range calculator__range--loan-terms" id="loanTermsRange" type="range" min="5" max="30" defaultValue="5" />
              <label htmlFor="loanTermsRange" className="calculator__range-text">5 лет</label>
              <label htmlFor="loanTermsRange" className="calculator__range-text calculator__range-text--max">30 лет</label>

              <input className="visually-hidden calculator__checkbox" type="checkbox" id="maternityCapital" defaultChecked />
              <label className="calculator__label calculator__label--checkbox" htmlFor="maternityCapital">Использовать материнский капитал</label>
            </fieldset>

            <div className="calculator__offer offer">
              <p className="offer__header">Наше предложение</p>

              <div className="offer__wrapper">
                <p className="offer__number">1 330 000 рублей </p>
                <p className="offer__text">Сумма ипотеки </p>
              </div>

              <div className="offer__wrapper">
                <p className="offer__number">9,40% </p>
                <p className="offer__text">Процентная ставка </p>
              </div>

              <div className="offer__wrapper">
                <p className="offer__number">27 868 рублей </p>
                <p className="offer__text">Ежемесячный платеж </p>
              </div>

              <div className="offer__wrapper">
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
