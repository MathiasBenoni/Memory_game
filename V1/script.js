const grid_root = 4;

const board = document.querySelector(".board");

function create_element(n) {
  let box = document.createElement("div");
  box.className = "box";
  box.id = n;
  // box.innerHTML = n;
  document.getElementById("board").appendChild(box);
}

function create_board() {
  for (let n = 0; n < grid_root ** 2; n++) {
    create_element(n);
  }
}

function insert_content(the_list) {
  for (let n = 0; n < the_list.length; n++) {
    let box = document.getElementById(n);
    if (box && box.classList.contains("box")) {
      box.innerHTML = the_list[n];
    }
  }
}

function create_content(number_of_squares) {
  let things = [];
  for (let n = 0; n < number_of_squares / 2; n++) {
    things.push(n);
    things.push(n);
  }
  // console.log(things);
  return things;
}

function scramble_content(the_list) {
  the_list.sort(() => Math.random() - 0.5);
  // console.log(the_list);
  return the_list;
}

function check_turn(box_1, box_2, solution) {
  if (solution[box_1] == solution[box_2]) {
    console.log("CORRECT");
    return true;
  } else {
    console.log("INCORRECT");
    return false;
  }
}

create_board();

const boxes = document.querySelectorAll(".box");

// let doing_something = false;

boxes.forEach((box) => {
  box.addEventListener("click", click);
  // doing_something = false;
});

let counter = 0;
let stored_box = null;

function click(box_clicked) {
  // if (doing_something) {
  //   return false;
  // }
  if (box_clicked.target.innerHTML == "") {
    // console.log("HI");
    if (counter == 1) {
      // doing_something = true;
      box_clicked.target.innerHTML = solution[box_clicked.target.id];
      counter = 0;
      if (check_turn(stored_box, box_clicked.target.id, solution)) {
        console.log("SHOW");
      } else {
        setTimeout(() => {
          document.getElementById(stored_box).innerHTML = "";
          document.getElementById(box_clicked.target.id).innerHTML = "";
          console.log("HIDE");
        }, 600);
        // doing_something = false;
        console.log("NISSE");
      }

      //console.log("Two boxes clicked");
    } else {
      counter += 1;
      stored_box = box_clicked.target.id;
      box_clicked.target.innerHTML = solution[stored_box];
    }
  }
}

sorted_list = create_content(grid_root ** 2);
solution = scramble_content(sorted_list);
//console.log(solution);
