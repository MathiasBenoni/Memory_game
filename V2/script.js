const board = document.querySelector(".board");
let grid_x;
let grid_y;
let done = 0;

function update_inputs() {
  grid_x = document.getElementById("board_x").value;
  grid_y = document.getElementById("board_y").value;
  done = (grid_x * grid_y) / 2;
  console.log(grid_x);
  console.log(grid_y);
  update_game();
}

function create_element(n) {
  let box = document.createElement("div");
  box.className = "box";
  box.id = n;
  box.addEventListener("click", click);
  document.getElementById("board").appendChild(box);
}

function create_board() {
  if ((grid_x * grid_y) % 2 == 0) {
    for (let k = 0; k < grid_x * grid_y; k++) {
      create_element(k);
    }
    let css_board = (document.getElementById(
      "board",
    ).style.gridTemplateColumns = `repeat(${grid_x}, var(--size))`);
  } else {
    document.getElementById("board_container").innerHTML =
      "ERROR: Odd number of tiles, cannot render board";
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

function delete_board() {
  const board_el = document.getElementById("board");
  board_el.innerHTML = "";
  progress = 0;
  counter = 0;
  stored_box = null;
  doing_something = false;
}

let progress = 0;
function check_turn(box_1, box_2, solution) {
  if (solution[box_1] == solution[box_2]) {
    progress++;
    if (progress == done) {
      console.log("DONE!");
      stop_timer(timer_id);
    }
    console.log("CORRECT");
    return true;
  } else {
    // console.log("INCORRECT");
    return false;
  }
}
function update_game() {
  if (grid_x && grid_y) {
    delete_board();
    create_board();
    sorted_list = create_content(grid_x * grid_y);
    solution = scramble_content(sorted_list);
    stop_timer(timer_id);
    update_timer(1);
  }
}

const boxes = document.querySelectorAll(".box");

// let doing_something = false;

boxes.forEach((box) => {
  box.addEventListener("click", click);
  // doing_something = false;
});

let counter = 0;
let stored_box = null;
let doing_something = false;

function click(box_clicked) {
  if (doing_something) {
    return false;
  }
  if (box_clicked.target.innerHTML == "") {
    // console.log("HI");
    if (counter == 1) {
      // doing_something = true;
      box_clicked.target.innerHTML = `<h1>${solution[box_clicked.target.id]}</h1>`;
      counter = 0;
      if (check_turn(stored_box, box_clicked.target.id, solution)) {
        // console.log("SHOW");
      } else {
        doing_something = true;
        setTimeout(() => {
          document.getElementById(stored_box).innerHTML = "";
          document.getElementById(box_clicked.target.id).innerHTML = "";
          // console.log("HIDE");

          doing_something = false;
        }, 600);
      }

      //console.log("Two boxes clicked");
    } else {
      counter += 1;
      stored_box = box_clicked.target.id;
      box_clicked.target.innerHTML = `<h1>${solution[box_clicked.target.id]}</h1>`;
    }
  }
}
let clock = document.getElementById("clock");
// console.log(clock);
let timer_id;
function update_timer(timer) {
  clock.innerHTML = timer;

  timer_id = setTimeout(() => {
    update_timer(timer + 1);
  }, 1000);
}
function stop_timer(timer) {
  clearTimeout(timer);
}

//console.log(solution);
