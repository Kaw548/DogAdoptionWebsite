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
