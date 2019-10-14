let commentIds = [1, 2, 3];
let commentDB = {
  1: 'First comment',
  2: 'Second comment',
  3: 'Third comment',
}

function print(msg) {
  console.log(msg);
}

function getComment(id, cb) {
  let delay = 5000;
  let r = Math.random();

  if (r < 0.3) {
      delay = 2000;
  }
  if (r > 0.6) {
      delay = 8000;
  }
  print('Request comment with id: ' + id);
  setTimeout(function() {
    cb(commentDB[id])
  }, delay);
}

function fetchCommentById(id) {
    return new Promise(function(resolve) {
        // To complete
    })
}

// Display the comments as soon as possible in the right order
// using map and reduce array utility functions.
async function display() {
    // To complete
}

display();
