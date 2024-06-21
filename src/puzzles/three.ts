// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
    handleSubmission();
});

const handleSubmission = () => {
    const form = document.querySelector<HTMLFormElement>('[data-element="form"]');
    const answerInput = document.querySelector<HTMLInputElement>('[data-element="answer-field"]');
    const successMessage = document.querySelector<HTMLDivElement>('[data-element="success-message"]');
    const errorMessage = document.querySelector<HTMLDivElement>('[data-element="error-message"]');

    if (!form || !answerInput || !successMessage || !errorMessage) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const submission = answerInput.value.toUpperCase();
        const answer = "MARK TWAIN"
        
        if (submission === answer) {
            const hint = document.querySelector<HTMLDivElement>('[data-element="hint"]');
            if (!hint) return;

            hint.removeAttribute('data-cloak');
            form.setAttribute('data-cloak', '');
        } else {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    })
}
