export class Location {

  static setZip(zip) {
    let locationObj = {
      lat: null,
      long: null,
      zip: zip
    };
    localStorage.setItem('location', locationObj)
  }

  static setCurrentLocation(location) {
    if (!!location.zipcode) {

    }
    if(!!location.lat && !!location.long) {

    }
  }

  static getCurrentLocation() {
    localStorage.getItem('weatherData');
  }
}