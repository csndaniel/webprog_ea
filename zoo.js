// Alap osztály: Animal
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} hangot ad ki.`;
  }

  render() {
    const p = document.createElement("p");
    p.innerText = this.speak();
    document.body.appendChild(p);
  }
}

// Származtatott osztály: Dog
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} ugat. (${this.breed})`;
  }
}

// Származtatott osztály: Cat
class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  speak() {
    return `${this.name} nyávog. Színe: ${this.color}`;
  }
}

// Példányok létrehozása és megjelenítése
const dog1 = new Dog("Bodri", "Labrador");
const cat1 = new Cat("Cirmi", "szürke");
const animal1 = new Animal("Valami lény");

dog1.render();
cat1.render();
animal1.render();
