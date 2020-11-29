export class ToDoList{
    constructor(){
        this.tdList = new Array(); 
    }
    addToDo(toDo){
        this.tdList.push(toDo); 
    }
    renderToDo(){
        let content = ""; 
        content =  this.tdList.reduceRight((tdContent, item, index)=>{
            //tdContent = tdContent (nội dung cũ) + nội dung mới 
            tdContent += `
            <li>
                <span>${item.textTodo}</span>
                <div class="buttons"> 
                <button class="remove" data-index="${index}" data-status="${item.status}" onclick = "deleteTodo(event)">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="complete" data-index="${index}" data-status="${item.status}" onclick="completeToDo(event)">
                <i class="fa fa-check-circle"></i>        
                </button>
                </div>
            </li>
            `;
            return tdContent; 
        }, "");
        return content; 
    }
    removeToDo(index){
        this.tdList.splice(index,1); 
    }
    sortToDoList(isDES){
        this.tdList.sort((todo, nextToDo)=>{
            const textA = todo.textTodo.toLowerCase(); 
            const textB = nextToDo.textTodo.toLowerCase(); 
            //ASC
            return textB.localeCompare(textA);
        }); 
        if(isDES){
            this.tdList.reverse(); 
        }
    }
}