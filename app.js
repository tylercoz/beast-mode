
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

function deselect(e) {
  $('.pop').slideFadeToggle(function() {
    e.removeClass('selected');
  });    
}

$(document).ready(function () {
  // Use jQuery selectors instead of vanilla JS
  const $openModalButtons = $('[data-modal-target]');
  const $closeModalButtons = $('[data-close-button]');
  const $overlay = $('#overlay'); // Now properly waits for DOM

  // Modal open/close logic
  $openModalButtons.on('click', function () {
    const modalSelector = $(this).data('modal-target');
    const $modal = $(modalSelector);
    openModal($modal);
  });

  $overlay.on('click', function () {
    $('.modal.active').each(function () {
      closeModal($(this));
    });
  });

  $closeModalButtons.on('click', function () {
    const $modal = $(this).closest('.modal');
    closeModal($modal);
  });

  // Beast Mode Toggle (unchanged)
  $("#beastModeToggle").on("change", function () {
    if ($(this).is(":checked")) {
      getCurrentLocation(map);
    } else {
      // TODO: Handle toggle off
    }
  });
});

// Modal functions (updated for jQuery)
function openModal($modal) {
  if (!$modal || $modal.length === 0) return;
  $modal.addClass('active');
  $('#overlay').addClass('active');
}

function closeModal($modal) {
  if (!$modal || $modal.length === 0) return;
  $modal.removeClass('active');
  $('#overlay').removeClass('active');
}