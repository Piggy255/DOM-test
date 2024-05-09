const input = document.getElementById('input');
const button = document.getElementById('btn');
const list = document.getElementById('list');
const removeButton = document.getElementById('remover');

let completedTasks = [];
let checkboxNr = 0

let taskCount = 0;
const taskCounter = document.getElementById('total');
let completedCount = 0;
const completedCounter = document.getElementById('complete');
//update values of counters
function updateValues(totalCount, completedCount){
    if(totalCount != null){
        taskCounter.innerHTML = totalCount;
    }
    if(completedCount != null){
        completedCounter.innerHTML = completedCount;
    }
}
//add new task
button.addEventListener('click', () => {
    taskCount++
    updateValues(taskCount, null);
    //create new task and put it in page
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${checkboxNr}" class="checkbox">`+ input.value;
    input.value = "";
    list.appendChild(li);
    checkboxNr++;
    //create a checkbox listener for every checkbox
    let checkbox = li.querySelector('.checkbox');
    let done = false
    checkbox.addEventListener('change', () => {
        if(done){
            //if clicked while done remove done class and remove item from completed items array
            done = false;
            li.classList.remove('done');
            let numberInArray = completedTasks.findIndex((item) => {
                if(item == checkbox.id){
                    return true;
                }
                return false;
            })
            completedTasks.splice(numberInArray, 1);
            completedCount--;
            updateValues(null, completedCount);
        }
        else{
            //if clicked while not done add done class and add to completed items array
            done = true
            li.classList.add('done');
            completedTasks.push(checkbox.id);
            completedCount++;
            updateValues(null, completedCount);
        }
    })
})
//remove completed tasks
removeButton.addEventListener('click', () => {
    completedTasks.forEach((item) => {
        document.getElementById(item).parentElement.remove();
    })
    completedTasks = [];
    taskCount-=completedCount;
    completedCount=0;
    updateValues(taskCount, completedCount)
})