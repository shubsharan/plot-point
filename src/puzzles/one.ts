// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
    handleForm();
});

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