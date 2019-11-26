## Asynchronous Programming Patterns in JavaScript

---

## Who AM I?

### BOUALLAGUI MONCEF
### FullStack @fab[js-square] Engineer
### @fa[twitter] @Morfioce

---

## What are we going to talk about?

1. Callback function
2. Asynchronous Thunk
3. Promise API
6. async / await Key words

---

## Callback function

---

@snap[north-west span-100 text-06 text-gray]
Callback function
@snapend

### A callback is a function that is passed as argument to another function.

---

@snap[north-west span-100 text-06 text-gray]
Callback function
@snapend

### A callback can be synchrounous or asynchronous

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
callback functions
@snapend

### Synchronous callback

```js
const doubles = [1, 2, 3].map(function(item) {
  return item * 2;
})

const evens = [1, 2, 3].filter(function(item) {
  return item % 2 == 0;
})
```

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Callback function
@snapend

### Asynchronous callback

```js
fetch("https://api.com")
  .then(function(res) { return res.json() })
  .then(function(data) { updateUI(data) })
  .catch(function(err) { handleError(err) });
```

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Callback function
@snapend

### Request 3 comments in parrallel but display them as soon as possible in order

---

## What's wrong with callbacks

---

@snap[north-west span-100 text-06 text-gray]
Callback function
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
Callback function
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

---

@snap[north-west span-100 text-06 text-gray]
Callback function
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
What ?
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Callback function
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
What ?
@snapend

---

@snap[north-west span-100 text-06 text-gray]
Continuation with Callbacks
@snapend

### Reading and understanding asynchronous code with callbacks is a HARD task

@fa[smile-o fa-4x fa-spin fragment]

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

@ul
- Caller calls the callback too many times
- Caller calls the callback too early
- Caller calls the callback too late
- Caller fails to pass the error parameter
- Caller fails to pass the data parameter
@ulend

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


thunk(function(value) {
 // consume the value
});
```

---

@snap[north-west span-100 text-06 text-gray]
Asynchronous thunk
@snapend

### Async thunk is a time undependent wrapper around a value, which is the basic idea behind a promise

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Asynchronous thunk
@snapend

### Request 3 comments in parrallel but display them as soon as possible in order

---

## Promise API

---

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### A Promise is
#### an object that may produce a single value some time in the future,
#### either a resolved value or a reason why the promise could could not be resolved

---

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### Promise constructor

```js
let function wait(mil) {
  return new Promise(function(resolve, reject) {
    if (typeof mil !== 'number' || Number.isNaN(mil)) {
      reject('"mil" should be a number');
      return;
    }
    setTimeout(function() { resolve('go'); }, mil);
  });
}

wait(1000).then(function(val) { 
  // val == 'go' 
});
wait('xyz').catch(function(err) {
  // err == '"mil" should be a number'
}):
````

---

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### Chaining promises

```js
let function wait(mil) {
 ...
}

wait(1000)
  .then(function() { 
    console.log('Task 1 done');
    return wait(1000);
  })
  .then(function() { 
    console.log('Task 2 done');
    return wait(1000);
  })
  .then(function() {
    console.log('Task 3 done');
  });
````

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

### Request 3 comments in parrallel but display them as soon as possible in order

---

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### But we are still using callbacks 

- promise.then(callabck)
- promise.catch(callback)

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### How Promise is better than the old and simple callback? 

---

@snap[north-west span-100 text-06 text-gray]
Promise API
@snapend

#### Promise are designed to maintain TRUST by having the following properties:

@ul
- A promise is either succeed or fail
- A promise resolve or reject only once
- A promise is immutable once resolve
- A promise message is kept once resolved
- Exception becomes error
@ulend

---

## async await key words

---

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

####  A special syntax to work with promises in a more comfortable way

---

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

#### Async functions

```js
async function f() {
  return 1;
}

f().then(function(value) {
  // value == 1
})
```

@snap[south-west span-50 fragment]
```js
// Equivalent to
function g() {
  return Promise.resolve(1);
}
```
@snapend

@snap[south-east span-50 text-08 fragment]
The word “async” before a function means one simple thing: a function always returns a promise
@snapend

---

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

#### Await

```js
async function f() {
  let promise = new Promise(
    function(resolve, reject) {
      setTimeout(() => resolve("done!"), 1000)
    }
  );
  let result = await promise; // wait till the promise resolves
  console.log(result); // "done!"
}
f();
```

@snap[south-east span-50 text-08 fragment]
The keyword await makes JavaScript wait until that promise settles and returns its result.
@snapend

---

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

#### Rejecting with async functions

```js
async function f() {
  throw new Error("Whoops!");
}

f().catch(function(err) {
  // err == Error("Whooops!");
});
```
@snap[middle span-100 fragment]
#### Equivalent to
@snapend

@snap[south-west span-100 fragment]
```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
f().catch(function(err) {
  // err == Error("Whooops!");
});
```
@snapend

---

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

#### Error handling using try/catch

```js
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

---?color=#1D1E22

@snap[north-west span-100 text-06 text-gray]
async await key words
@snapend

### Request 3 comments in parrallel but display them as soon as possible in order

---

### Recap

@ul
- @fa[check] Promise API soloves the trust issue of callbacks
- @fa[check] Async / await key words allows us to write asynchronous code in a synchronous style 
@ulend

---

## Thank you
