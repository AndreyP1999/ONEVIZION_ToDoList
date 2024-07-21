export class LoadingView{
    #containerForLoadingPage;
    constructor(){
        this.#containerForLoadingPage= document.createElement('div');
        this.#containerForLoadingPage.className='loadingPage';
    }
    renderLoadingMainPage=()=>{
        var spinner= document.createElement('div');
        spinner.className='loadingPage__spinner';
        this.#containerForLoadingPage.appendChild(spinner);
        document.body.appendChild(this.#containerForLoadingPage);
    }
    closeLoadingMainPage=()=>{
        this.#containerForLoadingPage.className=""
        this.#containerForLoadingPage.remove();
    }
}