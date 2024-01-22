const boxes = document.querySelectorAll('.box');
const answerList = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
const new_btn = document.querySelector('#new-btn');
const curr_info = document.querySelector('#curr-info');
let grid;
let currentPlayer;

function initGame(){
    currentPlayer = 'X';
    grid = ['', '','','','','','','',''];

    boxes.forEach((box)=>{
        box.style.backgroundColor = 'transparent';
        box.style.pointerEvents = 'auto';
        box.textContent = '';
    })

    new_btn.style.opacity = '0';
    new_btn.style.pointerEvents = 'none';

    curr_info.innerText = `Current Player : ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(box,index);
    })
})

function handleClick(box,index){
    box.textContent = currentPlayer;
        grid[index] = `${currentPlayer}`;

        box.style.pointerEvents = 'none';

        if (GameFinished());
        else togglePlayer();
}

function togglePlayer(){
    if (currentPlayer==='X'){
        currentPlayer='O';
    }
    else currentPlayer = 'X';

    curr_info.innerText = `Current Player : ${currentPlayer}`;
}

function GameFinished(){
    let answer = '';
    answerList.forEach((set)=>{
        
        if (grid[set[0]]===currentPlayer && grid[set[1]]===currentPlayer && grid[set[2]]===currentPlayer){
            answer = currentPlayer;
            set.forEach((index)=>{
                boxes[index].style.backgroundColor = 'green';
            })
        }
    })
    //console.log(answer);
    if (answer!==''){
        //console.log("i am here");
        curr_info.innerText = `Winner : ${answer}`;
        boxes.forEach((box)=>{
            box.style.pointerEvents = 'none';
        })
        new_btn.style.opacity = '100';
        new_btn.style.pointerEvents = 'auto';

        return true;
    }

    let fillcnt = 0;
    for (let i=0; i<9; i++){
        if (grid[i]!=='') fillcnt++;
    }

    if (fillcnt===9){
        curr_info.innerText = 'Game Tied!!';
        boxes.forEach((box)=>{
            box.style.pointerEvents = 'none';
        })
        new_btn.style.opacity = '100';
        new_btn.style.pointerEvents = 'auto';

        return true;
    }

    return false;
}

