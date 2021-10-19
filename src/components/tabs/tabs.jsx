import React, {useState} from 'react';

import ContributionsTab from './tabs/contributions-tab/contributions-tab';
import CreditsTab from './tabs/credits-tab/credits-tab';
import InsuranceTab from './tabs/insurance-tab/insurance-tab';
import OnlineServicesTab from './tabs/online-services-tab/online-services-tab';

import {Tab} from '../../const';

function Tabs() {
  const [activeTab, setActiveTab] = useState(Tab.CONTRIBUTIONS.id);
  const [touchCoordinates, setTouchCoordinates] = useState({
    x1: 0,
    y1: 0,
  });

  const tabs = Object.values(Tab);

  const handleMouseClick = (evt) => {
    evt.preventDefault();

    if (evt.target.localName === 'use') {
      setActiveTab(parseInt(evt.target.parentNode.parentNode.id, 10));

      return;
    }

    if (evt.target.localName === 'svg') {
      setActiveTab(parseInt(evt.target.parentNode.id, 10));

      return;
    }
    setActiveTab(parseInt(evt.target.id, 10));
  };

  const handleSliderTouchStart = (evt) => {
    const touch = evt.touches[0];

    setTouchCoordinates({
      ...touchCoordinates,
      x1: touch.clientX,
      y1: touch.clientY,
    });
  };

  const handleSliderTouchMove = (evt) => {
    const move = evt.changedTouches[0];
    const x2 = move.clientX;
    const y2 = move.clientY;
    const xDiff = x2 - touchCoordinates.x1;
    const yDiff = y2 - touchCoordinates.y1;

    if (x2 === touchCoordinates.x1 || y2 === touchCoordinates.y1 || Math.abs(yDiff) > Math.abs(xDiff)) {
      return;
    }

    if (xDiff > 0) {
      if (activeTab === Tab.CONTRIBUTIONS.id) {
        setActiveTab(Tab.ONLINE_SERVICES.id);

        return;
      }
      setActiveTab(activeTab - 1);

      return;
    }

    if (xDiff < 0) {
      if (activeTab === Tab.ONLINE_SERVICES.id) {
        setActiveTab(Tab.CONTRIBUTIONS.id);

        return;
      }
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <section className="tabs container" onTouchStart={handleSliderTouchStart} onTouchEnd={handleSliderTouchMove}>
      <h2 className="visually-hidden">Вкладки</h2>

      <ul className="tabs__list list">
        {tabs.map((tab) => (
          <li key={tab.name} className="tabs__item">
            <a href="/" className={`tabs__link link ${tab.id === activeTab ? 'tabs__link--active' : ''}`} id={tab.id} onClick={handleMouseClick}>
              <svg className={`tabs__icon tabs__icon-${tab.icon} ${tab.id === activeTab ? 'tabs__icon--active' : ''}`}>
                <use xlinkHref={`#${tab.icon}`}></use>
              </svg>
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      {activeTab === Tab.CONTRIBUTIONS.id && <ContributionsTab />}
      {activeTab === Tab.CREDITS.id && <CreditsTab />}
      {activeTab === Tab.INSURANCE.id && <InsuranceTab />}
      {activeTab === Tab.ONLINE_SERVICES.id && <OnlineServicesTab />}
    </section>
  );

}

export default Tabs;
