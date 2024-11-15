// Function to save an animal to localStorage
function saveAnimal(animalName, animalImage, animalDistance) {
    // Fetch existing saved animals from localStorage
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];

    // Check if the animal is already saved
    if (savedAnimals.some(animal => animal.name === animalName)) {
        alert(`${animalName} is already in your saved list!`);
        return;
    }

    // Add the new animal
    const newAnimal = { name: animalName, image: animalImage, distance: animalDistance };
    savedAnimals.push(newAnimal);

    // Update localStorage
    localStorage.setItem('savedAnimals', JSON.stringify(savedAnimals));

    // Notify the user
    alert(`${animalName} has been saved to your profile!`);
}

// Log to ensure the JavaScript file is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("scripts.js loaded successfully!");
});
// Function to save a new animal to localStorage
function saveAnimalToStorage(animal) {
    const animals = JSON.parse(localStorage.getItem('uploadedAnimals')) || [];
    animals.push(animal);
    localStorage.setItem('uploadedAnimals', JSON.stringify(animals));
}

// Function to load animals from localStorage and display them
function loadAnimalsToPage(containerSelector) {
    const animals = JSON.parse(localStorage.getItem('uploadedAnimals')) || [];
    const container = document.querySelector(containerSelector);

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('profile-card');
        card.innerHTML = `
            <a href="#" class="animal-link">
                <img src="${animal.image}" alt="${animal.name}" class="profile-image">
                <h2>${animal.name}</h2>
            </a>
            <p>${animal.distance}</p>
            <button onclick="saveAnimal('${animal.name}', '${animal.image}', '${animal.distance}')" class="save-button">Save ${animal.name}</button>
        `;
        container.appendChild(card);
    });
}

// Attach form submission handler to save an uploaded animal
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.post-animal-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('animal-name').value;
            const type = document.getElementById('animal-type').value;
            const breed = document.getElementById('animal-breed').value;
            const age = document.getElementById('animal-age').value;
            const location = document.getElementById('animal-location').value;
            const photo = document.getElementById('animal-photo').files[0];

            // Create a URL for the uploaded image (temporary for local preview)
            const imageURL = URL.createObjectURL(photo);

            const newAnimal = {
                name,
                type,
                breed,
                age,
                location,
                image: imageURL,
                distance: `${Math.floor(Math.random() * 50)} miles away`,
            };

            saveAnimalToStorage(newAnimal);
            alert(`${name} has been added successfully!`);

            // Clear the form
            form.reset();
        });
    }

    // Load animals into the main page
    loadAnimalsToPage('.profiles-grid');
});
