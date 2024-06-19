import { calculateBearing, getAuthToken, getCompassBearing } from "$utils/utils";

// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
    window.addEventListener("deviceorientation", handleOrientation, true);
    const watchID = navigator.geolocation.watchPosition(success, error, options);
  
});

const success = (position: GeolocationPosition) => {
    const user = {latitude: position.coords.latitude , longitude: position.coords.longitude};
    const destination = {latitude: 37.753823, longitude: -122.399713};
    const bearing = calculateBearing(user.latitude, user.longitude, destination.latitude, destination.longitude);
    console.log('Bearing: ', bearing);
}

const error = () => {
    alert("Sorry, no position available.");
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
};

const handleOrientation = (event: DeviceOrientationEvent) => {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    if (!absolute || !alpha || !beta || !gamma) return;

    alert(getCompassBearing(alpha, beta, gamma));
  
    // Do stuff with the new orientation data
  }


// function success(position) {
//     doSomething(position.coords.latitude, position.coords.longitude);
//   }
  
//   function error() {
//     alert("Sorry, no position available.");
//   }
  
//   const options = {
//     enableHighAccuracy: true,
//     maximumAge: 30000,
//     timeout: 27000,
//   };
  
//   const watchID = navigator.geolocation.watchPosition(success, error, options);