export class ErrorView{
    #containerForErrorPage;
    constructor(){
        this.#containerForErrorPage= document.createElement('div');
        this.#containerForErrorPage.className='errorPage';
    }
    renderErrorPage = (error)=>{
        var errorTitle= document.createElement('h1');
        errorTitle.innerText='Ошибка';
        errorTitle.className='errorPage__Title';
        this.#containerForErrorPage.appendChild(errorTitle);

        var errorMessage= document.createElement('p');
        errorMessage.innerText=error.message;
        errorMessage.className='errorPage__Message';
        this.#containerForErrorPage.appendChild(errorMessage);
        document.body.appendChild(this.#containerForErrorPage);
    }
  
}