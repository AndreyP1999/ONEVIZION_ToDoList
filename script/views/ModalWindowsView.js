export class ModalWindowsView{
    #containerForModalWindows;
    #content;
    constructor(){
        this.#containerForModalWindows= document.createElement('div');
        this.#containerForModalWindows.className='modalWindows';
        this.#containerForModalWindows.dataset.action='close';
        this.#content  = document.createElement('form');
        this.#content.className='modalWindows__content';
        
        this.#containerForModalWindows.appendChild(this.#content);
        var handlerClickForModalWindows=(event)=>{
            if (event.target.dataset.action==='close') {
                this.closeModalWindows();
            }
        }
        this.#containerForModalWindows.onclick = handlerClickForModalWindows;  
    }
    addClickEventForModalWindows=(handlerClickForModalWindows)=>{
        this.#containerForModalWindows.onclick=handlerClickForModalWindows;
    }
    addSubmitEvent=(handlerSubmitForModalWindows)=>{
      
        this.#content.onsubmit=handlerSubmitForModalWindows;
    
    }
    closeModalWindows=()=>{
        this.#containerForModalWindows.remove();
        this.#content.innerText=""
   
    }
    renderModalWindows=()=>{
        document.body.appendChild(this.#containerForModalWindows);
    }
    addInpytForModalWindows=(type="text",name="",placeholder="",value="",handlerChange=null)=>{
        var input = document.createElement('input');
        input.type=type;
        input.name=name;
        input.className='modalWindows__input';
        input.placeholder=placeholder;
        input.value=value;
        if (handlerChange) {
            input.onclick = handlerChange;
        }

        this.#content.appendChild(input);
    }
    addButtonForModalWindows=(text,type="submit")=>{
        var button = document.createElement('button');
        button.type=type;
        button.textContent=text;
  
       if (type=="close") {
            button.className='modalWindows__button --close';
            button.onclick=this.closeModalWindows;
            button.dataset.action='close';

        }
        else{
            button.className='modalWindows__button --submit';
           
        }
        this.#content.appendChild(button);
    }

}