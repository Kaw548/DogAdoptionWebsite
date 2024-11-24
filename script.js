// Placeholder image for missing or invalid image URLs
const placeholderImage = "images/default-placeholder.png"; // Ensure this path is correct

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

    // Clear the profiles grid to avoid duplicates
    profilesGrid.innerHTML = "";

    // Append static profiles
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

    // Append dynamically posted animals
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

        profilesGrid.appendChild(card);
    });
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
    renderPostedAnimals();
    loadPostedAnimalsToIndex();
});
