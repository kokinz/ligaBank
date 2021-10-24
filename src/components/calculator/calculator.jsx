import React, {useState, useRef} from 'react';
import ThanksPopup from '../popups/thanks-popup/thanks-popup';

import {CREDIT_START_SUM, ZERO_LENGTH, PERCENTAGE_INCOME, LoanType, Mortgage, CarLending, MountlyInterestRate} from '../../const';
import {getNumberFromString, getNumberWithSpaces, getMonthlyPayment} from '../../utils';

function Calculator() {
  const [data, setData] = useState({
    id: '0010',
    creditTarget: '',
    propertyValue: 0,
    initialFee: 0,
    loanTerms: 0,
    maternityCapital: true,
    casco: true,
    lifeInsurance: true,
    sum: 0,
    interestRate: 0,
    monthlyPayment: 0,
  });

  const [setting, setSetting] = useState({
    step: 0,
    minInitialFee: 0,
    min: 0,
    max: 0,
    minTerm: 0,
    maxTerm: 0,
    maternityCapital: 0,
    minSum: 0,
  });

  const [inputError, setInputError] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  const details = useRef();

  const propertyValue = useRef();

  const initialFee = useRef();
  const initialFeeRange = useRef();

  const loanTerms = useRef();
  const loanTermsRange = useRef();

  const userFullName = useRef();
  const userPhoneNumber = useRef();
  const userEmail = useRef();

  const handleSelectorClick = (evt) => {
    if (!details.current.open) {
      details.current.open = true;
      return;
    }

    if (evt.target.id === 'default') {
      details.current.open = !details.current.open;
    }

    if (evt.target.title === LoanType.MORTGAGE || evt.target.title === LoanType.CAR_LENDING) {
      if (evt.target.title === LoanType.MORTGAGE) {
        setData({
          ...data,
          creditTarget: evt.target.title,
          propertyValue: CREDIT_START_SUM,
          initialFee: CREDIT_START_SUM / Mortgage.INITIAL_FEE,
          loanTerms: Mortgage.MIN_TERM,
          maternityCapital: true,
          sum: CREDIT_START_SUM - Mortgage.MATERNITY_CAPITAL - CREDIT_START_SUM / Mortgage.INITIAL_FEE,
          interestRate: MountlyInterestRate.MIDDLE,
          monthlyPayment: getMonthlyPayment(CREDIT_START_SUM - Mortgage.MATERNITY_CAPITAL - CREDIT_START_SUM / Mortgage.INITIAL_FEE, MountlyInterestRate.MIDDLE, Mortgage.MIN_TERM),
        });

        setSetting({
          ...setting,
          step: Mortgage.STEP,
          minInitialFee: Mortgage.INITIAL_FEE,
          min: Mortgage.MIN,
          max: Mortgage.MAX,
          minTerm: Mortgage.MIN_TERM,
          maxTerm: Mortgage.MAX_TERM,
          maternityCapital: Mortgage.MATERNITY_CAPITAL,
          minSum: Mortgage.MIN_SUM,
        });

        if (data.creditTarget) {
          propertyValue.current.value = `${getNumberWithSpaces(CREDIT_START_SUM)} рублей`;
          initialFee.current.value = `${getNumberWithSpaces(CREDIT_START_SUM / Mortgage.INITIAL_FEE)} рублей`;
          initialFeeRange.current.min = 100 / Mortgage.INITIAL_FEE;
          initialFeeRange.current.value = 100 / Mortgage.INITIAL_FEE;
          loanTerms.current.value = `${getNumberWithSpaces(Mortgage.MIN_TERM)} лет`;
          loanTermsRange.current.value = Mortgage.MIN_TERM;
        }
      }

      if (evt.target.title === LoanType.CAR_LENDING) {
        setData({
          ...data,
          creditTarget: evt.target.title,
          propertyValue: CREDIT_START_SUM,
          initialFee: CREDIT_START_SUM / CarLending.INITIAL_FEE,
          loanTerms: CarLending.MAX_TERM,
          casco: true,
          lifeInsurance: true,
          sum: CREDIT_START_SUM - CREDIT_START_SUM / CarLending.INITIAL_FEE,
          interestRate: MountlyInterestRate.LOWEST,
          monthlyPayment: getMonthlyPayment(CREDIT_START_SUM - CREDIT_START_SUM / CarLending.INITIAL_FEE, MountlyInterestRate.LOWEST, CarLending.MAX_TERM),
        });

        setSetting({
          ...setting,
          step: CarLending.STEP,
          minInitialFee: CarLending.INITIAL_FEE,
          min: CarLending.MIN,
          max: CarLending.MAX,
          minTerm: CarLending.MIN_TERM,
          maxTerm: CarLending.MAX_TERM,
          maternityCapital: 0,
          minSum: CarLending.MIN_SUM,
        });

        if (data.creditTarget) {
          propertyValue.current.value = `${getNumberWithSpaces(CREDIT_START_SUM)} рублей`;
          initialFee.current.value = `${getNumberWithSpaces(CREDIT_START_SUM / CarLending.INITIAL_FEE)} рублей`;
          initialFeeRange.current.value = 100 / CarLending.INITIAL_FEE;
          loanTerms.current.value = `${getNumberWithSpaces(CarLending.MAX_TERM)} лет`;
          loanTermsRange.current.value = CarLending.MAX_TERM;
        }
      }

      details.current.open = false;
      setInputError(false);
    }
  };

  const handlePropertyValueType = (evt) => {
    const number = getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;
    const sum = parseInt(data.maternityCapital ? number - (number / setting.minInitialFee) - setting.maternityCapital : number - (number / setting.minInitialFee), 10);

    setInputError(number < setting.min || number > setting.max);

    if (data.creditTarget === LoanType.MORTGAGE) {
      setData({
        ...data,
        propertyValue: number,
        initialFee: parseInt(number / setting.minInitialFee, 10),
        sum: sum,
        interestRate: MountlyInterestRate.MIDDLE,
        monthlyPayment: getMonthlyPayment(sum, MountlyInterestRate.MIDDLE, data.loanTerms),
      });
    }

    if (data.creditTarget === LoanType.CAR_LENDING) {
      if (!data.casco && !data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH,
          monthlyPayment: getMonthlyPayment(sum, number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH, data.loanTerms),
        });
      }

      if (data.casco || data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW,
          monthlyPayment: getMonthlyPayment(sum, data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW, data.loanTerms),
        });
      }
    }


    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(parseInt(number / setting.minInitialFee, 10))} рублей`;
    initialFeeRange.current.value = 100 / setting.minInitialFee;
    propertyValue.current.selectionStart = propertyValue.current.selectionEnd = cursorPosition;
  };

  const handlePropertyValueMinus = () => {
    const number = getNumberFromString(propertyValue.current.value) - setting.step;
    const sum = parseInt(data.maternityCapital ? number - (number / setting.minInitialFee) - setting.maternityCapital : number - (number / setting.minInitialFee), 10);

    if (number < setting.min) {
      return;
    }

    setInputError(number < setting.min || number > setting.max);

    if (data.creditTarget === LoanType.MORTGAGE) {
      setData({
        ...data,
        propertyValue: number,
        initialFee: parseInt(number / setting.minInitialFee, 10),
        sum: sum,
        interestRate: MountlyInterestRate.MIDDLE,
        monthlyPayment: getMonthlyPayment(sum, MountlyInterestRate.MIDDLE, data.loanTerms),
      });
    }

    if (data.creditTarget === LoanType.CAR_LENDING) {
      if (!data.casco && !data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH,
          monthlyPayment: getMonthlyPayment(sum, number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH, data.loanTerms),
        });
      }

      if (data.casco || data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW,
          monthlyPayment: getMonthlyPayment(sum, data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW, data.loanTerms),
        });
      }
    }

    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(parseInt(number / setting.minInitialFee, 10))} рублей`;
    initialFeeRange.current.value = 100 / setting.minInitialFee;
  };

  const handlePropertyValuePlus = () => {
    const number = getNumberFromString(propertyValue.current.value) + setting.step;
    const sum = parseInt(data.maternityCapital ? number - (number / setting.minInitialFee) - setting.maternityCapital : number - (number / setting.minInitialFee), 10);

    if (number > setting.max) {
      return;
    }

    setInputError(number < setting.min || number > setting.max);

    if (data.creditTarget === LoanType.MORTGAGE) {
      setData({
        ...data,
        propertyValue: number,
        initialFee: parseInt(number / setting.minInitialFee, 10),
        sum: sum,
        interestRate: MountlyInterestRate.MIDDLE,
        monthlyPayment: getMonthlyPayment(sum, MountlyInterestRate.MIDDLE, data.loanTerms),
      });
    }

    if (data.creditTarget === LoanType.CAR_LENDING) {
      if (!data.casco && !data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH,
          monthlyPayment: getMonthlyPayment(sum, number < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH, data.loanTerms),
        });
      }

      if (data.casco || data.lifeInsurance) {
        setData({
          ...data,
          propertyValue: number,
          initialFee: parseInt(number / setting.minInitialFee, 10),
          sum: sum,
          interestRate: data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW,
          monthlyPayment: getMonthlyPayment(sum, data.casco && data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW, data.loanTerms),
        });
      }
    }

    propertyValue.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFee.current.value = `${getNumberWithSpaces(parseInt(number / setting.minInitialFee, 10))} рублей`;
    initialFeeRange.current.value = 100 / setting.minInitialFee;
  };

  const handleInitialFeeType = (evt) => {
    const number = getNumberFromString(evt.target.value) > data.propertyValue ? data.propertyValue : getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;
    let sum = 0;

    if (number < data.propertyValue / setting.minInitialFee) {
      sum = parseInt(data.maternityCapital ? data.propertyValue - (data.propertyValue / setting.minInitialFee) - setting.maternityCapital : data.propertyValue - (data.propertyValue / setting.minInitialFee), 10);

      if (data.creditTarget === LoanType.MORTGAGE) {
        setData({
          ...data,
          initialFee: parseInt(data.propertyValue / setting.minInitialFee, 10),
          sum: sum,
          interestRate: MountlyInterestRate.MIDDLE,
          monthlyPayment: getMonthlyPayment(sum, MountlyInterestRate.MIDDLE, data.loanTerms),
        });
      }

      if (data.creditTarget === LoanType.CAR_LENDING) {
        setData({
          ...data,
          initialFee: parseInt(data.propertyValue / setting.minInitialFee, 10),
          sum: sum,
          monthlyPayment: getMonthlyPayment(sum, data.interestRate, data.loanTerms),
        });
      }

      initialFee.current.value = `${getNumberWithSpaces(parseInt(data.propertyValue / setting.minInitialFee, 10))} рублей`;
      initialFeeRange.current.value = 100 / setting.minInitialFee;
      initialFee.current.selectionStart = initialFee.current.selectionEnd = cursorPosition;

      return;
    }

    sum = data.maternityCapital ? data.propertyValue - number - setting.maternityCapital : data.propertyValue - number;

    if (data.creditTarget === LoanType.MORTGAGE) {
      setData({
        ...data,
        initialFee: number,
        sum: sum,
        interestRate: number / data.propertyValue * 100 < Mortgage.CONTRIBUTIONS_PERCENTAGE ? MountlyInterestRate.MIDDLE : MountlyInterestRate.LOW,
        monthlyPayment: getMonthlyPayment(sum, number / data.propertyValue * 100 < Mortgage.CONTRIBUTIONS_PERCENTAGE ? MountlyInterestRate.MIDDLE : MountlyInterestRate.LOW, data.loanTerms),
      });
    }

    if (data.creditTarget === LoanType.CAR_LENDING) {
      setData({
        ...data,
        initialFee: number,
        sum: sum,
        monthlyPayment: getMonthlyPayment(sum, data.interestRate, data.loanTerms),
      });
    }


    initialFee.current.value = `${getNumberWithSpaces(number)} рублей`;
    initialFeeRange.current.value = number / data.propertyValue * 100;
    initialFee.current.selectionStart = initialFee.current.selectionEnd = cursorPosition;
  };

  const handleInitialFeeChange = (evt) => {
    const number = parseInt(data.propertyValue / 100 * getNumberFromString(evt.target.value), 10);
    const sum = parseInt(data.maternityCapital ? data.propertyValue - number - setting.maternityCapital : data.propertyValue - number, 10);


    if (data.creditTarget === LoanType.MORTGAGE) {
      setData({
        ...data,
        initialFee: number,
        sum: sum,
        interestRate: number / data.propertyValue * 100 < Mortgage.CONTRIBUTIONS_PERCENTAGE ? MountlyInterestRate.MIDDLE : MountlyInterestRate.LOW,
        monthlyPayment: getMonthlyPayment(sum, number / data.propertyValue * 100 < Mortgage.CONTRIBUTIONS_PERCENTAGE ? MountlyInterestRate.MIDDLE : MountlyInterestRate.LOW, data.loanTerms),
      });
    }

    if (data.creditTarget === LoanType.CAR_LENDING) {
      setData({
        ...data,
        initialFee: number,
        sum: sum,
        monthlyPayment: getMonthlyPayment(sum, data.interestRate, data.loanTerms),
      });
    }

    initialFee.current.value = `${getNumberWithSpaces(number)} рублей`;
  };

  const handleLoanTermsType = (evt) => {
    const number = getNumberFromString(evt.target.value);
    const cursorPosition = evt.target.selectionStart;

    if (number < setting.minTerm) {
      setData({
        ...data,
        loanTerms: setting.minTerm,
        monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, setting.minTerm),
      });

      loanTerms.current.value = setting.minTerm === CarLending.MIN_TERM ? `${setting.minTerm} год` : `${setting.minTerm} лет`;
      loanTermsRange.current.value = setting.minTerm;
      loanTerms.current.selectionStart = loanTerms.current.selectionEnd = cursorPosition;

      return;
    }

    if (number > setting.maxTerm) {
      setData({
        ...data,
        loanTerms: setting.maxTerm,
        monthlyPayment: getMonthlyPayment(data.sum, data.interestRate, setting.maxTerm),
      });

      loanTerms.current.value = `${setting.minTerm} лет`;
      loanTermsRange.current.value = setting.maxTerm;
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
      sum: !data.maternityCapital ? data.propertyValue - data.initialFee - Mortgage.MATERNITY_CAPITAL : data.propertyValue - data.initialFee,
      monthlyPayment: getMonthlyPayment(!data.maternityCapital ? data.propertyValue - data.initialFee - Mortgage.MATERNITY_CAPITAL : data.propertyValue - data.initialFee, data.interestRate, data.loanTerms),
    });
  };

  const handleCascoClick = () => {
    if (!data.lifeInsurance && data.casco) {
      setData({
        ...data,
        casco: !data.casco,
        interestRate: data.propertyValue < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH,
        monthlyPayment: getMonthlyPayment(data.sum, data.propertyValue < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH, data.loanTerms),
      });

      return;
    }

    setData({
      ...data,
      casco: !data.casco,
      interestRate: data.lifeInsurance && !data.casco ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW,
      monthlyPayment: getMonthlyPayment(data.sum, data.lifeInsurance && !data.casco ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW, data.loanTerms),
    });
  };

  const handleLifeInsuranceClick = () => {
    if (!data.casco && data.lifeInsurance) {
      setData({
        ...data,
        lifeInsurance: !data.lifeInsurance,
        interestRate: data.propertyValue < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH,
        monthlyPayment: getMonthlyPayment(data.sum, data.propertyValue < CREDIT_START_SUM ? MountlyInterestRate.HIGHEST : MountlyInterestRate.HIGH, data.loanTerms),
      });

      return;
    }

    setData({
      ...data,
      lifeInsurance: !data.lifeInsurance,
      interestRate: data.casco && !data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW,
      monthlyPayment: getMonthlyPayment(data.sum, data.casco && !data.lifeInsurance ? MountlyInterestRate.LOWEST : MountlyInterestRate.LOW, data.loanTerms),
    });
  };

  const handleMakeRequestClick = (evt) => {
    evt.preventDefault();
    setFormShown(true);
  };

  const handleUserPhoneNumberType = (evt) => {
    let cursorPosition = evt.target.selectionStart === 1 ? evt.target.selectionStart + 3 : evt.target.selectionStart;
    const number = getNumberFromString(evt.target.value);
    const chars = [...number.toString()];
    const result = `+${chars[0]} (${chars.slice(1, 4).join('')}) ${chars.slice(4, 7).join('')} ${chars.slice(7, 11).join('')}`;

    if (number === '') {
      userPhoneNumber.current.value = '';
      return;
    }

    if (cursorPosition === 7) {
      cursorPosition = 9;
    }

    if (cursorPosition === 8) {
      cursorPosition = 7;
    }

    if (cursorPosition === 12) {
      cursorPosition = 13;
    } else if (cursorPosition === 13) {
      cursorPosition = 12;
    }

    userPhoneNumber.current.value = result;
    userPhoneNumber.current.selectionStart = userPhoneNumber.current.selectionEnd = cursorPosition;
  };

  const handleEscKeydown = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();

      setPopupShown(false);

      document.body.style.height = '100%';
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscKeydown);
    }
  };

  const handlePopupClose = (evt) => {
    setPopupShown(false);

    document.body.style.height = '100%';
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', handleEscKeydown);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    localStorage.setItem('userData', JSON.stringify({
      userFullName: userFullName.current.value,
      userPhoneNumber: userPhoneNumber.current.value,
      userEmail: userEmail.current.value,
    }));

    setData({
      ...data,
      id: (getNumberFromString(data.id) + 1).toString().padStart(ZERO_LENGTH, '0'),
    });

    setFormShown(!formShown);
    setPopupShown(!popupShown);

    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscKeydown);
  };

  return(
    <section className="calculator container" id="creditCalculator">
      <h2 className="calculator__header">Кредитный калькулятор</h2>

      <form className="calculator__form" action="https://echo.htmlacademy.ru/" onSubmit={handleFormSubmit}>
        <fieldset className="calculator__fieldset calculator__fieldset--first-step">
          <legend className="calculator__legend">Шаг 1. Цель кредита</legend>

          <details className="calculator__selector selector" ref={details}>
            <summary className="selector__summary">
              <input className="selector__option-input" type="radio" name="creditTarget" id="default" title="Выберите цель кредита" tabIndex="-1" defaultChecked onClick={handleSelectorClick} />

              <input className="selector__option-input" type="radio" name="creditTarget" id="item1" tabIndex="-1" title={LoanType.MORTGAGE} onClick={handleSelectorClick} />

              <input className="selector__option-input" type="radio" name="creditTarget" id="item2" tabIndex="-1" title={LoanType.CAR_LENDING} onClick={handleSelectorClick} />
            </summary>

            <ul className="selector__options list">
              <li className="selector__option">
                <label className="selector__label" htmlFor="item1" tabIndex="0">Ипотечное кредитование</label>
              </li>

              <li className="selector__option">
                <label className="selector__label" htmlFor="item2" tabIndex="0">Автомобильное кредитование</label>
              </li>
            </ul>
          </details>
        </fieldset>
        {data.creditTarget ?
          <>
            <fieldset className="calculator__fieldset calculator__fieldset--second-step">
              <legend className="calculator__legend calculator__legend--second-step">Шаг 2. Введите параметры кредита</legend>

              <label className="calculator__label" htmlFor="propertyValue">
                {data.creditTarget === LoanType.MORTGAGE && 'Стоимость недвижимости'}
                {data.creditTarget === LoanType.CAR_LENDING && 'Стоимость автомобиля'}
              </label>
              <div className="calculator__input-wrapper">
                <button className="calculator__button-minus button" type="button" onClick={handlePropertyValueMinus}>Минус</button>

                <input className={inputError ? 'calculator__input calculator__input--error' : 'calculator__input'} ref={propertyValue} type="text" id="propertyValue" defaultValue="2 000 000 рублей" onChange={handlePropertyValueType} />

                {inputError ? <span className="calculator__error">Некорректное значение</span> : ''}

                <button className="calculator__button-plus button" type="button" onClick={handlePropertyValuePlus}>Плюс</button>
              </div>

              {data.creditTarget === LoanType.MORTGAGE && <p className="calculator__prompt">От {getNumberWithSpaces(Mortgage.MIN)} &nbsp;до {getNumberWithSpaces(Mortgage.MAX)} рублей</p>}
              {data.creditTarget === LoanType.CAR_LENDING && <p className="calculator__prompt">От {getNumberWithSpaces(CarLending.MIN)} &nbsp;до {getNumberWithSpaces(CarLending.MAX)} рублей</p>}


              <label className="calculator__label calculator__label--initial-fee" htmlFor="initialFee">Первоначальный взнос</label>
              <div className="calculator__input-wrapper">
                <input className="calculator__input" ref={initialFee} type="text" id="initialFee" defaultValue={`${getNumberWithSpaces(data.propertyValue / setting.minInitialFee)} рублей`} onChange={handleInitialFeeType} />
              </div>

              <input className="calculator__range" id="initialFeeRange" ref={initialFeeRange} type="range" min={100 / setting.minInitialFee} max="100" step="5" defaultValue={100 / setting.minInitialFee} onChange={handleInitialFeeChange} />
              <label htmlFor="initialFeeRange" className="calculator__range-text">{100 / setting.minInitialFee}%</label>

              <label className="calculator__label calculator__label--loan-terms" htmlFor="loanTerms">Срок кредитования</label>
              <div className="calculator__input-wrapper">
                <input className="calculator__input calculator__input--loan-terms" ref={loanTerms} type="text" id="loanTerms" defaultValue="5 лет" onChange={handleLoanTermsType} />
              </div>

              <input className="calculator__range calculator__range--loan-terms" id="loanTermsRange" ref={loanTermsRange} type="range" min={setting.minTerm} max={setting.maxTerm} step="1" defaultValue="5" onChange={handleLoanTermsChange} />
              <label htmlFor="loanTermsRange" className="calculator__range-text">{setting.minTerm === 1 ? `${setting.minTerm} год` : `${setting.minTerm} лет`}</label>
              <label htmlFor="loanTermsRange" className="calculator__range-text calculator__range-text--max">{setting.maxTerm} лет</label>

              {data.creditTarget === LoanType.MORTGAGE &&
              <>
                <input className="visually-hidden calculator__checkbox" type="checkbox" id="maternityCapital" checked={data.maternityCapital} onChange={handleMaternityCapitalClick}/>
                <label className="calculator__label calculator__label--checkbox" htmlFor="maternityCapital">Использовать материнский капитал</label>
              </>}

              {data.creditTarget === LoanType.CAR_LENDING &&
              <>
                <input className="visually-hidden calculator__checkbox" type="checkbox" id="casco" checked={data.casco} onChange={handleCascoClick}/>
                <label className="calculator__label calculator__label--checkbox" htmlFor="casco">Оформить КАСКО в нашем банке</label>

                <input className="visually-hidden calculator__checkbox" type="checkbox" id="lifeInsurance" checked={data.lifeInsurance} onChange={handleLifeInsuranceClick}/>
                <label className="calculator__label calculator__label--checkbox" htmlFor="lifeInsurance">Оформить Страхование жизни в нашем банке</label>
              </>}
            </fieldset>

            {data.sum < setting.minSum ?
              <div className="calculator__offer calculator__offer--error offer">
                <p className="offer__header offer__header--error">
                  Наш банк не выдаёт
                  {data.creditTarget === LoanType.MORTGAGE && ' ипотечные кредиты меньше 500 000 рублей.'}
                  {data.creditTarget === LoanType.CAR_LENDING && ' автокредиты меньше 200 000 рублей.' }
                </p>
                <p className="offer__text offer__text--error">Попробуйте использовать другие параметры для расчёта. </p>
              </div> :

              <div className="calculator__offer offer">
                <p className="offer__header">Наше предложение</p>

                <div className="offer__wrapper">
                  <p className="offer__number">{getNumberWithSpaces(data.sum)} рублей </p>
                  <p className="offer__text">Сумма ипотеки </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">
                    {data.interestRate === MountlyInterestRate.HIGHEST && '16,00%'}
                    {data.interestRate === MountlyInterestRate.HIGH && '15,00%'}
                    {data.interestRate === MountlyInterestRate.MIDDLE && '9,40%'}
                    {data.interestRate === MountlyInterestRate.LOW && '8,50%'}
                    {data.interestRate === MountlyInterestRate.LOWEST && '3,50%'}
                  </p>
                  <p className="offer__text">Процентная ставка </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">{getNumberWithSpaces(data.monthlyPayment)} рублей </p>
                  <p className="offer__text">Ежемесячный платеж </p>
                </div>

                <div className="offer__wrapper">
                  <p className="offer__number">{getNumberWithSpaces(Math.round(data.monthlyPayment / PERCENTAGE_INCOME * 100))} рублей </p>
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

                <span className="calculator__data-value">№ {data.id}</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Цель кредита</span>

                <span className="calculator__data-value">
                  {data.creditTarget === LoanType.MORTGAGE && 'Ипотека'}
                  {data.creditTarget === LoanType.CAR_LENDING && 'Автокредит'}
                </span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">
                  {data.creditTarget === LoanType.MORTGAGE && 'Стоимость недвижимости'}
                  {data.creditTarget === LoanType.CAR_LENDING && 'Стоимость автомобиля'}
                </span>

                <span className="calculator__data-value">{getNumberWithSpaces(data.propertyValue)} рублей</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Первоначальный взнос</span>

                <span className="calculator__data-value">{getNumberWithSpaces(data.initialFee)} рублей</span>
              </li>
              <li className="calculator__data-item">
                <span className="calculator__data-header">Срок кредитования</span>

                <span className="calculator__data-value">{data.loanTerms} лет</span>
              </li>
            </ul>

            <input className="calculator__input calculator__input--full-name" type="text" ref={userFullName} placeholder="ФИО" autoFocus required/>

            <input className="calculator__input calculator__input--user-phone" type="tel" ref={userPhoneNumber} onChange={handleUserPhoneNumberType} placeholder="Телефон" required/>

            <input className="calculator__input calculator__input--user-email" type="email" ref={userEmail} placeholder="E-mail" required/>

            <button className="calculator__submit button" type="submit">Отправить</button>
          </fieldset>
          : ''}
      </form>

      {popupShown && <ThanksPopup onCloseClick={handlePopupClose} />}
    </section>
  );
}

export default Calculator;
