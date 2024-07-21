export class SubTaskModel{
    #subTask;
    saveSubTaskInLocalStorage = ()=>{
     
         localStorage.setItem('subTasks',JSON.stringify(this.#subTask));
    }
    getSubTaskInLocalStorage = ()=> localStorage.getItem('subTasks')
    changeStatus = async (id_SubTask,status)=>{
        try {
            var isChangeStatus=false;

            this.#subTask = this.#subTask.map(task => {
                if(task.id_SubTask === Number(id_SubTask)){
                    isChangeStatus=true;
                    return  {...task,status:status?"done":"todo"}
                }
                else{
                    return {...task};
                }
            });
            
            if (!isChangeStatus){
                throw new Error('Нет такой подзадачи');
            }
            this.saveSubTaskInLocalStorage();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    removeSubTask = async (id_SubTask)=>{
        try {
         
          
           if (this.#subTask.length===0){
                throw  new Error('Нет подзадач для удаления');
           }
          
           else{
                const newSubTasks = this.#subTask.filter(task=>task.id_SubTask!=id_SubTask);
                this.#subTask = newSubTasks;
           }
           this.saveSubTaskInLocalStorage(this.#subTask);
        } catch (error) {
            throw new Error(error);
        }
        
    }
    removeSubTasksForMainTask = async (id_MainTask)=>{
        try {
            var isExist = this.getSubTasksForMainTask(id_MainTask)
            if (!isExist){
                throw new Error('Такая задача не существует');
            }
            this.#subTask =  this.#subTask.filter(task=>task.id_MainTask!=id_MainTask)
                  
            this.saveSubTaskInLocalStorage();
        }
        catch (error) { 
            throw new Error(error);
        }
    }
    fetchSubTasks = async (id_MainTask)=>{
        // localStorage.clear();
        var subTaskInLocalStorage=this.getSubTaskInLocalStorage();
        if (subTaskInLocalStorage){
            this.#subTask = JSON.parse(subTaskInLocalStorage);
            return;
        }
        try {
            const response = await fetch('./JSON/SubTasks.json');
            if (response.ok !==true) 
                throw new Error('Ошибка при загрузке данных подзадач');
            var data = await response.json();
            this.#subTask= data;
            this.saveSubTaskInLocalStorage();
        }
        catch (error) {
            
            throw new Error(error);
        }
    }
    getAllSubTasks=()=>{
        return this.#subTask;
    }
    getSubTasksForMainTask=(id_MainTask)=>{
        console.log(this.#subTask);
        return this.#subTask.filter(task=>task.id_MainTask==id_MainTask);
    }
    createNewSubTask = async (id_MainTask,subTask)=>{
        try {
           if (this.#subTask.length==0){
                var newSubTask={
                    id_MainTask,
                    id_SubTask:1,
                    subTask,
                    status:'todo'
                }
                this.#subTask.push(newSubTask);
            }
            else{
                    var lastIdSubTask=this.#subTask[this.#subTask.length-1].id_SubTask;
                    var newSubTask={
                        id_MainTask,
                        id_SubTask:lastIdSubTask+1,
                        subTask,
                        status:'todo'
                    }
                    this.#subTask.push(newSubTask);
            }
          
           
            this.saveSubTaskInLocalStorage();
        }
        catch (error) {
            throw new Error(error);
        }
    }
}