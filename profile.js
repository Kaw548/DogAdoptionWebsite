document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animalName = urlParams.get("id");

    if (!animalName) {
        document.body.innerHTML = "<p>Animal profile not found!</p>";
        return;
    }

    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const animalData = postedAnimals.find(animal => animal.name === animalName);

    if (!animalData) {
        document.body.innerHTML = "<p>Animal profile not found!</p>";
        return;
    }

    // Populate the profile details
    document.getElementById("animal-name").textContent = animalData.name || "Unnamed Animal";
    document.getElementById("animal-breed").textContent = animalData.breed || "Unknown Breed";
    document.getElementById("animal-age").textContent = animalData.age || "Unknown Age";
    document.getElementById("animal-location").textContent = animalData.location || "Unknown Location";
    document.getElementById("animal-about").textContent = animalData.about || "No details available.";
    document.getElementById("animal-personality").textContent = animalData.personality || "No details available.";
    document.getElementById("animal-health").textContent = animalData.health || "No health information available.";
    document.getElementById("animal-image").src = animalData.image || "images/default-placeholder.png";
});
