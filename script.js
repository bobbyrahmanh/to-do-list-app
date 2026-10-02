const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const counter = document.getElementById("counter");
const emptyMessage = document.getElementById("empty-message");
const clearBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let currentFilter = "all";
let editingId = null;

/* ---------- Storage ---------- */

function newId(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadTasks(){
    try{
        const saved = localStorage.getItem("tasks");
        if(saved){
            return JSON.parse(saved);
        }

        // Migrate data saved by the old version (raw HTML in "data")
        const legacy = localStorage.getItem("data");
        if(legacy){
            const doc = new DOMParser().parseFromString("<ul>" + legacy + "</ul>", "text/html");
            return Array.from(doc.querySelectorAll("li")).map(li => ({
                id: newId(),
                text: Array.from(li.childNodes)
                    .filter(n => n.nodeType === Node.TEXT_NODE)
                    .map(n => n.textContent)
                    .join("")
                    .trim(),
                done: li.classList.contains("checked")
            })).filter(t => t.text !== "");
        }
    }
    catch(e){
        console.error("Could not load tasks:", e);
    }
    return [];
}

function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------- Actions ---------- */

function addTask(){
    const text = inputBox.value.trim();
    if(text === ''){
        alert("You must write something!");
        return;
    }
    tasks.push({ id: newId(), text: text, done: false });
    inputBox.value = "";
    update();
}

function toggleTask(id){
    const task = tasks.find(t => t.id === id);
    if(task){
        task.done = !task.done;
        update();
    }
}

function deleteTask(id){
    tasks = tasks.filter(t => t.id !== id);
    update();
}

function startEdit(id){
    editingId = id;
    render();
    const input = listContainer.querySelector(".edit-input");
    if(input){
        input.focus();
        input.select();
    }
}

function finishEdit(id, newText, save){
    if(editingId !== id){
        return; // already handled
    }
    editingId = null;
    const text = newText.trim();
    if(save && text !== ""){
        const task = tasks.find(t => t.id === id);
        if(task){
            task.text = text;
        }
    }
    update();
}

function clearCompleted(){
    tasks = tasks.filter(t => !t.done);
    update();
}

function setFilter(filter){
    currentFilter = filter;
    filterBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    render();
}

/* ---------- Rendering ---------- */

function update(){
    saveData();
    render();
}

function render(){
    listContainer.innerHTML = "";

    const visible = tasks.filter(t => {
        if(currentFilter === "active") return !t.done;
        if(currentFilter === "completed") return t.done;
        return true;
    });

    visible.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        if(task.done){
            li.classList.add("checked");
        }

        if(task.id === editingId){
            li.classList.add("editing");
            const input = document.createElement("input");
            input.type = "text";
            input.className = "edit-input";
            input.value = task.text;
            input.maxLength = 200;
            input.addEventListener("keydown", function(e){
                if(e.key === "Enter"){
                    finishEdit(task.id, input.value, true);
                }
                else if(e.key === "Escape"){
                    finishEdit(task.id, input.value, false);
                }
            });
            input.addEventListener("blur", function(){
                finishEdit(task.id, input.value, true);
            });
            li.appendChild(input);
        }
        else{
            li.appendChild(document.createTextNode(task.text));

            const edit = document.createElement("span");
            edit.className = "edit-btn";
            edit.title = "Edit";
            edit.textContent = "\u270E";
            li.appendChild(edit);

            const del = document.createElement("span");
            del.className = "delete-btn";
            del.title = "Delete";
            del.textContent = "\u00d7";
            li.appendChild(del);
        }

        listContainer.appendChild(li);
    });

    // Empty state
    if(visible.length === 0){
        if(tasks.length === 0){
            emptyMessage.textContent = "Nothing to do yet. Add your first task!";
        }
        else if(currentFilter === "active"){
            emptyMessage.textContent = "No active tasks. Nice work!";
        }
        else{
            emptyMessage.textContent = "No completed tasks yet.";
        }
        emptyMessage.style.display = "block";
    }
    else{
        emptyMessage.style.display = "none";
    }

    // Counter and clear button
    const left = tasks.filter(t => !t.done).length;
    counter.textContent = left + (left === 1 ? " task left" : " tasks left");
    clearBtn.style.visibility = tasks.some(t => t.done) ? "visible" : "hidden";
}

/* ---------- Events ---------- */

listContainer.addEventListener("click", function(e){
    const li = e.target.closest("li");
    if(!li || li.classList.contains("editing")){
        return;
    }
    const id = li.dataset.id;

    if(e.target.classList.contains("delete-btn")){
        deleteTask(id);
    }
    else if(e.target.classList.contains("edit-btn")){
        startEdit(id);
    }
    else{
        toggleTask(id);
    }
}, false);

inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

clearBtn.addEventListener("click", clearCompleted);

render();
