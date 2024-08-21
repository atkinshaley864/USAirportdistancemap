// Airports
fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/airports.json')
  .then(response => response.json())
  .then(airports => {
    // No slicing or filtering, so all airports are included

    var i = airports.length, d, proj;

    while (i--) {
      d = airports[i];
      proj = this.projection([d.Lng, d.Lat]);

      if (proj) {
        d.x = proj[0];
        d.y = proj[1];
      } else {
        airports.splice(i, 1);  // Remove airports that can't be projected
      }
    }

    this.airports = airports.reverse();

    var la = null;

    this.markers.forEach(marker => {
      var ra = this.randomAirport();
      if (ra == la) { ra = this.randomAirport(); }
      la = ra;
      marker.airport = ra;
      marker.x = ra.x;
      marker.y = ra.y;
    });
    this.markerDistance();
  });
