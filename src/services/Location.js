export class Location {

  static setZip(zip) {
    let locationObj = {
      zip: zip
    };
    localStorage.setItem('location', JSON.stringify(locationObj))
  }

  static setLatLong(lat, long) {
    let locationObj = {
      lat: lat,
      long: long
    };
    localStorage.setItem('location', JSON.stringify(locationObj))
  }

  static setCurrentLocation(location) {
    if (!!location.zipcode) {
      return true;
    }
    if(!!location.lat && !!location.long) {

    }
  }

  static hasCurrentLocation() {
    return !!localStorage.getItem('location');
  }

  static getCurrentLocation() {
    return JSON.parse(localStorage.getItem('location'));
  }
}