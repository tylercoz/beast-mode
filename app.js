console.log("Hello, Node.js!");

function initMap() {
  // Map options
  const options = {
    zoom: 8,
    center: { lat: 40.7128, lng: -74.006 }, // New York coordinates
  };

  // New map
  const map = new google.maps.Map(document.getElementById("map"), options);
}
