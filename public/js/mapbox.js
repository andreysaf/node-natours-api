export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5kcmV5c2FmIiwiYSI6ImNrZnU5NnQ3czBoMDYydXM5bHQ5eHNzbTkifQ.NjBluBnts4BNfvf690OZmQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/andreysaf/ckfuaffhr1pj619rnu2e7j9o7',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    new mapboxgl.Popup()
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
