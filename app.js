console.log("Hello, Node.js!");

function initMap() {
  // Map options
  const options = {
    zoom: 15,
    center: { lat: 44.5648, lng: -123.276 }, // Corvallis Cords
  };

  // New map
  const map = new google.maps.Map(document.getElementById("map"), options);

  // Get current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);

        // Add marker for current location
        new google.maps.Marker({
          position: pos,
          map: map,
          title: "Current Location",
        });
      },
      () => {
        // TODO Do Something
      },
    );
  }
}
