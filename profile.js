document.addEventListener("DOMContentLoaded", function () {
    // Extract the unique ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const animalID = urlParams.get("id");

    if (!animalID) {
        document.body.innerHTML = "<p>Animal profile not found!</p>";
        return;
    }

    // Fetch the animal data from localStorage
    const animalData = JSON.parse(localStorage.getItem(animalID));

    if (!animalData) {
        document.body.innerHTML = "<p>Animal profile not found!</p>";
        return;
    }

    // Populate the profile details
    document.querySelector("#animal-name").textContent = animalData.name || "Unnamed Animal";
    document.querySelector("#animal-breed").textContent = animalData.breed || "Unknown Breed";
    document.querySelector("#animal-age").textContent = animalData.age || "Unknown Age";
    document.querySelector("#animal-location").textContent = animalData.location || "Unknown Location";
    document.querySelector("#animal-image").src = animalData.image || "images/default-placeholder.png";

    // Add custom fields if applicable (optional or customizable):
    document.querySelector("#animal-about").textContent =
        animalData.about || `Meet ${animalData.name}, a wonderful companion looking for a forever home.`;
    document.querySelector("#animal-personality").textContent =
        animalData.personality || `${animalData.name} is affectionate, playful, and eager to please.`;
    document.querySelector("#animal-health").textContent =
        animalData.health || `${animalData.name} is vaccinated, healthy, and ready for adoption.`;
});
