import {TasksController} from "./controllers/TasksController.js";


var tasksController = new TasksController();
tasksController.loadingPage(window.location.search);




localStorage.clear();