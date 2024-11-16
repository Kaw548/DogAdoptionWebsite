// Function to save a new animal to localStorage under "savedAnimals"
function saveAnimalToStorage(animal) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];

    // Check if the animal is already saved
    if (savedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your saved list!`);
        return;
    }

    // Add the new animal
    savedAnimals.push(animal);
    localStorage.setItem('savedAnimals', JSON.stringify(savedAnimals));

    alert(`${animal.name} has been added to your saved animals!`);
}

// Function to load saved animals from localStorage and display them
function loadAnimalsToPage(containerSelector) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];
    const container = document.querySelector(containerSelector);

    // Clear the container
    container.innerHTML = '';

    if (savedAnimals.length === 0) {
        container.innerHTML = '<p>No animals have been saved yet.</p>';
        return;
    }

    // Render each saved animal
    savedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('profile-card');
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="profile-image">
            <h2>${animal.name}</h2>
            <p>${animal.location}</p>
            <button onclick="removeAnimal('${animal.name}')" class="remove-button">Remove</button>
        `;
        container.appendChild(card);
    });
}

// Function to remove an animal from the saved list
function removeAnimal(animalName) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];

    // Remove the selected animal
    const updatedAnimals = savedAnimals.filter(animal => animal.name !== animalName);

    // Update localStorage
    localStorage.setItem('savedAnimals', JSON.stringify(updatedAnimals));

    // Reload animals on the page
    loadAnimalsToPage('.profiles-grid');
}

// On DOMContentLoaded, initialize the saved animals grid
document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded successfully!");

    // Load saved animals to the grid
    loadAnimalsToPage('.profiles-grid');
});
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
