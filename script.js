// Function to save a posted animal to "postedAnimals"
function savePostedAnimal(animal) {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];

    // Check if the animal is already posted
    if (postedAnimals.some(existingAnimal => existingAnimal.name === animal.name)) {
        alert(`${animal.name} is already in your posted animals!`);
        return;
    }

    // Add the new posted animal
    postedAnimals.push(animal);
    localStorage.setItem('postedAnimals', JSON.stringify(postedAnimals));

    alert(`${animal.name} has been added to the list of posted animals!`);
}

// Function to load posted animals into the index page
function loadPostedAnimalsToIndex() {
    const postedAnimals = JSON.parse(localStorage.getItem('postedAnimals')) || [];
    const profilesGrid = document.querySelector('.profiles-grid');

    postedAnimals.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('profile-card');
        card.innerHTML = `
            <a href="#" class="animal-link">
                <img src="${animal.image}" alt="${animal.name}" class="profile-image">
                <h2>${animal.name}</h2>
            </a>
            <p>${animal.location}</p>
            <button onclick="saveAnimalToStorage({ name: '${animal.name}', image: '${animal.image}', location: '${animal.location}' })" class="save-button">Save ${animal.name}</button>
        `;
        profilesGrid.appendChild(card);
    });
}

// Call this on the index.html page to load posted animals
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.profiles-grid')) {
        loadPostedAnimalsToIndex();
    }
});
