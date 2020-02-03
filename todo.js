const toDoform = document.querySelector(".js-toDoForm"),
toDoinput=toDoform.querySelector("input"),
toDoList =document.querySelector(".js-toDoList");

const TODOS_LS ='toDos';

let toDos =[];

function filterFn(toDo)
{
    return toDo.id === 1;
}
function deleteToDo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDOs();
}
function saveToDOs()
{
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function paintTodo(text)
{
   const li = document.createElement("li");
   const delBtn = document.createElement("button");
   delBtn.innerHTML = "❌";
   delBtn.addEventListener("click",deleteToDo);
   const span =document.createElement("span");
   const newId =toDos.length + 1;
   span.innerText = text;
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   toDoList.appendChild(li);
   const toDoObj ={
       text: text,
       id: newId
   };
   toDos.push(toDoObj);
   saveToDOs();
}


function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintTodo(currentValue);
    toDoinput.value="";
}
function loadToDos()
{
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null)
    {
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo)
        {
            paintTodo(toDo.text);
        });
    }
    
}

function init()
{
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);
}

init();
