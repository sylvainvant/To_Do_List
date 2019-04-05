let arrayTodo = [];
let counter = 0;
let themeLight = true;

let buttonValid = document.getElementById('validToDo');
let theme = document.getElementById('theme');
let render = document.getElementById('listTodo');

document.addEventListener('DOMContentLoaded',function(){

  //Add event click button valid
  buttonValid.addEventListener('click',function(){
    addList();
  });

  //Add event keypress and verify key is enter
  document.addEventListener("keypress",function(event){
    (event.keyCode === 13)?addList():null;
  });
});

//Create function for add firstUpperCase
function firstUpperCase(textTodo){
  let splitTxt = textTodo.split("");
  splitTxt[0] = splitTxt[0].toUpperCase();
  return splitTxt.join("");
    //console.log(splitTxt);
  }

//Create function for add new todo
function addList(){
  let textTodo = document.getElementById('txtToDo').value;
  if(textTodo.length < 1 ) {
    return;
  }
  counter++;
  arrayTodo.push({
    id:counter,
    txt:firstUpperCase(textTodo),
    finish:false
  });
  rendering();

  // clear the value of input tag
  textTodo = document.getElementById('txtToDo').value="";
  //textTodo.value ="";



}

//function listener click icon for change status todo
function eventClickCheck(icone){
  icone.addEventListener("click",function(){
    icone.className="fas fa-check";

    let id = this.dataset.id;
    let index = 0;
    for (let i = 0; i < arrayTodo.length ; i++) {
      if(arrayTodo[i].id == id) {
        index = i;
        break;
      }
    }
    arrayTodo[index].finish = true;

  });
}

//function listener click icon for remove one todo
function eventClickDelete(basket) {
  basket.addEventListener("click",function(){
    let id = this.dataset.id;
    let index = 0;
    for (let i = 0; i < arrayTodo.length ; i++) {
      if(arrayTodo[i].id == id) {
        index = i;
        break;
      }
    }

    arrayTodo.splice(index,1);
    rendering();
  })
}

//function loop todo list and call rendering
function rendering(){
  let domRendering = document.getElementById("listTodo");
  domRendering.innerHTML = "";
  for (let i = 0; i < arrayTodo.length ; i++) {
    renderHtml(arrayTodo[i],domRendering);
  }
}



//Create dom for todo and add listener
function renderHtml(todo,domRendering) {

  let divContainer = document.createElement('li');
  divContainer.classList.add("list-group-item");
  divContainer.appendChild(document.createTextNode(todo.txt));
  let divIcone = document.createElement('span');
  divIcone.classList.add("check");
  let icone = document.createElement('i');
  icone.setAttribute('data-id', todo.id);

  if(todo.finish) {
    icone.classList.add("fas","fa-check");
    divContainer.classList.add("list-group-item-success");
  } else{
    icone.classList.add("fas","fa-times");
    divContainer.classList.add("list-group-item-danger");
  }

  let divbasket = document.createElement('span');
  divbasket.classList.add("check");
  let basket = document.createElement("i");
  basket.setAttribute('data-id', todo.id);
  basket.classList.add("fas","fa-trash-alt");
  divbasket.appendChild(basket);
  divIcone.appendChild(icone);
  divContainer.appendChild(divIcone);
  divContainer.appendChild(divbasket);
  domRendering.appendChild(divContainer);

  eventClickCheck(icone);
  eventClickDelete(basket);
}


