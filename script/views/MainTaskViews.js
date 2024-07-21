export class MainTaskViews{
    #root;
    #containerForMainTask;
    #listOfMainTasks;
    constructor(rootId){
        this.#root = document.getElementById(rootId);
        this.#containerForMainTask= document.createElement('div');
        this.#containerForMainTask.className='mainTasks';

        this.#listOfMainTasks= document.createElement('ul');
        this.#listOfMainTasks.className='mainTasks__list';
    } 
    addClickEventForMainTask=(handlerClickForMainTask)=>{
        this.#containerForMainTask.onclick=handlerClickForMainTask;
    }
    renderMainTask=(mainTasks=[])=>{
       
        this.#listOfMainTasks.innerText="";
  
        //  add main tasks
        mainTasks.forEach(task => {
            var SubTask= document.createElement('button');
            SubTask.className='mainTasks__item';
            SubTask.innerText=task.mainTask;
            SubTask.dataset.action='changeTask';
            SubTask.dataset.id_MainTask=task.id_MainTask;
            SubTask.dataset.title=task.mainTask;
            
            var removeMainTask= document.createElement('span');
            removeMainTask.className='item__remove';
            removeMainTask.innerText='x';
            removeMainTask.dataset.id_MainTask=task.id_MainTask;
            removeMainTask.dataset.action='remove';
            SubTask.appendChild(removeMainTask);

            this.#listOfMainTasks.appendChild(SubTask);
        }); 
        
        var SubTask= document.createElement('button');
        SubTask.className='mainTasks__item';
        SubTask.innerText="Create new task";
        SubTask.dataset.action="createNewTask";
        this.#listOfMainTasks.append(SubTask);
        this.#containerForMainTask.append(this.#listOfMainTasks);

        // add container in div with id root
        this.#root.prepend(this.#containerForMainTask);
    }
}