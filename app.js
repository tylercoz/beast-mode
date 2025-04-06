async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  async function addLocations(map) {
    try {
      const response = await fetch("./showers.json");
      const data = await response.json();

      for (let id in data) {
        const shower = data[id];
        const marker = new AdvancedMarkerElement({
          position: { lat: shower.lat, lng: shower.lng },
          map: map,
          title: shower.name,
        });

        // Create Google Maps Directions URL
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${shower.lat},${shower.lng}`;

        // Create info window content
        const contentString = `
      <div class="info-window">
        <h3>${shower.name}</h3>
        <p><a href="${mapsUrl}" target="_blank">Get Directions</a></p>
      </div>
    `;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });

        // Add click listener to marker
        marker.addListener("click", () => {
          infoWindow.close(); // Close any open info windows
          infoWindow.open({
            anchor: marker,
            map,
          });
        });

        // Close info window when clicking elsewhere on the map
        map.addListener("click", () => {
          infoWindow.close();
        });
      }
    } catch (error) {
      console.error("Error loading shower locations:", error);
    }
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
          map.setZoom(17);

          const image = document.createElement("img");
          image.src = "data/you_are_here.png";
          image.width = 80;
          image.height = 80;

          const userMarker = new AdvancedMarkerElement({
            position: pos,
            map: map,
            title: "You Are Here",
            content: image,
          });

          // Create Google Maps Directions URL for user location
          const userMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pos.lat},${pos.lng}`;

          // Add info window for user location
          const userInfoWindow = new google.maps.InfoWindow({
            content: `
          <h3>Your Location</h3>
        `,
          });

          userMarker.addListener("click", () => {
            userInfoWindow.open({
              anchor: userMarker,
              map,
            });
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Handle geolocation error
        },
      );
    }
  }

  // Map options
  const options = {
    zoom: 15,
    center: { lat: 44.5648, lng: -123.276 }, // Corvallis Coords
    mapId: "map_id",
  };

  // New map
  let map = new Map(document.getElementById("map"), options);

  // Add some basic controls to the map
  map.setOptions({
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true,
  });

  $(document).ready(function () {
    $("#beastModeToggle").on("change", function () {
      if ($(this).is(":checked")) {
        getCurrentLocation(map);
        addLocations(map);
      } else {
        // Clear markers and reset map
        map.setCenter({ lat: 44.5648, lng: -123.276 });
        map.setZoom(15);
      }
    });
  });
}
