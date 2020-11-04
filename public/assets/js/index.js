const savedButton = document.querySelector(".saved-button");

savedButton.addEventListener("click", () => {
	window.location.hash = "#favorite";
	window.location.reload();
});
