function initMap() {
  var bourgogne = {lat: 47.052, lng: 4.383};

  var mapOptions = {
    zoom: 8,
    center: bourgogne,
    disableDefaultUI: true
  }

  var map = new google.maps.Map(document.getElementById('googlemap'), mapOptions);

  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map
  // });
}