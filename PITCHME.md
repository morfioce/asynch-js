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

@snap[north-west span-100 text-06 text-gray]
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

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

```js
// Code section A

ajax('/data', function(response) {

  // Code section C

});

// Code section B

```
@snap[north-east span-45 text-08 fragment]
@box[](A and B represent the first half of the program.)
@snapend

@snap[east span-45 text-08 fragment]
@box[](C represent the second half of the program.)
@snapend

@snap[south-east span-45 text-08 fragment]
@box[](A and B run now and later if the ajax call succeed C continue the execution of the program.)
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

@snap[midpoint span-100 text-10 fragment]
@box[](The callback encapsulates the continuation of the program.)
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

```js
const commentIds = [1, 2, 3];
const commentDB = {
  1: 'First comment',
  2: 'Second comment',
  3: 'Third comment',
}
function print(msg) {
  console.log(msg);
}
function getComment(id, cb) {
  let delay = Math.random() * 1000;
  
  print('Request comment with id: ', id);
  setTimeout(function() {
    cb(commentDB[id])
  }, delay);
}
```

@snap[east span-100]
```js
function FetchCommentById(id) {
  getComment(id, function(cm) {
    // complete the function body
  })
}

commentIds.forEach(function(id) {
  FetchCommentById(id);
});
```
@snapend
