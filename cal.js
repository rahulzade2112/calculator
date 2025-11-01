let display=document.getElementsByClassName('display');
let buttons=Array.from(document.getElementsByClassName('button'));
buttons.map(button =>{
    button.addEventListener('click',(e)=>{
        switch(e.target.innerText){
            case 'AC':
                display[0].innerText='';
                break;
            case 'back':
                if(display[0].innerText){
                    display[0].innerText=display[0].innerText.slice(0,-1);
                } 
                break;
            case '=':
                try{
                    display[0].innerText=eval(display[0].innerText);
                }catch{
                    display[0].innerText='Error!';
                } 
                break;
            default:
                display[0].innerText+=e.target.innerText;
                console.log(e.target.innerText);
        }
    });
}); 