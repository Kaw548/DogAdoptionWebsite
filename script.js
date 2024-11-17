// Placeholder image for missing or invalid image URLs
const placeholderImage = "images/default-placeholder.png"; // Ensure this path is correct

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

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
    if (document.querySelector(".saved-animals-grid")) {
        renderSavedAnimals();
    }
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
    if (document.querySelector(".posted-animals-grid")) {
        renderPostedAnimals();
    }

    // Update the index page dynamically
    if (document.querySelector(".profiles-grid")) {
        loadPostedAnimalsToIndex();
    }
}

// Function to render saved animals on the user profile page
function renderSavedAnimals() {
    const savedAnimals = JSON.parse(localStorage.getItem("savedAnimals")) || [];
    const savedAnimalsGrid = document.querySelector(".saved-animals-grid");

    if (!savedAnimalsGrid) return;

    savedAnimalsGrid.innerHTML = ""; // Clear existing content

    if (savedAnimals.length === 0) {
        savedAnimalsGrid.innerHTML = "<p>No animals have been saved yet.</p>";
        return;
    }

    savedAnimals.forEach(animal => {
        // Ensure the correct path for GitHub Pages or relative rendering
        const imageSrc = animal.image.startsWith("http")
            ? animal.image
            : `./${animal.image}`; // Adjust path as needed

        // Debug the image paths
        console.log("Rendering animal:", {
            name: animal.name,
            image: imageSrc,
            location: animal.location,
        });

        const card = document.createElement("div");
        card.classList.add("saved-animal-card");
        card.innerHTML = `
            <img src="${imageSrc}" alt="${animal.name}" class="profile-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button class="remove-button" onclick="removeSavedAnimal('${animal.name}')">Remove</button>
        `;
        savedAnimalsGrid.appendChild(card);
    });
}


// Function to render posted animals on the user profile page
function renderPostedAnimals() {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const postedAnimalsGrid = document.querySelector(".posted-animals-grid");

    if (!postedAnimalsGrid) return;

    // Clear the container
    postedAnimalsGrid.innerHTML = "";

    if (postedAnimals.length === 0) {
        postedAnimalsGrid.innerHTML = "<p>No animals have been posted yet.</p>";
        return;
    }

    // Render each posted animal
    postedAnimals.forEach(animal => {
        const imageSrc = animal.image && animal.image.startsWith("http")
            ? animal.image
            : placeholderImage;

        const card = document.createElement("div");
        card.classList.add("posted-animal-card");
        card.innerHTML = `
            <img src="${imageSrc}" alt="${animal.name}" class="profile-image">
            <h3>${truncateText(animal.name, 15)}</h3>
            <p>${truncateText(animal.location, 20)}</p>
            <button class="remove-button" onclick="removePostedAnimal('${animal.name}')">Remove</button>
        `;
        postedAnimalsGrid.appendChild(card);
    });
}

// Function to render posted animals dynamically on the index page
function loadPostedAnimalsToIndex() {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const profilesGrid = document.querySelector(".profiles-grid");

    if (!profilesGrid) return;

    // Clear dynamically added animals to prevent duplicates
    const dynamicCards = profilesGrid.querySelectorAll(".dynamic-animal-card");
    dynamicCards.forEach(card => card.remove());

    // Render each posted animal
    postedAnimals.forEach(animal => {
        const imageSrc = animal.image && animal.image.startsWith("http")
            ? animal.image
            : placeholderImage;

        const card = document.createElement("div");
        card.classList.add("profile-card", "dynamic-animal-card");
        card.innerHTML = `
            <a href="profile.html?name=${encodeURIComponent(animal.name)}" class="animal-link">
                <img src="${imageSrc}" alt="${animal.name}" class="profile-image">
                <h2>${truncateText(animal.name, 15)}</h2>
            </a>
            <p>${truncateText(animal.location, 20)}</p>
            <button onclick="saveAnimalToStorage(${JSON.stringify(animal)})" class="save-button">Save ${animal.name}</button>
        `;
        profilesGrid.appendChild(card);
    });
}

// Function to remove a saved animal
function removeSavedAnimal(name) {
    let savedAnimals = JSON.parse(localStorage.getItem("savedAnimals")) || [];
    savedAnimals = savedAnimals.filter(animal => animal.name !== name);
    localStorage.setItem("savedAnimals", JSON.stringify(savedAnimals));
    renderSavedAnimals();
}

// Function to remove a posted animal
function removePostedAnimal(name) {
    let postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    postedAnimals = postedAnimals.filter(animal => animal.name !== name);
    localStorage.setItem("postedAnimals", JSON.stringify(postedAnimals));
    renderPostedAnimals();
    loadPostedAnimalsToIndex(); // Update index page dynamically
}

// Initialize page content on DOM load
document.addEventListener("DOMContentLoaded", function () {
    renderSavedAnimals(); // Render saved animals on the user profile page
    renderPostedAnimals(); // Render posted animals on the user profile page
    loadPostedAnimalsToIndex(); // Render posted animals dynamically on the index page
});
