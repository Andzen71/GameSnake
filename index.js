let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// create field
for (let i=1; i < 101; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

// Num field
let excel = document.getElementsByClassName('excel');
let x = 1;
    y = 10;
for(let i=0; i < 100; i++){
    if(x == 11){
        x = 1;
        y--;
    };
    excel[i].setAttribute("posX", x);
    excel[i].setAttribute("posY", y);
    x++;
}
// random spawn snake
function generateSnake(){
    let posX = Math.round(Math.random()*(10-3)+3);
    let posY = Math.round(Math.random()*(10-1)+1);
    return [posX, posY];
}
let spawnCoordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + spawnCoordinates[0] + '"][posY = "' + spawnCoordinates[1] + '"]'), document.querySelector('[posX = "' + (spawnCoordinates[0]-1) + '"][posY = "' + spawnCoordinates[1] + '"]'), document.querySelector('[posX = "' + (spawnCoordinates[0]-2) + '"][posY = "' + spawnCoordinates[1] + '"]')];

for(let i=0; i<snakeBody.length; i++){
    snakeBody[i].classList.add('snake-body');
}
snakeBody[0].classList.add('snake-head');

// spawn mouse

let mouse;

function createMouse(){
        function generateMouse(){
            let posX = Math.round(Math.random()*(10-3)+3);
            let posY = Math.round(Math.random()*(10-1)+1);
            return [posX, posY];
        };
        
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
        
        while(mouse.classList.contains('snake-body') || mouse.classList.contains('snake-head')){
            let  mouseCoordinates = generateMouse();
            mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
        }
        
        mouse.classList.add('mouse');
}
createMouse();

// move

let direction = 'right';

function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snake-head');
    snakeBody[snakeBody.length-1].classList.remove('snake-body');
    snakeBody.pop();

    // else = make snake go trought wall
    if(direction == 'right'){
       if(snakeCoordinates[0]<10){
        snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
         snakeBody.unshift(document.querySelector('[posX = "' + 1 + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } 
    } else if(direction == 'left'){
        if(snakeCoordinates[0]>1){
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
         } else {
          snakeBody.unshift(document.querySelector('[posX = "' + 10 + '"][posY = "' + snakeCoordinates[1] + '"]'));
         } 
     }
     else if(direction == 'up'){
        if(snakeCoordinates[1]<10){
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
         } else {
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + 1 + '"]'));
         } 
     }
     else if(direction == 'down'){
        if(snakeCoordinates[1]>1){
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
         } else {
          snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + 10 + '"]'));
         } 
     }
    
     if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
         mouse.classList.remove('mouse');
         createMouse();
         score += 10;
         input.value = `Ты набрал ${score} очков`;
         let a = snakeBody[snakeBody.length-1].getAttribute('posX');
         let b = snakeBody[snakeBody.length-1].getAttribute('posY');
         snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
         
     }

     // end of game
     if(snakeBody[0].classList.contains('snake-body')){
         alert('YoU LooS3r!!!');
         clearInterval(speed);
     }

    snakeBody[0].classList.add('snake-head');
    for(let i=0; i<snakeBody.length; i++){
        snakeBody[i].classList.add('snake-body');
                
    }
}
let speed = setInterval(move, 300);

// pressing rowKeys
window.addEventListener('keydown', function(e){
    if(e.keyCode == 37 && direction != 'right'){
        direction = 'left';
    }
    else if(e.keyCode == 38 && direction != 'down'){
        direction = 'up';
    }
    else if(e.keyCode == 39 && direction != 'left'){
        direction = 'right';
    }
    else if(e.keyCode == 40 && direction != 'up'){
        direction = 'down';
    }
})


// count
let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 0px;
font-size: 30px;
display: block;
`;
let score = 0;
input.value = `Ты набрал ${score} очков`;