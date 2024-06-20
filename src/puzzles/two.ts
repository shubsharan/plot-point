// Initialize Webflow
window.Webflow ||= [];
window.Webflow.push(async () => {
    handleForms();
});

const handleForms = () => {
    const form_1 = document.querySelector<HTMLFormElement>('[data-element="form-1"]');
    const answerInput = document.querySelector<HTMLInputElement>('[data-element="answer-field"]');
    const successMessage = document.querySelector<HTMLDivElement>('[data-element="success-message"]');
    const errorMessage = document.querySelector<HTMLDivElement>('[data-element="error-message"]');

    if (!form_1 || !answerInput || !successMessage || !errorMessage) return;

    form_1.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const submission = answerInput.value.toUpperCase();
        const answer = "IT TAKES TWO TO TANGO"
        
        if (submission === answer) {
            const form_2 = document.querySelector<HTMLFormElement>('[data-element="form-2"]');
            if (!form_2) return;
            form_2.removeAttribute('data-cloak');
            form_1.setAttribute('data-cloak', '');
           handleForm_2();
        } else {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    })

   answerInput.addEventListener('change', () => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    })

    const handleForm_2 = () => {
        const form_2 = document.querySelector<HTMLFormElement>('[data-element="form-2"]');
        if (!form_2) return;
        const field_1 = form_2.querySelector<HTMLInputElement>('[data-element="field-1"]');
        const field_2 = form_2.querySelector<HTMLInputElement>('[data-element="field-2"]');
        const field_3 = form_2.querySelector<HTMLInputElement>('[data-element="field-3"]');
        const field_4 = form_2.querySelector<HTMLInputElement>('[data-element="field-4"]');
        const successMessage = form_2.querySelector<HTMLDivElement>('[data-element="success-message"]');
        const errorMessage = form_2.querySelector<HTMLDivElement>('[data-element="error-message"]');

        if (!field_1 || !field_2 || !field_3 || !field_4 || !successMessage || !errorMessage) return;

        const field_1_answer = "8"; // white
        const field_2_answer = "8"; // yellow
        const field_3_answer = "8"; // red
        const field_4_answer = "8"; // purple

        form_2.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const submission_1 = field_1.value;
            const submission_2 = field_2.value;
            const submission_3 = field_3.value;
            const submission_4 = field_4.value;

            if (submission_1 === field_1_answer && submission_2 === field_2_answer && submission_3 === field_3_answer && submission_4 === field_4_answer) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        })
    }
}
