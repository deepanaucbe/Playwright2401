const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

// const { setWorldConstructor } = require('@cucumber/cucumber');

// class CustomWorld {
//   constructor() {
//     this.page = null;
//     this.browser = null;
//     this.context = null;
//   }
// }

// setWorldConstructor(CustomWorld);

