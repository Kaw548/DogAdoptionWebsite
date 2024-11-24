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
    document.querySelector("#animal-image").src = animalData.image;
    document.querySelector("#animal-name").textContent = animalData.name;
    document.querySelector("#animal-location").textContent = animalData.location;
    document.querySelector("#animal-breed").textContent = animalData.breed;
    document.querySelector("#animal-age").textContent = animalData.age;
    document.querySelector("#animal-type").textContent = animalData.type;
});
