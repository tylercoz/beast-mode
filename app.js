async function initMap() {
  function addLocations() {
    new AdvancedMarkerElement({
      position: { lat: 44.5668, lng: -123.2818 },
      map: map,
      title: "You Are Here",
    });
  }

  function getCurrentLocation(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);

          const image = document.createElement("img");
          image.src = "data/you_are_here.png";
          image.width = 75;
          image.height = 75;
          new AdvancedMarkerElement({
            position: pos,
            map: map,
            title: "You Are Here",
            content: image,
          });
        },
        () => {
          // TODO stinky image?
        },
      );
    }
  }
  // Map options
  const options = {
    zoom: 15,
    center: { lat: 44.5648, lng: -123.276 }, // Corvallis Cords
    mapId: "map_id",
  };

  // New map
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  let map = new Map(document.getElementById("map"), options);

  $(document).ready(function () {
    $("#beastModeToggle").on("change", function () {
      if ($(this).is(":checked")) {
        getCurrentLocation(map);
        addLocations(map);
      } else {
        // TODO stinky image?
      }
    });
  });
}
