const savedButton = document.querySelector('.saved-button');

savedButton.addEventListener('click', () => {
    window.location.hash = '#saved';
    window.location.reload();
});