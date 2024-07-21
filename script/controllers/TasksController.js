// models
import { MainTaskModel } from "../models/MainTaskModels.js";
import { SubTaskModel } from "../models/SubTaskModel.js";

// views
import { ErrorView } from "../views/ErrorView.js";
import { LoadingView } from "../views/LoadingView.js";
import { MainTaskViews } from "../views/MainTaskViews.js";
import { ModalWindowsView } from "../views/ModalWindowsView.js";
import { SubTaskViews } from "../views/SubTaskViews.js";

// models
var mainTaskModel = new MainTaskModel();
var subTaskModel = new SubTaskModel();


// views
var mainTaskViews = new MainTaskViews("root");
var subTaskViews = new SubTaskViews("root");
var loadingView = new LoadingView();
var errorView = new ErrorView();
var modalWindowsView = new ModalWindowsView();

export class TasksController {
    #title;
    #idMainTask;

    // render page
    loadingPage = async (search) => {
        var [key, value] = search.replace('?', '').split('=');

        loadingView.renderLoadingMainPage();
        try {
            await this.#loadingMainTask()
            if (key === 'id_MainTask' && value) {
                this.#idMainTask = Number(value);
                var data = mainTaskModel.getMainTaskById(this.#idMainTask);
                if (!data) window.location.search = ``
                this.#title = data.mainTask;
                await this.#loadingSubTasks();  
            }
            else {
                subTaskViews.renderEnptySubTasks();
            }
        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }
        finally {
            loadingView.closeLoadingMainPage();

        }
    }

    #loadingMainTask = async () => {
        try {
            await mainTaskModel.fetchMainTasks();
            this.#renderMainTask();
        } catch (error) {
          throw new Error(error);
        }
    }

    #loadingSubTasks = async () => {
        try {       
            await subTaskModel.fetchSubTasks(this.#idMainTask)
            this.#renderSubTasks();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    #renderMainTask = async () => {
        var mainTask = mainTaskModel.getAllMainTasks();
        mainTaskViews.addClickEventForMainTask(this.#handlerClickForMainTask)
        mainTaskViews.renderMainTask(mainTask);
    }
    
    #renderSubTasks = async () => {
        var subTasks = subTaskModel.getSubTasksForMainTask(this.#idMainTask);
        subTaskViews.addClickEventForSubTask(this.#handleClickForSubTask);
        subTaskViews.renderSubTasks(subTasks, this.#idMainTask, this.#title);
    }


    
    // function for handle click on main task (use in #renderMainTask)
    #handlerClickForMainTask = (event) => {
      
        event.stopPropagation();
        var action = event.target.dataset.action;
        if (action === 'remove') {
            var idMainTask = Number(event.target.dataset.id_MainTask);
            mainTaskModel.removeMainTask(idMainTask);
            subTaskModel.removeSubTasksForMainTask(idMainTask);
            if (idMainTask !== this.#idMainTask)
                window.location.search = `?id_MainTask=${this.#idMainTask}`;
            window.location.search = ``
                
        }
        if (action === 'changeTask') {
            this.#idMainTask = event.target.dataset.id_MainTask;
            this.#title = event.target.dataset.title;
            window.location.search = `?id_MainTask=${this.#idMainTask}`;
            // history.pushState({}, '', `?id_MainTask=${id_MainTask}`);
        }
        if (action === 'createNewTask') {
            this.#title = event.target.dataset.title;
            this.#createModalForAddNewMainTask();
        }
       
    }
    // function for handle click on sub task (use in #loadingSubTasks)
    #handleClickForSubTask = async (event) => {
        var action = event.target.dataset.action;
        if (action === 'remove') {
            var id_SubTask = event.target.dataset.idSubTask;
            if (!id_SubTask) {
                console.error("id_SubTask is not defined");
            }
            else{
                await subTaskModel.removeSubTask(id_SubTask);
                this.#renderSubTasks();
            }
        }
        else if (action === 'updateStatus') {
            var id_SubTask = event.target.dataset.idSubTask;
            var checked = event.target.checked

            if (!id_SubTask || typeof checked != "boolean" ) {
                console.error("id_SubTask or checked is not boolean");
            }
            else{
                this.#changeStatusSubTask(id_SubTask, checked);
            }
        }
        else if (action === 'createNewSubTask') {
            
            var id_MainTask = event.target.dataset.idMainTask;
            if (!id_MainTask) {
                console.error("id_MainTask is not defined");
            }
            else{
                this.#createModalWindowsForAddNewSubTask(id_MainTask);
            }
        }
        else if (action === 'editTitle') {
            var text = event.target.dataset.text
            if (!text) {
                console.error("text is not defined");
            }
            else{
                this.#createModalWindowsForEditTitle(text);
            }
        }
    }


    // function for create modal windows (use in #handlerClickForMainTask)
    #createModalForAddNewMainTask = async () => {
        try {
            modalWindowsView.addSubmitEvent(this.#handlerAddNewMainTask);
            modalWindowsView.addInpytForModalWindows("text", "taskName", "Название задачи", this.#title);
            modalWindowsView.addButtonForModalWindows("Создать", "submit");
            modalWindowsView.renderModalWindows();
        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }
    }

   
    // function for change status of sub task
    #changeStatusSubTask = async (id_SubTask, status) => {
        try {

            await subTaskModel.changeStatus(id_SubTask, status);
            this.#renderSubTasks();

        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }
    }
   
    // function for remove sub task

    #handlerAddNewSubTask = async (event) => {
        event.preventDefault();
        console.log(event.target);
        var subTask = event.target.title.value;
        var id_MainTask = event.target.id_MainTask.value;
        if (subTask === "" || id_MainTask === "") {
            return;
        }
        try {
            await subTaskModel.createNewSubTask(Number(id_MainTask), subTask);
            modalWindowsView.closeModalWindows();
            this.#renderSubTasks();


        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }

    }
    #handlerEditTitle = async (event) => {
        event.preventDefault();
        var title = event.target.title.value;
        var id_MainTask = event.target.id_MainTask.value;

        if (title === "" || id_MainTask === "") {
            return;
        }
        try {
            await mainTaskModel.editTitle(id_MainTask,title);
            modalWindowsView.closeModalWindows();
            this.#title=title;
            this.#renderSubTasks();
            this.#renderMainTask();


        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }

    }
    #createModalWindowsForAddNewSubTask = async (id_MainTask) => {
        modalWindowsView.renderModalWindows()
        modalWindowsView.addInpytForModalWindows("text", "title", "Название подзадачи");
        modalWindowsView.addInpytForModalWindows("hidden", "id_MainTask", "", id_MainTask);
        modalWindowsView.addButtonForModalWindows("Создать", "submit");
        modalWindowsView.addSubmitEvent(this.#handlerAddNewSubTask);
        

    }
    #createModalWindowsForEditTitle = async (text) => {
        var {id_MainTask} = mainTaskModel.getMainTaskByText(text);
        modalWindowsView.renderModalWindows()
        modalWindowsView.addInpytForModalWindows("text", "title", text);
        modalWindowsView.addInpytForModalWindows("hidden", "id_MainTask", "", id_MainTask);
        modalWindowsView.addButtonForModalWindows("Сохранить", "submit");
        modalWindowsView.addSubmitEvent(this.#handlerEditTitle);


    }



    // function for add new main task
    #handlerAddNewMainTask = async (event) => {
        event.preventDefault();
        var taskName = event.target.taskName.value;
        if (taskName === "") {
            return;
        }
        try {
            // console.log(taskName);
            await mainTaskModel.createNewMainTask(taskName);
            modalWindowsView.closeModalWindows();
            this.#renderMainTask()


        } catch (error) {
            console.log(error);
            errorView.renderErrorPage(error);
        }

    }


}