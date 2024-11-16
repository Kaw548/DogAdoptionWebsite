// Function to save an animal to the "Saved Animals" section
function saveAnimalToStorage(animal) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];

    // Check if the animal is already saved
    if (savedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your saved animals list!`);
        return;
    }

    // Add the new animal
    savedAnimals.push(animal);
    localStorage.setItem('savedAnimals', JSON.stringify(savedAnimals));
    alert(`${animal.name} has been added to your saved animals!`);

    // Re-render the saved animals
    renderSavedAnimals();
}

// Function to post an animal to the "Your Posted Animals" section
function postAnimal(animal) {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];
    postedAnimals.push(animal);
    localStorage.setItem('postedAnimals', JSON.stringify(postedAnimals));
    renderPostedAnimals();
}

// Function to render saved animals
function renderSavedAnimals() {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];
    const savedAnimalsGrid = document.querySelector('.saved-animals-grid');

    // Clear the grid
    savedAnimalsGrid.innerHTML = '';

    if (savedAnimals.length === 0) {
        savedAnimalsGrid.innerHTML = '<p>No animals have been saved yet.</p>';
        return;
    }

    savedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('animal-card');
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="animal-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button onclick="removeSavedAnimal('${animal.name}')" class="remove-button">Remove</button>
        `;
        savedAnimalsGrid.appendChild(card);
    });
}

// Function to render posted animals
function renderPostedAnimals() {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];
    const postedAnimalsGrid = document.querySelector('.posted-animals-grid');

    // Clear the grid
    postedAnimalsGrid.innerHTML = '';

    if (postedAnimals.length === 0) {
        postedAnimalsGrid.innerHTML = '<p>No animals have been posted yet.</p>';
        return;
    }

    postedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('animal-card');
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="animal-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
        `;
        postedAnimalsGrid.appendChild(card);
    });
}

// Function to remove a saved animal
function removeSavedAnimal(animalName) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];
    const updatedAnimals = savedAnimals.filter(animal => animal.name !== animalName);

    // Update localStorage and re-render
    localStorage.setItem('savedAnimals', JSON.stringify(updatedAnimals));
    renderSavedAnimals();
}

// Event listener for posting a new animal
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.post-animal-form');
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
        };

        postAnimal(newAnimal);

        alert(`${name} has been successfully posted!`);

        // Clear the form
        form.reset();
    });

    // Initial rendering of saved and posted animals
    renderSavedAnimals();
    renderPostedAnimals();
});
