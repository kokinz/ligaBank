import React, {useState, useEffect} from 'react';
import {DESKTOP_WIDTH, Slide, SLIDE_DELAY} from '../../const';


function Promo() {
  const [activeSlide, setActiveSlide] = useState(Slide.CREDIT);
  const [timeoutID, setTimeoutID] = useState(null);
  const [touchCoordinates, setTouchCoordinates] = useState({
    x1: 0,
    y1: 0,
  });

  // useEffect(() => {
  //   if (timeoutID === null) {
  //     setTimeoutID(
  //       setTimeout(() => {
  //         setActiveSlide(activeSlide === Slide.BRANCH ? Slide.CREDIT : activeSlide + 1);
  //         setTimeoutID(null);
  //       }, SLIDE_DELAY),
  //     );
  //   }
  // }, [activeSlide, timeoutID]);

  const handleSliderTouchStart = (evt) => {
    const touch = evt.touches[0];

    setTouchCoordinates({
      ...touchCoordinates,
      x1: touch.clientX,
      y1: touch.clientY,
    });
  };

  const handleSliderTouchMove = (evt) => {
    if (document.body.clientWidth >= DESKTOP_WIDTH) {
      return;
    }

    const move = evt.changedTouches[0];
    const x2 = move.clientX;
    const y2 = move.clientY;
    const xDiff = x2 - touchCoordinates.x1;
    const yDiff = y2 - touchCoordinates.y1;

    if (x2 === touchCoordinates.x1 || y2 === touchCoordinates.y1 || Math.abs(yDiff) > Math.abs(xDiff)) {
      return;
    }

    if (xDiff > 0) {
      if (activeSlide === Slide.CREDIT) {
        setActiveSlide(Slide.BRANCH);

        return;
      }
      setActiveSlide(activeSlide - 1);
    }

    if (xDiff < 0) {
      if (activeSlide === Slide.BRANCH) {
        setActiveSlide(Slide.CREDIT);

        return;
      }
      setActiveSlide(activeSlide + 1);
    }

    clearTimeout(timeoutID);
    setTimeoutID(null);
  };

  return(
    <section className="promo">
      <ul className="promo__slider slider list" onTouchStart={handleSliderTouchStart} onTouchEnd={handleSliderTouchMove}>
        <li className={`slider__item slider__item--credit ${activeSlide === Slide.CREDIT ? 'slider__item--show' : ''} container`}>
          <h2 className="promo__header">Лига Банк</h2>

          <p className="promo__description">Кредиты на любой случай</p>

          <a href="#creditCalculator" className="promo__link link button">Рассчитать кредит</a>
        </li>
        <li className={`slider__item slider__item--confidence ${activeSlide === Slide.CONFIDENCE ? 'slider__item--show' : ''} container`}>
          <h2 className="promo__header promo__header--confidence">Лига Банк</h2>

          <p className="promo__description promo__description--confidence">Ваша уверенность в завтрашнем дне</p>
        </li>
        <li className={`slider__item slider__item--branch ${activeSlide === Slide.BRANCH ? 'slider__item--show' : ''} container`}>
          <h2 className="promo__header promo__header--branch">Лига Банк</h2>

          <p className="promo__description promo__description--branch">Всегда рядом</p>

          <a href="#map" className="promo__link promo__link--branch link button">Найти отделение</a>
        </li>
      </ul>
      <ul className="promo__slider-controls list">
        <li className={`promo__slider-control ${activeSlide === Slide.CREDIT ? 'promo__slider-control--active' : ''}`}></li>
        <li className={`promo__slider-control ${activeSlide === Slide.CONFIDENCE ? 'promo__slider-control--active' : ''}`}></li>
        <li className={`promo__slider-control promo__slider-control--branch ${activeSlide === Slide.BRANCH ? 'promo__slider-control--active' : ''}`}></li>
      </ul>
    </section>
  );
}

export default Promo;
