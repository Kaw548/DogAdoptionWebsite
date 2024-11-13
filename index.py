class Animal:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

# Function to display all animal profiles
def display_animal_profiles(animals):
    print("PawMatch")
    print("-------------------------------------------")

    for animal in animals:
        print(f"Name: {animal.name}")
        print(f"Location: {animal.breed} miles")
        print("-------------------------------------------")

def main():
    # Sample data
    animals = [
        Animal("Buddy", "5"),
        Animal("Max", "25"),
        Animal("Bella", "100+"),
        Animal("Charlie", "0.5"),
        Animal("Teddy", "0.5"),
        Animal("Fiona", "50"),
        Animal("Pinto", "10")
    ]

    display_animal_profiles(animals)

if __name__ == "__main__":
    main()
