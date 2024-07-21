export class SubTaskViews{
    #root;
    #containerForSubTask;
    #btnCreateNewSubTask;
    constructor(rootId){
        this.#root = document.getElementById(rootId);
        this.#containerForSubTask= document.createElement('div');
        this.#containerForSubTask.className='subTasks';
        
        this.#root.appendChild(this.#containerForSubTask);
    }
    addClickEventForSubTask=(handlerClickForSubTask)=>{
        this.#containerForSubTask.addEventListener('click',handlerClickForSubTask);
    }
    renderLoadingSubPage=()=>{
        this.#containerForSubTask.remove();       
        document.body.appendChild(this.#containerForSubTask);
    }
    renderEnptySubTasks=()=>{
        var emptySubTasks= document.createElement('div');
        emptySubTasks.className='subTasks__enpty';
        emptySubTasks.innerText='Выбирите основную задачу!!!';
        this.#containerForSubTask.appendChild(emptySubTasks);
    }
    #rerenderHeading=(title)=>{
        var heading= document.createElement('h1');
        heading.innerText=title;
        heading.className='subTasks__heading';
        this.#containerForSubTask.appendChild(heading);

        var image = document.createElement('img');
        image.className='heading__image';
        image.alt='Изменить заголовок';
        image.src= './image/pencil.png';

        image.dataset.action='editTitle';
        image.dataset.text=title;
        heading.appendChild(image);
    }
    #renderCounterForSubTasks=(subTasks,id_MainTask)=>{
        var counterDone__p= document.createElement('p');
        var currentTask=subTasks.filter(task =>task.id_MainTask==id_MainTask)
       
        var counterDone =currentTask.filter(task =>task.status==='done').length;
        
        counterDone__p.innerText= `${counterDone}/${currentTask.length}`;
        counterDone__p.className='subTasks__counter';
        this.#containerForSubTask.appendChild(counterDone__p);
    }
    #createBtnCreateNewSubTask=(id_MainTask)=>{
        this.#btnCreateNewSubTask= document.createElement('button');
        this.#btnCreateNewSubTask.className='subTasks__item__button';
        this.#btnCreateNewSubTask.innerText='Создать новую подзадачу';
        this.#btnCreateNewSubTask.dataset.idMainTask=id_MainTask;
        this.#btnCreateNewSubTask.dataset.action='createNewSubTask';
        this.#containerForSubTask.appendChild(this.#btnCreateNewSubTask);
    }
    #createListOfSubTasks=(listOfSubTasks,id_MainTask,task)=>{
        // create container for sub task
        var SubContainer= document.createElement('div');
        SubContainer.className='subTasks__item';


        // create label for sub task
        var laableSubTask= document.createElement('label');
        laableSubTask.innerText=task.subTask;
        laableSubTask.htmlFor=task.id_SubTask;
        
        // create checkbox for sub task
        var inputSubTask= document.createElement('input');
        inputSubTask.type='checkbox';
        inputSubTask.id=task.id_SubTask;
        inputSubTask.dataset.idSubTask=task.id_SubTask;
        inputSubTask.dataset.idMainTask=id_MainTask;
        inputSubTask.dataset.action='updateStatus';

        inputSubTask.checked=task.status==='done'?true:false;
        
        var laableAndCheckboxSubTask= document.createElement('div');
        laableAndCheckboxSubTask.className='subTasks__laableAndCheckbox';
        laableAndCheckboxSubTask.appendChild(inputSubTask);
        laableAndCheckboxSubTask.appendChild(laableSubTask);

        // create button for delete sub task
        var buttonDeleteSubTask= document.createElement('button');
        buttonDeleteSubTask.className='subTasks__item__button';
        buttonDeleteSubTask.innerText='Удалить';
        buttonDeleteSubTask.dataset.idSubTask=task.id_SubTask;
        buttonDeleteSubTask.dataset.idMainTask=id_MainTask;
        buttonDeleteSubTask.dataset.action='remove';
        
        // append all elements to container
        SubContainer.appendChild(laableAndCheckboxSubTask);
        SubContainer.appendChild(buttonDeleteSubTask);

        listOfSubTasks.appendChild(SubContainer);
    }
    renderSubTasks=(subTasks=[],id_MainTask,title)=>{
        this.#containerForSubTask.innerText='';
       
        this.#rerenderHeading(title);
        this.#renderCounterForSubTasks(subTasks,id_MainTask);
        var listOfSubTasks= document.createElement('ul');
        listOfSubTasks.className='subTasks__list';
        //  add sub tasks
        subTasks.forEach(task => this.#createListOfSubTasks(listOfSubTasks,id_MainTask,task));
        
        this.#createBtnCreateNewSubTask(id_MainTask);
        this.#containerForSubTask.appendChild(listOfSubTasks);
    
     
    }
    
}
