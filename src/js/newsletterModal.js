export default class NewsLetterModal {
    constructor() {}

    // ***** Landing page modal *****
    newsletterModal() {
        const body = document.querySelector('body');
        const modal = document.querySelector('#mainModal');
        const modalBtn = document.querySelector('#modalBtn');
        const closeModal = document.querySelector('.close');
        const subscribeBtn = document.querySelector('.modal-btn');

        if (body.contains(modal)) {
            modalBtn.addEventListener('click', () => {
                modal.style.display = "block";
            }); 
            
            closeModal.addEventListener('click', () => {
                modal.style.display = "none";
            }); 
        
            subscribeBtn.addEventListener('click', () => {
                modal.style.display = "none";
            }); 
            
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }); 
        }
    }
}