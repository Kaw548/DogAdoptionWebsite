// Placeholder image for missing or invalid image URLs
const placeholderImage = "images/default-placeholder.png"; // Ensure this path is correct

// Helper Function to Convert Image to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
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
        const card = document.createElement("div");
        card.classList.add("posted-animal-card");
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="posted-animal-image">
            <h3>${animal.name || "Unnamed Animal"}</h3>
            <p><strong>About:</strong> ${animal.about || "No details available"}</p>
            <p><strong>Personality:</strong> ${animal.personality || "No details available"}</p>
            <p><strong>Breed:</strong> ${animal.breed || "Unknown Breed"}</p>
            <p><strong>Age:</strong> ${animal.age || "Unknown Age"}</p>
            <p><strong>Health:</strong> ${animal.health || "No health information available"}</p>
            <p><strong>Location:</strong> ${animal.location || "Unknown Location"}</p>
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

    profilesGrid.innerHTML = ""; // Clear the profiles grid to avoid duplicates

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

        const profileLink = `profile.html?id=${encodeURIComponent(animal.name)}`;

        card.innerHTML = `
            <a href="${profileLink}" class="animal-link">
                <img src="${animal.image}" alt="${animal.name}" class="profile-image">
                <h2>${animal.name || "Unnamed Animal"}</h2>
            </a>
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

// Event Listener for Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.post-animal-form');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('animal-name').value;
            const type = document.getElementById('animal-type').value;
            const breed = document.getElementById('animal-breed').value;
            const age = document.getElementById('animal-age').value;
            const location = document.getElementById('animal-location').value;
            const about = document.getElementById('animal-about').value;
            const personality = document.getElementById('animal-personality').value;
            const health = document.getElementById('animal-health').value;
            const photoInput = document.getElementById('animal-photo');

            if (!photoInput.files.length) {
                alert('Please upload an image for the animal.');
                return;
            }

            const photo = photoInput.files[0];
            const imageBase64 = await convertToBase64(photo);

            const newAnimal = {
                name,
                type,
                breed,
                age,
                location,
                about,
                personality,
                health,
                image: imageBase64, // Save the Base64 string
            };

            // Save the new animal
            savePostedAnimal(newAnimal);

            // Clear the form
            form.reset();
        });
    }

    // Initial rendering of posted animals
    renderPostedAnimals();
    loadPostedAnimalsToIndex();
});
