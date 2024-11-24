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

    // Add the new animal to savedAnimals
    savedAnimals.push(animal);
    localStorage.setItem("savedAnimals", JSON.stringify(savedAnimals)); // Save updated list to localStorage
    alert(`${animal.name} has been added to your saved animals!`);

    // Re-render the saved animals if the saved animals grid is available
    const savedAnimalsGrid = document.querySelector(".saved-animals-grid");
    if (savedAnimalsGrid) {
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
        const imageSrc = animal.image.startsWith("http") ? animal.image : `./${animal.image}`;

        const card = document.createElement("div");
        card.classList.add("saved-animal-card");
        card.innerHTML = `
            <img src="${imageSrc}" alt="${animal.name}" class="saved-animal-image">
            <h3>${animal.name || "Unnamed Animal"}</h3>
            <p>${animal.location || "Unknown Location"}</p>
        `;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => removeSavedAnimal(animal.name));

        card.appendChild(removeButton);
        savedAnimalsGrid.appendChild(card);
    });
}

// Function to render posted animals on the user profile page
function renderPostedAnimals() {
    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const postedAnimalsGrid = document.querySelector(".posted-animals-grid");

    if (!postedAnimalsGrid) return;

    postedAnimalsGrid.innerHTML = ""; // Clear existing content

    if (postedAnimals.length === 0) {
        postedAnimalsGrid.innerHTML = "<p>No animals have been posted yet.</p>";
        return;
    }

    postedAnimals.forEach(animal => {
        const imageSrc = animal.image.startsWith("http") ? animal.image : `./${animal.image}`;

        const card = document.createElement("div");
        card.classList.add("posted-animal-card");
        card.innerHTML = `
            <img src="${imageSrc}" alt="${animal.name}" class="posted-animal-image">
            <h3>${animal.name || "Unnamed Animal"}</h3>
            <p>${animal.location || "Unknown Location"}</p>
        `;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => removePostedAnimal(animal.name));

        card.appendChild(removeButton);
        postedAnimalsGrid.appendChild(card);
    });
}

// Function to load posted animals on index page (static + dynamic)
function loadPostedAnimalsToIndex() {
    const staticProfiles = [
        { name: "Buddy", image: "buddy.jpg", location: "Kent, OH", link: "buddy.html" },
        { name: "Max", image: "max.jpeg", location: "Canton, OH", link: "maxProfile.html" },
        { name: "Bella", image: "bella.jpg", location: "Kent, OH", link: "bella.html" },
        { name: "Charlie", image: "charlie.jpg", location: "Akron, OH", link: "charlie.html" },
        { name: "Teddy", image: "teddy.jpg", location: "Dayton, OH", link: "teddy.html" },
        { name: "Fiona", image: "fiona.jpg", location: "Kent, OH", link: "fiona.html" },
        { name: "Pinto", image: "pinto.jpg", location: "Columbus, OH", link: "pinto.html" },
    ];

    const postedAnimals = JSON.parse(localStorage.getItem("postedAnimals")) || [];
    const profilesGrid = document.querySelector(".profiles-grid");

    if (!profilesGrid) return;

    // Append dynamically posted animals without clearing static profiles
    staticProfiles.forEach(profile => {
        const card = document.createElement("div");
        card.classList.add("profile-card");

        card.innerHTML = `
            <a href="${profile.link}" class="animal-link">
                <img src="${profile.image}" alt="${profile.name}" class="profile-image">
                <h2>${profile.name}</h2>
            </a>
            <p>${profile.location}</p>
        `;

        profilesGrid.appendChild(card);
    });

    postedAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.classList.add("profile-card");

        const imageSrc = animal.image.startsWith("data:image/") || animal.image.startsWith("http")
            ? animal.image
            : `./${animal.image}`;

        card.innerHTML = `
            <img src="${imageSrc}" alt="${animal.name}" class="profile-image">
            <h2>${animal.name || "Unnamed Animal"}</h2>
            <p>${animal.location || "Unknown Location"}</p>
        `;

        const saveButton = document.createElement("button");
        saveButton.textContent = `Save ${animal.name}`;
        saveButton.classList.add("save-button");
        saveButton.addEventListener("click", () => saveAnimalToStorage(animal));

        card.appendChild(saveButton);
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
}

// Initialize page content on DOM load
document.addEventListener("DOMContentLoaded", function () {
    renderSavedAnimals();
    renderPostedAnimals();
    loadPostedAnimalsToIndex();
});
