export class MainTaskModel{
    
    #mainTasks=[];
    saveMainTaskInLocalStorage = ()=>{
        
        localStorage.setItem('mainTasks',JSON.stringify(this.#mainTasks));
    }
    getMainTaskInLocalStorage = ()=> localStorage.getItem('mainTasks')  
    
    fetchMainTasks = async ()=>{
        // localStorage.removeItem('mainTasks');
        var mainTaskInLocalStorage=this.getMainTaskInLocalStorage();
    
        if (mainTaskInLocalStorage){
            this.#mainTasks = JSON.parse(mainTaskInLocalStorage);
            return;
        }
        try {
            const response = await fetch('./JSON/MainTasks.json');
            if (response.ok !==true) 
                throw new Error('Ошибка при загрузке данных главных задач');
    
            const data = await response.json();
            this.#mainTasks= data;
            this.saveMainTaskInLocalStorage()
        }
        catch (error) {
            throw new Error(error);
        }
    }
    getAllMainTasks=()=>{
        return this.#mainTasks;
    }
    getMainTaskById=(id_MainTask)=>{
      
        return this.#mainTasks.find(task=>task.id_MainTask==id_MainTask);
    }
    getMainTaskByText=(text)=>{
         return this.#mainTasks.find(task=>task.mainTask==text)
    }
    editTitle = async (id_MainTask,title)=>{
        try {
           
            var isExist = this.getMainTaskByText(title)
            if (isExist){
                throw new Error('Такая задача уже существует');
            }
            this.#mainTasks.map(task=>{
                if (task.id_MainTask==id_MainTask){
                    task.mainTask=title;
                }
                return task;
            })
           
          
            this.saveMainTaskInLocalStorage();
        }
        catch (error) { 
            throw new Error(error);
        }
    }
    createNewMainTask = async (mainTask)=>{
        try {
            var isExist = this.getMainTaskByText(mainTask)
            if (isExist){
                throw new Error('Такая задача уже существует');
            }
            if (this.#mainTasks.length==0){
                this.#mainTasks.push({id_MainTask:1,mainTask});
            }
            else{
                var id_MainTask = this.#mainTasks[this.#mainTasks.length-1].id_MainTask+1;
                this.#mainTasks.push({id_MainTask,mainTask});
            }
           
            this.saveMainTaskInLocalStorage();
        }
        catch (error) { 
            throw new Error(error);
        }
    }
    removeMainTask = async (id_MainTask)=>{
        try {
            var isExist = this.getMainTaskById(id_MainTask)
            if (!isExist){
                throw new Error('Такая задача не существует');
            }
            this.#mainTasks =  this.#mainTasks.filter(task=>task.id_MainTask!=id_MainTask)
                  
            this.saveMainTaskInLocalStorage();
        }
        catch (error) { 
            throw new Error(error);
        }
    }
     
}