import React, {useState, useRef} from 'react';

function Calculator() {
  const MOUNTLY_INTEREST_RATE = {
    low: 0.007083,
    high: 0.00783,
  };

  const [data, setData] = useState({
    creditTarget: '',
    propertyValue: 2000000,
    initialFee: 200000,
    loanTerms: 5,
    maternityCapital: true,
    sum: 1330000,
    interestRate: MOUNTLY_INTEREST_RATE.high,
    monthlyPayment: 27868,
  });

  const [inputError, setInputError] = useState(false);
  const [formShown, setFormShown] = useState(false);

  const details = useRef();
  const propertyValue = useRef();
  const initialFee = useRef();
  const initialFeeRange = useRef();
  const loanTerms = useRef();
  const loanTermsRange = useRef();

  const getNumberFromString = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10) || '';

  const getNumberWithSpaces = (number) => {
    const chars = [...number.toString()];

    if (chars.length !== 0) {
      const stringWithSpace = chars.reduceRight((acc, char, index, array) => {
        const spaceOrNothing = (array.length - index) % 3 === 0 ? ' ' : '';

        return spaceOrNothing + char + acc;
      });

      const result = stringWithSpace[0] === ' ' ? stringWithSpace.slice(1) : stringWithSpace;

      return result;
    }

    return '0';
  };

  const getMonthlyPayment = (sum, rate, years) => {
    const periods = years * 12;

    return parseInt(sum * (rate + rate / (Math.pow(1 + rate, periods) - 1)), 10);

    // console.log(parseInt(sum * (rate + rate / (Math.pow(1 + rate, periods) - 1)), 10));
  };

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
    const number = getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;
    const sum = data.maternityCapital ? number - (number * 0.1) - 470000 : number - (number * 0.1);

    if (number < 1200000 || number > 25000000) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    setData({
      ...data,
      propertyValue: number,
      initialFee: number * 0.1,
      sum: sum,
      interestRate: MOUNTLY_INTEREST_RATE.high,
      monthlyPayment: getMonthlyPayment(sum, MOUNTLY_INTEREST_RATE.high, data.loanTerms),
    });

    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(number * 0.1)} рублей`;
    initialFeeRange.current.value = 10;
    propertyValue.current.selectionStart = propertyValue.current.selectionEnd = cursorPosition;
  };

  const handlePropertyValueMinus = () => {
    const number = getNumberFromString(propertyValue.current.value) - 100000;
    const sum = data.maternityCapital ? number - (number * 0.1) - 470000 : number - (number * 0.1);

    if (number < 1200000) {
      return;
    }

    if (number < 1200000 || number > 25000000) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    setData({
      ...data,
      propertyValue: number,
      initialFee: number * 0.1,
      sum: sum,
      interestRate: MOUNTLY_INTEREST_RATE.high,
      monthlyPayment: getMonthlyPayment(sum, MOUNTLY_INTEREST_RATE.high, data.loanTerms),
    });

    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(number * 0.1)} рублей`;
    initialFeeRange.current.value = 10;
  };

  const handlePropertyValuePlus = () => {
    const number = getNumberFromString(propertyValue.current.value) + 100000;
    const sum = data.maternityCapital ? number - (number * 0.1) - 470000 : number - (number * 0.1);

    if (number > 25000000) {
      return;
    }

    if (number < 1200000 || number > 25000000) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    setData({
      ...data,
      propertyValue: number,
      initialFee: number * 0.1,
      sum: sum,
      interestRate: MOUNTLY_INTEREST_RATE.high,
      monthlyPayment: getMonthlyPayment(sum, MOUNTLY_INTEREST_RATE.high, data.loanTerms),
    });

    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(number * 0.1)} рублей`;
    initialFeeRange.current.value = 10;
  };

  const handleInitialFeeType = (evt) => {
    const number = getNumberFromString(evt.target.value) > data.propertyValue ? data.propertyValue : getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;
    let sum = 0;

    if (number < data.propertyValue * 0.1) {
      sum = data.maternityCapital ? data.propertyValue - (data.propertyValue * 0.1) - 470000 : data.propertyValue - (data.propertyValue * 0.1);

      setData({
        ...data,
        initialFee: data.propertyValue * 0.1,
        sum: sum,
        interestRate: MOUNTLY_INTEREST_RATE.high,
        monthlyPayment: getMonthlyPayment(sum, MOUNTLY_INTEREST_RATE.high, data.loanTerms),
      });

      initialFee.current.value = `${getNumberWithSpaces(data.propertyValue * 0.10)} рублей`;
      initialFeeRange.current.value = 10;
      initialFee.current.selectionStart = initialFee.current.selectionEnd = cursorPosition;

      return;
    }

    sum = data.maternityCapital ? data.propertyValue - number - 470000 : data.propertyValue - number;

    setData({
      ...data,
      initialFee: number,
      sum: data.maternityCapital ? data.propertyValue - number - 470000 : data.propertyValue - number,
      interestRate: number / data.propertyValue * 100 < 15 ? MOUNTLY_INTEREST_RATE.high : MOUNTLY_INTEREST_RATE.low,
      monthlyPayment: getMonthlyPayment(sum, number / data.propertyValue * 100 < 15 ? MOUNTLY_INTEREST_RATE.high : MOUNTLY_INTEREST_RATE.low, data.loanTerms),
    });

    initialFee.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFeeRange.current.value = number / data.propertyValue * 100;
    initialFee.current.selectionStart = initialFee.current.selectionEnd = cursorPosition;
  };

  const handleInitialFeeChange = (evt) => {
    const number = data.propertyValue / 100 * getNumberFromString(evt.target.value);
    const sum = data.maternityCapital ? data.propertyValue - number - 470000 : data.propertyValue - number;

    setData({
      ...data,
      initialFee: number,
      sum: sum,
      interestRate: number / data.propertyValue * 100 < 15 ? MOUNTLY_INTEREST_RATE.high : MOUNTLY_INTEREST_RATE.low,
      monthlyPayment: getMonthlyPayment(sum, number / data.propertyValue * 100 < 15 ? MOUNTLY_INTEREST_RATE.high : MOUNTLY_INTEREST_RATE.low, data.loanTerms),
    });

    initialFee.current.value = `${getNumberWithSpaces(number)} рублей`;
  };

  const handleLoanTermsType = (evt) => {
    const number = getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;

    if (number < 5) {
      setData({
        ...data,
        loanTerms: 5,
        monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, 5),
      });

      loanTerms.current.value = '5 лет';
      loanTermsRange.current.value = 5;
      loanTerms.current.selectionStart = loanTerms.current.selectionEnd = cursorPosition;

      return;
    }

    if (number > 30) {
      setData({
        ...data,
        loanTerms: 30,
        monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, 30),
      });

      loanTerms.current.value = '30 лет';
      loanTermsRange.current.value = 30;
      loanTerms.current.selectionStart = loanTerms.current.selectionEnd = cursorPosition;

      return;
    }

    setData({
      ...data,
      loanTerms: number,
      monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, number),
    });

    loanTerms.current.value = `${getNumberWithSpaces(number)} лет`;
    loanTermsRange.current.value = number;
    loanTerms.current.selectionStart = loanTerms.current.selectionEnd = cursorPosition;
  };

  const handleLoanTermsChange = (evt) => {
    const number = getNumberFromString(evt.target.value);

    setData({
      ...data,
      loanTerms: number,
      monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, number),
    });

    loanTerms.current.value = `${number} лет`;
  };

  const handleMaternityCapitalClick = () => {
    setData({
      ...data,
      maternityCapital: !data.maternityCapital,
      sum: !data.maternityCapital ? data.propertyValue - data.initialFee - 470000 : data.propertyValue - data.initialFee,
      monthlyPayment: getMonthlyPayment(!data.maternityCapital ? data.propertyValue - data.initialFee - 470000 : data.propertyValue - data.initialFee, data.interestRate, data.loanTerms),
    });
  };

  const handleMakeRequestClick = (evt) => {
    evt.preventDefault();
    setFormShown(true);
  };

  return(
    <section className="calculator container">
      <h2 className="calculator__header">Кредитный калькулятор</h2>

      <form className="calculator__form" action="https://echo.htmlacademy.ru/">
        <fieldset className="calculator__fieldset calculator__fieldset--first-step">
          <legend className="calculator__legend">Шаг 1. Цель кредита</legend>

          <details className="calculator__selector selector" ref={details}>
            <summary className="selector__summary">
              <input className="selector__option-input" type="radio" name="creditTarget" id="default" title="Выберите цель кредита" defaultChecked />

              <input className="selector__option-input" type="radio" name="creditTarget" id="item1" title="Ипотечное кредитование" onClick={handleSelectorClick} />

              <input className="selector__option-input" type="radio" name="creditTarget" id="item2" title="Автомобильное кредитование" onClick={handleSelectorClick} />
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
                <button className="calculator__button-minus button" type="button" onClick={handlePropertyValueMinus}>Минус</button>

                <input className={inputError ? 'calculator__input calculator__input--error' : 'calculator__input'} ref={propertyValue} type="text" id="propertyValue" defaultValue="2 000 000 рублей" onChange={handlePropertyValueType} />

                {inputError ? <span className="calculator__error">Некорректное значение</span> : ''}

                <button className="calculator__button-plus button" type="button" onClick={handlePropertyValuePlus}>Плюс</button>
              </div>
              <p className="calculator__prompt">От 1 200 000 &nbsp;до 25 000 000 рублей</p>

              <label className="calculator__label" htmlFor="initialFee">Первоначальный взнос</label>
              <input className="calculator__input" ref={initialFee} type="text" id="initialFee" defaultValue="200 000 рублей" onChange={handleInitialFeeType} />

              <input className="calculator__range" id="initialFeeRange" ref={initialFeeRange} type="range" min="10" max="100" step="5" defaultValue="10" onChange={handleInitialFeeChange} />
              <label htmlFor="initialFeeRange" className="calculator__range-text">10%</label>

              <label className="calculator__label" htmlFor="loanTerms">Срок кредитования</label>
              <input className="calculator__input calculator__input--loan-terms" ref={loanTerms} type="text" id="loanTerms" defaultValue="5 лет" onChange={handleLoanTermsType} />

              <input className="calculator__range calculator__range--loan-terms" id="loanTermsRange" ref={loanTermsRange} type="range" min="5" max="30" step="1" defaultValue="5" onChange={handleLoanTermsChange} />
              <label htmlFor="loanTermsRange" className="calculator__range-text">5 лет</label>
              <label htmlFor="loanTermsRange" className="calculator__range-text calculator__range-text--max">30 лет</label>

              <input className="visually-hidden calculator__checkbox" type="checkbox" id="maternityCapital" checked={data.maternityCapital} onChange={handleMaternityCapitalClick}/>
              <label className="calculator__label calculator__label--checkbox" htmlFor="maternityCapital">Использовать материнский капитал</label>
            </fieldset>

            {data.sum < 500000 ?
              <div className="calculator__offer calculator__offer--error offer">
                <p className="offer__header">Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей.</p>
                <p className="offer__text offer__text--error">Попробуйте использовать другие параметры для расчёта. </p>
              </div> :
              <div className="calculator__offer offer">
                <p className="offer__header">Наше предложение</p>

                <div className="offer__wrapper">
                  <p className="offer__number">{getNumberWithSpaces(data.sum)} рублей </p>
                  <p className="offer__text">Сумма ипотеки </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">{data.initialFee / data.propertyValue * 100 < 15 ? '9,40%' : '8,50%'}</p>
                  <p className="offer__text">Процентная ставка </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">{getNumberWithSpaces(data.monthlyPayment)} рублей </p>
                  <p className="offer__text">Ежемесячный платеж </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">61 929 рублей </p>
                  <p className="offer__text">Необходимый доход </p>
                </div>

                <button className="offer__button button" type="button" onClick={handleMakeRequestClick}>Оформить заявку</button>
              </div>}
          </>
          : ''}

        {formShown ?
          <fieldset className="calculator__fieldset calculator__fieldset--third-step">
            <legend className="calculator__legend calculator__legend--third-step">Шаг 3. Оформление заявки</legend>

            <ul className="calculator__data-list list">
              <li className="calculator__data-item">
                <span className="calculator__data-header">Номер заявки</span>

                <span className="calculator__data-value">№ 0010</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Цель кредита</span>

                <span className="calculator__data-value">Ипотека</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Стоимость недвижимости</span>

                <span className="calculator__data-value">2 000 000 рублей</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Первоначальный взнос</span>

                <span className="calculator__data-value">200 000 рублей</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Срок кредитования</span>

                <span className="calculator__data-value">5 лет</span>
              </li>
            </ul>

            <input className="calculator__input calculator__input--full-name" type="text" placeholder="ФИО" autoFocus />

            <input className="calculator__input calculator__input--user-phone" type="text" placeholder="Телефон" />

            <input className="calculator__input calculator__input--user-email" type="text" placeholder="E-mail" />

            <button className="calculator__submit button" type="submit">Отправить</button>
          </fieldset>
          : ''}
      </form>
    </section>
  );
}

export default Calculator;
