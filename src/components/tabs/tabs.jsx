import React, {useState} from 'react';

import ContributionsTab from './tabs/contributions-tab/contributions-tab';
import CreditsTab from './tabs/credits-tab/credits-tab';
import InsuranceTab from './tabs/insurance-tab/insurance-tab';
import OnlineServicesTab from './tabs/online-services-tab/online-services-tab';

import {Tab} from '../../const';

function Tabs() {
  const [activeTab, setActiveTab] = useState(Tab.CONTRIBUTIONS.name);
  const tabs = Object.values(Tab);

  const handleMouseClick = (evt) => {
    evt.preventDefault();

    if (!evt.target.innerText) {
      setActiveTab(evt.target.parentNode.parentNode.innerText);

      return;
    }

    setActiveTab(evt.target.innerText);
  };

  return (
    <section className="tabs container">
      <h2 className="visually-hidden">Вкладки</h2>

      <ul className="tabs__list list">
        {tabs.map((tab) => (
          <li key={tab.name} className="tabs__item">
            <a href="/" className={`tabs__link link ${tab.name === activeTab ? 'tabs__link--active' : ''}`} onClick={handleMouseClick}>
              <svg className={`tabs__icon tabs__icon-${tab.icon} ${tab.name === activeTab ? 'tabs__icon--active' : ''}`}>
                <use xlinkHref={`#${tab.icon}`}></use>
              </svg>
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
      {activeTab === Tab.CONTRIBUTIONS.name && <ContributionsTab />}
      {activeTab === Tab.CREDITS.name && <CreditsTab />}
      {activeTab === Tab.INSURANCE.name && <InsuranceTab />}
      {activeTab === Tab.ONLINE_SERVICES.name && <OnlineServicesTab />}
    </section>
  );

}

export default Tabs;
