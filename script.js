let order = [];
let clickedOrder = [];
let score = 00;
let audioHab = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const scoreMarc = document.querySelector('.score');
const BoxNewGame = document.querySelector('.start-game');
const btnNewGame = document.querySelector('.title-new');
const BoxGameOver = document.querySelector('.game-over');
const btnGameOver = document.querySelector('.title-end');
const scoreEnd = document.querySelector('.score-end');
const btnPlayMusic = document.querySelector('.Music');

/*Efeitos sonoros*/
const BlueAudio = document.querySelector('.audioBlue');
const YellowAudio = document.querySelector('.audioYellow');
const RedAudio = document.querySelector('.audioRed');
const GreenAudio = document.querySelector('.audioGreen');



//Pausa a musica de fundo
let pauseMusic = () => {
    let audio = document.querySelector('.player');
    btnPlayMusic.innerHTML = '🔈'
    audio.pause();
}

//inica a musica de fundo
let playMusic = () => {
    let audio = document.querySelector('.player');
    btnPlayMusic.innerHTML = '🔊'
    audio.play();
}

//Pausa todos os sons apos perder
let overMusic = () => {
    GreenAudio.pause();
    YellowAudio.pause();
    RedAudio.pause();
    BlueAudio.pause();
}

//Toca Som da cor selecionada
let soundEffect = (element) => {
    if(element == 'green'){
        GreenAudio.play();
    }else if(element == 'yellow'){
        YellowAudio.play();
    }else if(element == 'red'){
        RedAudio.play();
    }else if(element == 'blue'){
        BlueAudio.play();
    }
}

//Toca Som da cor selecionada Quando Clickado
let soundEffectClick = (e) => {
    if(e == 0){
        GreenAudio.play();
    }else if(e == 1){
        RedAudio.play();
    }else if(e == 2){
        YellowAudio.play();
    }else if(e == 3){
        BlueAudio.play();
    }
}

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
        soundEffect(element.classList[0]);
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    },500);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        setTimeout(() => {nextLevel();},500);
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    soundEffectClick(color);
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    scoreMarc.innerHTML = `Pontuação: ${score - 1}`;
    scoreEnd.innerHTML = `Pontuação: ${score - 2}`;
    blue.classList.remove('selected');
    red.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    overMusic();
    order = [];
    clickedOrder = [];
    BoxGameOver.classList.add('active');
}

//funcao de inicio do jogo
let playGame = () => {
    blue.classList.remove('selected');
    yellow.classList.remove('selected');
    red.classList.remove('selected');
    green.classList.remove('selected');
    pauseMusic();
    order = [];
    clickedOrder = [];
    score = 0;
    console.log(order);
    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
btnNewGame.onclick = () => {
    BoxNewGame.classList.add('desative');
    score = 0;
    playMusic();
    playGame();
}

btnGameOver.onclick = () => {
    BoxGameOver.classList.remove('active');
    score = 0;
    playGame();
}

btnPlayMusic.onclick = () => {
    if(audioHab == false){
        playMusic();
        audioHab = true;
    }else{
        pauseMusic();
        audioHab = false;
    }
}