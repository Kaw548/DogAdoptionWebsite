// Function to save an animal to the "Saved Animals" list in localStorage
function saveAnimalToStorage(animal) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];

    if (savedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your saved animals!`);
        return;
    }

    savedAnimals.push(animal);
    localStorage.setItem('savedAnimals', JSON.stringify(savedAnimals));

    alert(`${animal.name} has been added to your saved animals!`);
    renderSavedAnimals();
}

// Function to save an animal to the "Posted Animals" list in localStorage
function postAnimalToStorage(animal) {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];

    postedAnimals.push(animal);
    localStorage.setItem('postedAnimals', JSON.stringify(postedAnimals));

    renderPostedAnimals();
}

// Function to load saved animals and display them
function renderSavedAnimals() {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];
    const savedAnimalsGrid = document.querySelector('.saved-animals-grid');

    savedAnimalsGrid.innerHTML = ''; // Clear existing content

    savedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('saved-animal-card');
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="saved-animal-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button class="remove-animal-button" onclick="removeSavedAnimal('${animal.name}')">Remove</button>
        `;
        savedAnimalsGrid.appendChild(card);
    });
}

// Function to load posted animals and display them
function renderPostedAnimals() {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];
    const postedAnimalsGrid = document.querySelector('.posted-animals-grid');

    postedAnimalsGrid.innerHTML = ''; // Clear existing content

    postedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('posted-animal-card');
        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" class="posted-animal-image">
            <h3>${animal.name}</h3>
            <p>${animal.location}</p>
            <button class="remove-animal-button" onclick="removePostedAnimal('${animal.name}')">Remove</button>
        `;
        postedAnimalsGrid.appendChild(card);
    });
}

// Function to remove a saved animal
function removeSavedAnimal(animalName) {
    const savedAnimals = JSON.parse(localStorage.getItem('savedAnimals')) || [];
    const updatedAnimals = savedAnimals.filter(animal => animal.name !== animalName);

    localStorage.setItem('savedAnimals', JSON.stringify(updatedAnimals));
    renderSavedAnimals();
}

// Function to remove a posted animal
function removePostedAnimal(animalName) {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];
    const updatedAnimals = postedAnimals.filter(animal => animal.name !== animalName);

    localStorage.setItem('postedAnimals', JSON.stringify(updatedAnimals));
    renderPostedAnimals();
}

// Handle form submission for posting a new animal
document.querySelector('.post-animal-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('animal-name').value;
    const type = document.getElementById('animal-type').value;
    const breed = document.getElementById('animal-breed').value;
    const age = document.getElementById('animal-age').value;
    const location = document.getElementById('animal-location').value;
    const photoInput = document.getElementById('animal-photo');

    if (!photoInput.files.length) {
        alert("Please upload a photo.");
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

    postAnimalToStorage(newAnimal);

    alert(`${name} has been added to your posted animals!`);
    document.querySelector('.post-animal-form').reset();
});

// Load initial data
document.addEventListener('DOMContentLoaded', function () {
    renderSavedAnimals();
    renderPostedAnimals();
});
