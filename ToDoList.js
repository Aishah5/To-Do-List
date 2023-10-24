let tableShow = document.getElementById("tasks")
let nowDate = new Date()
let tasksArr = []
getTaskFromSorage()

function taskAdd() {
    let task = {
        taskTitle: prompt("الرجاء إدخال المهمة: "),
        taskDate: nowDate.getFullYear() + "/" + (nowDate.getMonth() + 1) + "/" + nowDate.getDate(),
        isDone: false
    }

    if (task.taskTitle != null) {
        tasksArr.push(task)
    }
    storeTasks()
    taskPrint()
}

function taskDelete(index) {
    let isDelete = confirm("هل انت متأكد من حذف مهمة: " + tasksArr[index].taskTitle + "؟")
    if (isDelete) {
        tasksArr.splice(index, 1)
        storeTasks()
        taskPrint()
    }
}

function toggleTaskCompletion(index) {
    let task = tasksArr[index]
    task.isDone = !task.isDone
    storeTasks()
    taskPrint()
}

function tsakEdit(index) {
    let task = tasksArr[index]
    let newTaskTitle = prompt("الرجاء إدخال المهمة الجديدة: ", task.taskTitle)
    if (newTaskTitle != null) {
        task.taskTitle = newTaskTitle
    } else {
        task.taskTitle = task.taskTitle
    }
    storeTasks()
    taskPrint()
}

function taskPrint() {
    tableShow.innerHTML = ""
    for (let i = 0; i < tasksArr.length; i++) {
        let content =
            ` 
                <!-- TASKS -->
                <div class="bar2" style="padding: 20px;" id="tasks">
                    <!-- TASK -->
                    <div class="task ${tasksArr[i].isDone ? 'done' : ''}">

                        <!-- TASK INFO -->
                        <div style="width: 70%;">
                            <h2>${tasksArr[i].taskTitle}</h2>

                            <!-- DATE -->
                            <div>
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>

                                <span> ${tasksArr[i].taskDate} </span>
                            </div>
                            <!-- // DATE // -->

                        </div>
                        <!-- // TASK INFO // -->

                        <!-- TASK ACTIONS -->
                        <div style="width: 20%; display: flex; align-items: center; justify-content: space-between; float: left;">
                            <button class="circular" onclick="taskDelete(${i})" style="background-color: rgb(114,0,0); border: none; color: white;">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>

                            ${tasksArr[i].isDone ?
                `<button id="doneBtn" class="circular" onclick="toggleTaskCompletion(${i})" style="background-color: #FFC300; border: none; color: white;">
                                             <span class="material-symbols-outlined">
                                                  cancel
                                              </span> 
                                        </button>` :
                `<button id="doneBtn" class="circular" onclick="toggleTaskCompletion(${i})" style="background-color: rgb(0,150,30); border: none; color: white;">
                                            <span class="material-symbols-outlined">
                                                done
                                            </span> 
                                         </button>`}
                            

                            <button class="circular" onclick="tsakEdit(${i})" style="background-color: rgb(0,16,197,0.692); border: none; color: white;">
                                <span class="material-symbols-outlined">
                                    edit
                                </span> 
                            </button>
                        </div>
                        <!-- // TASK ACTIONS // -->
                    </div>
                    <!-- // TASK // -->
                </div>
                <!-- // TASKS // -->
            `
        tableShow.innerHTML += content
    }
}
taskPrint()

// <------- STORAGE FUNCTION ----------->
function storeTasks() {
    let tasksString = JSON.stringify(tasksArr)
    localStorage.setItem("tasks", tasksString)
}

// tasksArr = JSON.parse(localStorage.getItem("tasks"))
function getTaskFromSorage() {
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    try {
        tasksArr = retrievedTasks ?? []
    } catch (error) { 
        console.log(error)
    }

    // if(retrievedTasks == null){
    //     tasksArr = []
    // }else{
    //     tasksArr = retrievedTasks
    // }
}
