import { calculateBearing, encodeMorse, getAuthToken, getCompassBearing } from "$utils/utils";

// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
    // window.addEventListener("deviceorientation", handleOrientation, true);
    // const watchID = navigator.geolocation.watchPosition(success, error, options);
    updateMorseCode();
    handleForm();
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

const updateMorseCode = () => {
    const morseCode = document.querySelector<HTMLTextAreaElement>('[data-element="morse-code"]');
    if (!morseCode) return;

    const coordinates = '37.77638635179675, -122.42423022825709'
    const message = "SOS. INVESTIGATION NEARLY COMPLETE. THEY'RE ON TO ME. NEED YOUR HELP ONE LAST TIME. " + coordinates;
    const encodedMessage = encodeMorse(message) || '';

    console.log(message, encodedMessage)
    
    morseCode.textContent = encodedMessage;
} 

const handleForm = () => {
    const form = document.querySelector<HTMLFormElement>('[data-element="answer-form"]');
    const answerInput = document.querySelector<HTMLInputElement>('[data-element="answer-field"]');
    const successMessage = document.querySelector<HTMLDivElement>('[data-element="success-message"]');
    const errorMessage = document.querySelector<HTMLDivElement>('[data-element="error-message"]');

    if (!form || !answerInput || !successMessage || !errorMessage) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const submission = answerInput.value;
        const answer = "06291776"
        
        if (submission === answer) {
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    })

   answerInput.addEventListener('change', () => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    })
}