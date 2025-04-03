'use strict';

class Proactor {
  #tasks = [];

  enqueue(fn) {
    this.#tasks.push(fn);
  }

  async start() {
    while (this.#tasks.length) {
      const tasks = this.#tasks.splice(0);
      for (const fn of tasks) await fn();
    }
  }
}

// Usage

const eventLoop = new Proactor();

const fakeAsyncRead = (name) => async () => {
  const delay = Math.random() * 1000;
  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
  console.log(`[Proactor] ${name} done after ${delay}ms`);
};

eventLoop.enqueue(fakeAsyncRead('File A'));
eventLoop.enqueue(fakeAsyncRead('File B'));
eventLoop.enqueue(fakeAsyncRead('File C'));

eventLoop.start();
