// Defining Variables and Constants
let initDirection = {
    x: 0,
    y: 0
};
let score = 0;
let lastTime = 0;
let gameSpeed = 10;
let snake = [ 
    { x: 10, y: 10 }

]; //Defining the intiial snakeArray

let food = { x: 3, y: 14 };

//Event listeners for navigation
const button1 = document.getElementById('arrowUp');
const button2 = document.getElementById('arrowDown');
const button3 = document.getElementById('arrowLeft');
const button4 = document.getElementById('arrowRight');

// Add event listeners to the buttons
button1.addEventListener('click', () => handleClick(1));
button2.addEventListener('click', () => handleClick(2));
button3.addEventListener('click', () => handleClick(3));
button4.addEventListener('click', () => handleClick(4));

// Event handler function
function handleClick(buttonNumber) {
  switch (buttonNumber) {
    case 1:
      // Code to execute when button 1 is clicked
        initDirection.x = 0;
        initDirection.y = -1;
        break;
    case 2:
      // Code to execute when button 2 is clicked
        initDirection.x = 0;
        initDirection.y = 1;
        break;
    case 3:
      // Code to execute when button 3 is clicked
        initDirection.x = -1;
        initDirection.y = 0;
        break;
    case 4:
      // Code to execute when button 4 is clicked
        initDirection.x = 1;
        initDirection.y = 0;     
        break;
    default:
      break;
  }
}
window.addEventListener('keydown', e => {
    initDirection = { x: 0, y: 1 }; // Start the game
    switch (e.key) {
        case "ArrowUp":
            initDirection.x = 0;
            initDirection.y = -1;
            break;
        case "ArrowDown":
            initDirection.x = 0;
            initDirection.y = 1;
            break;
        case "ArrowLeft":
            initDirection.x = -1;
            initDirection.y = 0;
            break;
        case "ArrowRight":
            initDirection.x = 1;
            initDirection.y = 0;
            break;
        default:
            break;
    }
});

// Game Rendering Loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / gameSpeed) {
        return;
    }
    lastTime = ctime;
    gameFunction();
}

//Collision Check
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    
}
//Main Game Function
function gameFunction() {
 
        
        
        if(isCollide(snake)){
            initDirection={x:0,y:0};
            snake=[{x:15,y:15}];
            score=0;
            alert("You have lost the game");
            location.reload()
        }

        if(snake[0].y=== food.y && snake[0].x===food.x){
            score+=1;
            gameSpeed+=1;
            scorebox.innerHTML="Score: "+score;
            snake.unshift({x:snake[0].x+initDirection.x, y:snake[0].y+initDirection.y});
            let a=2;
            let b=17;
            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
            gameSpeed+=0.2;
        }

    //Moving the Snake
        for(let i=snake.length-2;i>=0;i--){
            snake[i+1]={...snake[i]};
        }
        snake[0].x+=initDirection.x;
        snake[0].y+=initDirection.y;

        board.innerHTML = "";
        snake.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    
}

function isCollide(snake){
    for(let i=1;i<snake.length;i++){
        //bumping into self
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
            return true;
        //bumping into walls
        if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0)
            return true;
    }
    return false;
}

window.addEventListener('keydown', e => {
    initDirection = { x: 0, y: 1 }; // Start the game
    switch (e.key) {
        case "ArrowUp":
            initDirection.x = 0;
            initDirection.y = -1;
            break;
        case "ArrowDown":
            initDirection.x = 0;
            initDirection.y = 1;
            break;
        case "ArrowLeft":
            initDirection.x = -1;
            initDirection.y = 0;
            break;
        case "ArrowRight":
            initDirection.x = 1;
            initDirection.y = 0;
            break;
        default:
            break;
    }
});

// Start Game Loop
window.requestAnimationFrame(main);