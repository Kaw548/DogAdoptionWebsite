// Function to save a new animal to localStorage
function saveAnimalToStorage(animal) {
    const animals = JSON.parse(localStorage.getItem('uploadedAnimals')) || [];

    // Check if the animal is already saved
    if (animals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your list!`);
        return;
    }

    // Add the new animal
    animals.push(animal);
    localStorage.setItem('uploadedAnimals', JSON.stringify(animals));
}

// Function to load animals from localStorage and display them
function loadAnimalsToPage(containerSelector) {
    const animals = JSON.parse(localStorage.getItem('uploadedAnimals')) || [];
    const container = document.querySelector(containerSelector);

    // Clear the container to prevent duplicates
    container.innerHTML = '';

    if (animals.length === 0) {
        container.innerHTML = '<p>No animals have been posted yet.</p>';
        return;
    }

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('profile-card');
        card.innerHTML = `
            <div class="animal-card" data-animal-name="${animal.name}">
                <img src="${animal.image}" alt="${animal.name}" class="profile-image">
                <h3>${animal.name}</h3>
                <p>${animal.distance}</p>
                <p>${animal.location}</p>
                <a href="profile.html?name=${encodeURIComponent(animal.name)}" class="view-profile-button">View Profile</a>
                <button onclick="removeAnimal('${animal.name}')" class="remove-button">Remove ${animal.name}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to remove an animal from localStorage and the DOM
function removeAnimal(animalName) {
    const savedAnimals = JSON.parse(localStorage.getItem('uploadedAnimals')) || [];

    // Filter out the animal to be removed
    const updatedAnimals = savedAnimals.filter(animal => animal.name !== animalName);

    // Update localStorage
    localStorage.setItem('uploadedAnimals', JSON.stringify(updatedAnimals));

    // Re-render the animals on the page
    loadAnimalsToPage('.saved-animals-grid');
}

// Attach form submission handler and load animals on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log("scripts.js loaded successfully!");

    // Handle form submission for posting a new animal
    const form = document.querySelector('.post-animal-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('animal-name').value;
            const type = document.getElementById('animal-type').value;
            const breed = document.getElementById('animal-breed').value;
            const age = document.getElementById('animal-age').value;
            const location = document.getElementById('animal-location').value;
            const photoInput = document.getElementById('animal-photo');

            if (!photoInput.files.length) {
                alert("Please select a photo.");
                return;
            }

            const photo = photoInput.files[0];
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

            // Re-render animals on the page
            loadAnimalsToPage('.saved-animals-grid');
        });
    }

    // Initial load of animals
    loadAnimalsToPage('.saved-animals-grid');
});
