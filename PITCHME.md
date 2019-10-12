## Asynchronous Programming Patterns in JavaScript

---

## Who AM I?

### BOUALLAGUI MONCEF
### Node / React / AWS Developer
### @Morfioce

---

## What are we going to talk about?

1. Parralel Vs Asynchronous
2. JavaScript Event Loop
3. Continuation with Callbacks
4. Asynchronous Thunk
5. Promise API
6. async / await Key words
7. Question Answers

---

## Parralel vs Async

### To Do

---

## JavaScript Event Loop

---

@snap[north-east span-100 text-06 text-gray]
JavaScript Event Loop
@snapend

```js
let eventQueue = []
let event = null;

while (true) {
  if (eventQueue.length) {
    event = eventQueue.shift();
    try {
      event();
    } catch (e) {
      reportError(e);
    }
  }
}
```

---

## Continuation with Callbacks

---

@snap[north-east span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

```js
// Code section A

ajax('/data', function(response) {
  // Code section C
});

// Code section B
```
