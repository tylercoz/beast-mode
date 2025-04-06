async function initMap() {
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
          image.src = "you_are_here.png";
          image.width = 75;
          image.height = 75;
          const { AdvancedMarkerElement } =
            await google.maps.importLibrary("marker");
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
  let map = new Map(document.getElementById("map"), options);

  $(document).ready(function () {
    $("#beastModeToggle").on("change", function () {
      if ($(this).is(":checked")) {
        getCurrentLocation(map);
      } else {
        // TODO stinky image?
      }
    });
  });
}
