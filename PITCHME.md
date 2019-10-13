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
@box[](A and B represent the first half of the program)
@snapend

@snap[east span-45 text-08 fragment]
@box[](C represent the second half of the program)
@snapend

@snap[south-east span-45 text-08 fragment]
@box[](A and B run now and later if the ajax call succeed C continue the execution of the program)
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

### The callback encapsulates the continuation of the program


---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

### Request 3 files in parrallel but display them as soon as possible in order

---

## What's wrong with callbacks

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### Can you figure out the order of execution?
#### doA and doC are async

```js
doA(function(...) {

  doB(...);
  
  doC(function(...) {
  
    doD();
  
  });
  
  doE();

});

doF();
```

@snap[east span-20 text-08 fragment]
1. doA()
2. doF()
3. doB()
4. doC()
5. doE()
6. doD()
@snapend

@snap[south-east span-50 text-08 fragment]
A little confusing at first glance and take some mental cycles to follow the flow of execution.
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### Can you figure out the order of execution?
#### doA and doC are sync

```js
doA(function(...) {

  doB(...);
  
  doC(function(...) {
  
    doD();
  
  });
  
  doE();

});

doF();
```

@snap[east span-20 text-08 fragment]
1. doA()
2. doB()
3. doC()
4. doD()
5. doE()
6. doF()
@snapend

@snap[south-east span-50 text-08 fragment]
What ???
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### Can you figure out the order of execution?
#### doA is async doC is sync

```js
doA(function(...) {

  doB(...);
  
  doC(function(...) {
  
    doD();
  
  });
  
  doE();

});

doF();
```

@snap[east span-20 text-08 fragment]
1. doA()
2. doF()
3. doB()
4. doC()
5. doD()
6. doE()
@snapend

@snap[south-east span-50 text-08 fragment]
What ???
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### Can you figure out the order of execution?
#### doA is sync doC is async

```js
doA(function(...) {

  doB(...);
  
  doC(function(...) {
  
    doD();
  
  });
  
  doE();

});

doF();
```

@snap[east span-20 text-08 fragment]
1. doA()
2. doB()
3. doC()
4. doE()
5. doF()
6. doD()
@snapend

@snap[south-east span-50 text-08 fragment]
What ???
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

### Reading and understanding asynchronous code with callbacks is HARD task

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
@snap[north-east span-50 text-08 fragment]
@box[](A and B run now under the main JS program)
@snapend

@snap[east span-50 text-08 fragment]
@box[](C run later under the control the `ajax` utility function)
@snapend

@snap[south-east span-50 text-08 fragment]
@box[](This is called inversoin of control and it's a BIG deal)
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### What can go wrong?

```js
analytics.trackPurchase(
  purchaseData,
  function checkout(err, data) {

    if (err) {
      logger.error(err);
      return;
    }

    chargeCreditCard(data);
    displayThankyouPage(data);
  
  }
);

```

@snap[east span-50 text-08 fragment]
@box[](What if the trackPurchase call ckeckout callback many times!)
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

#### Is it fixed now?

```js
let isCheckoutDone = false;
analytics.trackPurchase(
  purchaseData,
  function checkout(err, data) {
    if (!isCheckoutDone) {
      isCheckoutDone = true;
      if (err) {
        logger.error(err);
        return;
      }

      chargeCreditCard(data);
      displayThankyouPage(data);
    }
  }
);

```

@snap[east span-50 text-08 fragment]
@box[](What if the trackPurchase do not call ckeckout callback!)
@snapend

---

### There is a TRUST issue with callbacks

- Call the callback too many times
- Call the callback too early
- Call the callback too late
- Caller fail to pass the error parameter
- Caller fail to pass the data parameter

---

## Asynchronous thunk

---
@snap[north-west span-100 text-06 text-gray]
Asynchronous thunk
@snapend

#### A synchronous thunk is
#### a function with no arguments and return a value

```js
function add(a, b) {
  return a + b;
}

// This is a thunk
const thunk = function() {
  return add(7, 10);
}
```

---

@snap[north-west span-100 text-06 text-gray]
Asynchronous thunk
@snapend

#### An asynchronous thunk is
#### a function with a callback argument to get the value out of it

```js
function add(a, b, cb) {
  setTimeout(function() { cb(a+b) }, 1000);
}

// This is a thunk
const thunk = function(cb) {
  add(7, 10, cb);
}

thunk(function(value) {
 // consume the value
});
```

---

@snap[north-west span-100 text-06 text-gray]
Asynchronous thunk
@snapend

### Async thunk is a time undependent wrapper around a value, which is the foundational idea behind promise API

