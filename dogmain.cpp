#include <iostream>
#include <vector>
#include <string>

struct Animal {
    std::string name;
    std::string breed;
    int age;
    std::string description;
};

// Function to display all animal profiles
void displayAnimalProfiles(const std::vector<Animal>& animals) {
    std::cout << "PawMatch" << std::endl;
    std::cout << "-------------------------------------------" << std::endl;

    for (const auto& animal : animals) {
        std::cout << "Name: " << animal.name << std::endl;
        std::cout << "Location: " << animal.breed << " miles" << std::endl;
        std::cout << "-------------------------------------------" << std::endl;
    }
}

int main() {
    // Sample data
    std::vector<Animal> animals = {
        {"Buddy", "5" },
        {"Max", "25"},
        {"Bella", "100+"},
        {"Charlie","0.5"},
        {"Teddy","0.5" },
        { "Fiona","50" },
        {"Pinto","10" }

    };

    displayAnimalProfiles(animals);

    return 0;
}

