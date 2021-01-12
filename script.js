let canvas = document.getElementById("cobra"); /* notar que está sendo utilizado elementos DOM */
let context = canvas.getContext("2d"); /* está tratando o arquivo como 2d */
let box = 32;
let cobra = [];
cobra[0] = { /* determinando um tamanho */
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //criação de numero aleatorio
    y: Math.floor(Math.random() * 15 + 1) * box
}
let texto = "GAME OVER"

function criarBG() {
    context.fillStyle = "lightgreen"; /* essa aqui é a cor do contexto */
    context.fillRect(0, 0, 16 * box, 16 * box); /*aqui é onde vai acontecer o jogo. O fillRect trabalha com 4 parametros: x, y, altura e largura. 
    Como será trabalhado em quadrado, foi definido 32px (escrito no box) */
}

function criarCobrinha() {
    for(i=0; i < cobra.length; i++) {
        context.fillStyle = "black"; // define a cor da cobrinha
        context.fillRect(cobra[i].x, cobra[i].y, box, box); //cobra vai ter o tamanho definido por x e y e vai ficar do tamanho do box. o 8 é para ficar exatamente no meio
    }
}

function comida() { //aparecer a "comida" na tela
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //quando acontecer o evento de keydown, vai chamar a função update

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"; //a direção não pode ser oposta, para não dar erro no tamanho da cobra (não criar duas cabeças)
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function gameOver(){
    context.fillStyle = "black";
    //continuar daqui    
}

function iniciarJogo() {

    for(i = 1; i < cobra.length; i++){
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo); //se a cobra se chocar, o jogo vai parar com o clear interval;
            gameOver()
        }
    }

    if(cobra[0].x > 15 * box && direction == "right") cobra[0].x = 0;
    if(cobra[0].x < 0 * box && direction == "left") cobra[0].x = 16 * box;
    if(cobra[0].y > 15 * box && direction == "down") cobra[0].y = 0;
    if(cobra[0].y < 0 * box && direction == "up") cobra[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    comida();

    //ponto de partida - setar os movimentos da cobra
    let cobraX = cobra[0].x; //array na posição 0 de x e abaixo, na posição 0 de y
    let cobraY = cobra[0].y;
    
    if(direction == "right") cobraX += box; // se a direção for a direita, a cobra irá para um quadro ao lado
    if(direction == "left") cobraX -= box; // para a esquerda, é decrementado, para simular que está indo a esquerda (plano cartesiano)
    if(direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    if(cobraX != food.x || cobraY != food.y){ 
        cobra.pop();
    }else{ //adiciona ao corpo da cobra quando ela come
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let cabeca = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(cabeca);
}

let jogo = setInterval(iniciarJogo, 100); // seta um intervalo de 100milissegundos para reiniciar em caso do jogo travar
