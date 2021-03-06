import React from 'react';

function Map() {

  return(
    <section className="map container" id="map">
      <h2 className="map__header">Отделения Лига Банка</h2>

      <picture>
        <source media="(max-width: 767px)" srcSet="/img/map-mobile.png" />
        <source media="(max-width: 1023px)" srcSet="/img/map-tablet.png" />
        <img className="map__img" src="/img/map.png" alt="Карта" width="1169" height="462"/>
      </picture>
    </section>
  );
}

export default Map;
