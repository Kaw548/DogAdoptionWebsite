// Function to save a new animal under "Saved Animals"
function saveAnimalToStorage(animal) {
    const savedAnimals = JSON.parse(localStorage.getItem("savedAnimals")) || [];

    // Check if the animal is already saved
    if (savedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your saved list!`);
        return;
    }

    // Add to saved animals
    savedAnimals.push(animal);
    localStorage.setItem("savedAnimals", JSON.stringify(savedAnimals));
    alert(`${animal.name} has been added to your saved animals!`);

    // Re-render saved animals (if on the user profile page)
    renderSavedAnimals();
}

// Function to save a new animal under "Posted Animals"
function savePostedAnimal(animal) {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];

    // Check if the animal is already posted
    if (postedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your posted list!`);
        return;
    }

    // Add to posted animals
    postedAnimals.push(animal);
    localStorage.setItem("postedAnimals", JSON.stringify(postedAnimals));
    alert(`${animal.name} has been posted successfully!`);

    // Re-render posted animals (if on the user profile page)
    renderPostedAnimals();
}

// Render saved animals on the user profile page
function renderSavedAnimals() {
    const savedAnimals = JSON.parse(localStorage.getItem("savedAnimals")) || [];
    const savedAnimalsGrid = document.querySelector(".saved-animals-grid");

    // Clear the container
    savedAnimalsGrid.innerHTML = "";

    if (savedAnimals.length === 0) {
        savedAnimalsGrid.innerHTML = "<p>No animals have been saved yet.</p>";
        return;
    }

    // Render each saved animal
    savedAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("saved-animal-card");
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="profile-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button class="remove-button" onclick="removeSavedAnimal('${animal.name}')">Remove</button>
        `;
        savedAnimalsGrid.appendChild(card);
    });
}

// Render posted animals on the user profile page
function renderPostedAnimals() {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const postedAnimalsGrid = document.querySelector(".posted-animals-grid");

    // Clear the container
    postedAnimalsGrid.innerHTML = "";

    if (postedAnimals.length === 0) {
        postedAnimalsGrid.innerHTML = "<p>No animals have been posted yet.</p>";
        return;
    }

    // Render each posted animal
    postedAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("posted-animal-card");
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="profile-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button class="remove-button" onclick="removePostedAnimal('${animal.name}')">Remove</button>
        `;
        postedAnimalsGrid.appendChild(card);
    });
}

// Render posted animals dynamically on the index page
function loadPostedAnimalsToIndex() {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const profilesGrid = document.querySelector(".profiles-grid");

    // Clear dynamically added animals to prevent duplicates
    const dynamicCards = profilesGrid.querySelectorAll(".dynamic-animal-card");
    dynamicCards.forEach(card => card.remove());

    // Render each posted animal
    postedAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("profile-card", "dynamic-animal-card");
        card.innerHTML = `
            <a href="#" class="animal-link">
                <img src="${animal.image}" alt="${animal.name}" class="profile-image">
                <h2>${animal.name}</h2>
            </a>
            <p>${animal.location}</p>
            <button onclick="saveAnimalToStorage(${JSON.stringify(animal)})" class="save-button">Save ${animal.name}</button>
        `;
        profilesGrid.appendChild(card);
    });
}

// Remove a saved animal
function removeSavedAnimal(name) {
    let savedAnimals = JSON.parse(localStorage.getItem("savedAnimals")) || [];
    savedAnimals = savedAnimals.filter(animal => animal.name !== name);
    localStorage.setItem("savedAnimals", JSON.stringify(savedAnimals));
    renderSavedAnimals();
}

// Remove a posted animal
function removePostedAnimal(name) {
    let postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    postedAnimals = postedAnimals.filter(animal => animal.name !== name);
    localStorage.setItem("postedAnimals", JSON.stringify(postedAnimals));
    renderPostedAnimals();
    loadPostedAnimalsToIndex(); // Update index page dynamically
}

// Initialize page content on DOM load
document.addEventListener("DOMContentLoaded", function () {
    renderSavedAnimals(); // User profile page
    renderPostedAnimals(); // User profile page
    loadPostedAnimalsToIndex(); // Index page
});
