const FLIP_HALF_DELAY = 100
var desconocido = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/640px-Icon-round-Question_mark.svg.png"
var images = []
var x = -1
var y = -1
var valor = 0
var turno = 1
var player = 1
var i = -1
var j = -1
var l = -1
var k = -1
var bgElement = document.querySelector("#bg")
var gameElement = document.querySelector(".game")
let gameContent = gameElement.innerHTML
let sizeBoard = document.querySelector(".board-size")
let showSizeBoard = sizeBoard
let result = document.querySelector(".final")
let board = []
let currentBoard = []
let botBoard = []
let elements = []
let encontrado = []
let encontradoJugador = []
let encontradoJugador2 = []
let encontradoJugador3 = []
let encontradoJugador4 = []
let encontradoBot = []
let botScore = document.querySelector(".player-indicator.vs-bot p")
let greenScore = document.querySelector(".player-indicator.one p")
let skyBlueScore = document.querySelector(".player-indicator.two p")
let pinkScore = document.querySelector(".player-indicator.three p")
let yellowScore = document.querySelector(".player-indicator.four p")
let botMemory = []
let botMemoryRow = []
let chance = 80
let players = 0
let seeBoardSize = []
let = width = ""
let = height = ""
let temporalBoardSize = ""
let classSelected = ""
let simulateBoardScreen = ""
let playerOne = document.querySelector(".player-indicator")


function backgroundImage() {
    let randomImg = (getRandomInt(5)+1)
    let bgImage = `url(fondos/fondo${randomImg}.jpg)`
    bgElement.style.backgroundImage = bgImage
}
backgroundImage()

function createBoard(width, height) {
    if (width%2 == 1 && height%2 == 1) return
    boardSize(width,height);
    var elementNumbers = (width*height)/2;
    loadImages(elementNumbers)
    loadElements(elementNumbers);
    rellenar(elements);
    rellenar(elements);
    printBoard();
    encontrado = []
    encontradoBot = []
    encontradoJugador = []
    gameElement.setAttribute("style","width:"+width*110+"px; height:"+height*110+"px;")
    // playerOne.setAttribute("style","width:" +width*55+"px; height:"+height*55+"px;")
}

function createBoardPvP(width, height) {
    if (width%2 == 1 && height%2 == 1) return 
    player = 1
    boardSize(width,height);
    var elementNumbers = (width*height)/2; 
    loadImages(elementNumbers)
    loadElements(elementNumbers);
    rellenar(elements);
    rellenar(elements);
    printBoardPvP();
    encontrado = []
    encontradoJugador = []
    encontradoJugador2 = []
    encontradoJugador3 = []
    encontradoJugador4 = []
    gameElement.setAttribute("style","width:"+width*110+"px; height:"+height*110+"px;")
}

function createBoardPractice(width, height) {
    if (width%2 == 1 && height%2 == 1) return 
    player = 1
    boardSize(width,height);
    var elementNumbers = (width*height)/2; 
    loadImages(elementNumbers)
    loadElements(elementNumbers);
    rellenar(elements);
    rellenar(elements);
    printBoardPractice();
    encontrado = []
    gameElement.setAttribute("style","width:"+width*110+"px; height:"+height*110+"px;")
}

function getRandomInt(max) { // Me devuelve numeros enteros tal que 0 <= x < max
    return Math.floor(Math.random() * max);
}

function boardSize(width, height) {
    board = [];
    let row = [];
    currentBoard = [];
    let emptyRow = [];
    botBoard = []
    let botRow = []
    for (let i = 0; i < width; i++) {
        row.push("Empty");
        emptyRow.push({img:desconocido});
        botRow.push("_")

    }
    for (let i = 0; i < height; i++) {
        board.push(JSON.parse(JSON.stringify(row)));
        currentBoard.push(JSON.parse(JSON.stringify(emptyRow)));
        botBoard.push(JSON.parse(JSON.stringify(botRow)));
    }
}

function loadImages (elementNumbers) {
    var selectedImage = []
    for (var i = 0; i < elementNumbers; i++) {
        var x = (getRandomInt(856)+1)
        while(selectedImage.includes(x)){
            x = (getRandomInt(856)+1)
        }
        var image = `elementos/poke (${x}).png`
        var img=new Image();
        img.src=image;
        selectedImage.push(x)
        images.push(image)
    }
}

function loadElements(elementNumbers) {
    elements = []
    var imagesCopy = images
    for (var i = 0; i < elementNumbers; i++){
        x = (getRandomInt(imagesCopy.length))
        elements.push(imagesCopy[x])
        imagesCopy.splice(x,1)
    }
}

function rellenar (elements) { // Rellena tablero con un elemento de cada tipo de forma aleatoria
    for (var i = 0; i < elements.length; i++) {
        var x = (getRandomInt(board.length))
        var y = (getRandomInt(board[0].length))
        while (board[x][y] != "Empty") {
            x = (getRandomInt(board.length))
            y = (getRandomInt(board[0].length))
        }
        board[x][y] = elements[i]
    }
}

function printBoard() { // dibuja el tablero completamente vacio
    // gameElement.innerHTML = ""
    let temporalBoard = ""
    for (var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[0].length; j++){
            var boton =
            `<button class="button ${currentBoard[i][j].winner}" onclick='jugador(this)' data-i="${i}" data-j="${j}" style='width: 100px; height: 100px;'>
            <img src='${currentBoard[i][j].img}' style='width: 90%;height 90%'>
            </button>`
            temporalBoard+=boton
        }
    }
    gameElement.innerHTML=gameContent + temporalBoard
    // muestra en pantalla al board con botones para seleccionar casillas
}

function printBoardPvP() { // dibuja el tablero completamente vacio
    let temporalBoard = ""
    for (var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[0].length; j++){
            var boton =
            `<button class="button ${currentBoard[i][j].winner}" onclick='jugadorPvP(this)' data-i="${i}" data-j="${j}" style='width: 100px; height: 100px;'>
            <img src='${currentBoard[i][j].img}' style='width: 90%;height 90%'>
            </button>`
            temporalBoard+=boton
        }
    }
    gameElement.innerHTML=gameContent + temporalBoard
    // muestra en pantalla al board con botones para seleccionar casillas
}

function printBoardPractice() { // dibuja el tablero completamente vacio
    let temporalBoard = ""
    for (var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[0].length; j++){
            var boton =
            `<button class="button ${currentBoard[i][j].winner}" onclick='jugadorPractice(this)' data-i="${i}" data-j="${j}" style='width: 100px; height: 100px;'>
            <img src='${currentBoard[i][j].img}' style='width: 90%;height 90%'>
            </button>`
            temporalBoard+=boton
        }
    }
    gameElement.innerHTML=gameContent + temporalBoard
    // muestra en pantalla al board con botones para seleccionar casillas
}

function jugador(element){
    i = element.dataset.i
    j = element.dataset.j
    if (encontrado.includes(board[i][j])) return
    if (turno == 1) {
        element.classList.add("click")
        setTimeout(() => {
            currentBoard[i][j].img = board[i][j]
            botBoard[i][j] = board[i][j]
            x = i
            y = j
            valor = board[i][j]
            turno = 2
            printBoard()
        }, FLIP_HALF_DELAY);
    }
    else if (turno == 2) {
        if (i==x && j==y) return
        element.classList.add("click")
        if ((board[i][j] == valor) && ((x!=i)||(y!=j))){
            encontrado.push(board[i][j])
            setTimeout(() => {
                encontradoJugador.push(board[i][j])
                greenScore.innerHTML = "x" + encontradoJugador.length                
                currentBoard[i][j].img = board[i][j]
                botBoard[i][j] = board[i][j]
                currentBoard[i][j].winner = "player player::before"
                currentBoard[x][y].winner = "player player::before"
                turno = 1
                printBoard()
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("catch")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("catch")
                setTimeout(() => {
                    printBoard()
                }, 200);
            }, FLIP_HALF_DELAY);
            setTimeout(() => {
                verificarFin()
            }, 401);
        }
 else {
            element.classList.add("click")
            valor = board[i][j]
            setTimeout(() => {
                currentBoard[i][j].img = board[i][j]
                botBoard[i][j] = board[i][j]
                printBoard(true)
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("miss")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("miss")
                setTimeout(() => {
                    printBoard()
                    document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                    document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("click")
                    setTimeout(() => {
                        currentBoard[i][j].img = desconocido
                        currentBoard[x][y].img = desconocido
                        turno = 3
                        printBoard()
                        setTimeout(() => {
                            botSelect();
                        }, 300);
                    }, 100);
                }, 500);
            }, FLIP_HALF_DELAY);
            gameElement.classList.add("enemy-turn")
        }
    }
}

function botSelect (){
    gameElement.classList.add("enemy-turn")
    document.querySelector(".one").classList.remove("green-turn")
    document.querySelector(".vs-bot").classList.add("bot-turn")
    if (encontrado.length == elements.length) return

    if (turno == 3) {
        i = getRandomInt(board.length)
        j = getRandomInt(board[0].length)
        while (currentBoard[i][j].img != desconocido) {
            i = getRandomInt(board.length)
            j = getRandomInt(board[0].length)
        }
        document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
        setTimeout(() => {
            currentBoard[i][j].img = board[i][j]
            botBoard[i][j] = board[i][j]
            x = i
            y = j
            valor = board[i][j]
            printBoard()
        }, FLIP_HALF_DELAY);
        setTimeout(() => {
            turno = 4
            botSelect();
        }, 500);
    }

    if (turno == 4) {
        botInteligence()
        if (x!=i || y!=j) {
            let luck = (getRandomInt(100)+1)
            if (luck > chance) {
                currentBoard[x][y].img = board[i][j]
                printBoard()
                encontrado.push(board[i][j])
                encontradoBot.push(board[i][j])
                botScore.innerHTML = "x" + encontradoBot.length 
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                setTimeout(() => {
                    currentBoard[i][j].img = board[i][j]
                    botBoard[x][y] = board[i][j]
                    currentBoard[i][j].winner = "bot"
                    currentBoard[x][y].winner = "bot"
                    printBoard()
                    document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("catch")
                    document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("catch")
                    setTimeout(() => {
                        turno = 3
                        player = 2
                        botSelect()
                        setTimeout(() => {
                            verificarFin()
                            printBoard()
                        }, 1);
                    }, 600);
                }, FLIP_HALF_DELAY);
            }
            else {
                x = i
                y = j
                turno = 5
            }
        }
        else {
            turno = 5
            botSelect()
        }
        if (turno == 5) {
            i = (getRandomInt(board.length))
            j = (getRandomInt(board[0].length))
            while (currentBoard[i][j].img != desconocido) {
                i = (getRandomInt(board.length))
                j = (getRandomInt(board[0].length))
            }
            if ((board[i][j] == valor) && ((x!=i)||(y!=j))){
                encontrado.push(board[i][j])
                encontradoBot.push(board[i][j])
                botScore.innerHTML = "x" + encontradoBot.length 
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                setTimeout(() => {
                    currentBoard[i][j].img = board[i][j]
                    botBoard[j][i] = board[i][j]
                    currentBoard[i][j].winner = "bot"
                    currentBoard[x][y].winner = "bot"
                    printBoard()
                    document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("catch")
                    document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("catch")
                    setTimeout(() => {
                        turno = 3
                        player = 2
                        botSelect()
                        setTimeout(() => {
                            verificarFin()
                            printBoard()
                            gameElement.classList.remove("enemy-turn")
                        }, 1);
                    }, 500);
                }, FLIP_HALF_DELAY);
            }
            else {
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                setTimeout(() => {
                    currentBoard[i][j].img = board[i][j]
                    botBoard[i][j] = board[i][j]
                    printBoard(true)
                    document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("miss")
                    document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("miss")
                    setTimeout(() => {
                        currentBoard[i][j].img = desconocido
                        currentBoard[x][y].img = desconocido
                        turno = 1
                        player = 1
                        printBoard()
                        gameElement.classList.remove("enemy-turn")
                        document.querySelector(".one").classList.add("green-turn")
                        document.querySelector(".vs-bot").classList.remove("bot-turn")
                    }, 800);
                }, FLIP_HALF_DELAY);
               
                
            }
        }
    }
}

function verificarFin() {
    let resultPractice = result
    if (encontrado.length == elements.length) {
        if (encontradoBot.length < encontradoJugador.length) {
            resultPractice.innerHTML = "<p>¡YOU WIN!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoBot.length == encontradoJugador.length) {
            resultPractice.innerHTML = "<p>¡TIE!</p>" 
            document.querySelector(".result").classList.remove("hidden")
            turno = 1
        }
        else if (encontradoBot.length > encontradoJugador.length) {
            resultPractice.innerHTML = "<p>¡YOU LOSE!</p>" 
            document.querySelector(".result").classList.remove("hidden")
            turno = 1
        }
    }
    // se verifica si el juego está completo y de ser así se muestra mensaje en pantalla
}

function firstClickPvP (element) {
    if (turno == 1) {
        element.classList.add("click")
        setTimeout(() => {
            currentBoard[i][j].img = board[i][j]
            x = i
            y = j
            valor = board[i][j]
            turno = 2
            printBoardPvP()
        }, FLIP_HALF_DELAY);
    } 
}

function secondClickPvP(element) {
    if (turno == 2) {
        if (i==x && j==y) return
        element.classList.add("click")
        if ((board[i][j] == valor) && ((x!=i)||(y!=j))){
            encontrado.push(board[i][j])
            setTimeout(() => {
                currentBoard[i][j].img = board[i][j]
                printBoardPvP(false)
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("catch")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("catch")
                setTimeout(() => {
                    switch (player) {
                        case 1:                
                            encontradoJugador.push(board[i][j])
                            greenScore.innerHTML = "x" + encontradoJugador.length 
                            currentBoard[i][j].winner = "player"
                            currentBoard[x][y].winner = "player"
                        break
                        case 2:
                            encontradoJugador2.push(board[i][j])
                            skyBlueScore.innerHTML = "x" + encontradoJugador2.length 
                            currentBoard[i][j].winner = "player2"
                            currentBoard[x][y].winner = "player2"
                        break
                        case 3:
                            encontradoJugador3.push(board[i][j])
                            pinkScore.innerHTML = "x" + encontradoJugador3.length 
                            currentBoard[i][j].winner = "player3"
                            currentBoard[x][y].winner = "player3"
                        break
                        case 4:
                            encontradoJugador4.push(board[i][j])
                            yellowScore.innerHTML = "x" + encontradoJugador4.length 
                            currentBoard[i][j].winner = "player4"
                            currentBoard[x][y].winner = "player4"
                        break
                    }
                    turno = 1
                    printBoardPvP()
                    setTimeout(() => {
                        verificarFinPvP()
                    }, 50); 
                }, 200);
            }, FLIP_HALF_DELAY);
        } 
    else { 
        element.classList.add("click")
        gameElement.classList.add("enemy-turn")
        setTimeout(() => {
            currentBoard[i][j].img = board[i][j]
            printBoardPvP(true)
            document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("miss")
            document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("miss")
            setTimeout(() => {
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("click")
                setTimeout(() => {
                    currentBoard[i][j].img = desconocido
                    currentBoard[x][y].img = desconocido
                    turno = 1
                    switch (player) {
                        case 1:                
                            document.querySelector(".one").classList.remove("green-turn")
                            document.querySelector(".two").classList.add("skyblue-turn")
                        break
                        case 2:
                            document.querySelector(".two").classList.remove("skyblue-turn")
                            if (players == 2) {
                                document.querySelector(".one").classList.add("green-turn")
                            } else {
                                document.querySelector(".three").classList.add("pink-turn")
                            }
                        break
                        case 3:
                            document.querySelector(".three").classList.remove("pink-turn")
                            if (players == 3) {
                                document.querySelector(".one").classList.add("green-turn")
                            } else {
                                document.querySelector(".four").classList.add("yellow-turn")
                            }
                        break
                        case 4:
                            document.querySelector(".four").classList.remove("yellow-turn")
                            document.querySelector(".one").classList.add("green-turn")
                        break
                    }
                    if (player < players) {
                        player++
                    } else {
                        player = 1
                    }
                    gameElement.classList.remove("enemy-turn")
                    printBoardPvP()
                }, FLIP_HALF_DELAY);
            }, 500);     
        }, FLIP_HALF_DELAY);
        }
    }
}

function jugadorPvP(element){
    i = element.dataset.i
    j = element.dataset.j
    if (encontrado.includes(board[i][j])) return
    firstClickPvP(element)
    secondClickPvP(element)
}

function verificarFinPvP() {
    if (encontrado.length == elements.length) {
        player = 1
        let resultPractice = result
        if (encontradoJugador.length > encontradoJugador2.length && encontradoJugador.length > encontradoJugador3.length && encontradoJugador.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN WINS!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        } 
        else if (encontradoJugador2.length > encontradoJugador.length && encontradoJugador2.length > encontradoJugador3.length && encontradoJugador2.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡SKYBLUE 2 WINS!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoJugador3.length > encontradoJugador.length && encontradoJugador3.length > encontradoJugador2.length && encontradoJugador3.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡PINK WINS!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoJugador4.length > encontradoJugador.length && encontradoJugador4.length > encontradoJugador2.length && encontradoJugador4.length > encontradoJugador3.length) {
            resultPractice.innerHTML = "<p>¡YELLOW WINS!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoJugador.length == encontradoJugador2.length && encontradoJugador.length == encontradoJugador3.length && encontradoJugador.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡¡¿¿FOUR PLAYERS TIE??!!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoJugador.length == encontradoJugador2.length && encontradoJugador.length == encontradoJugador3.length && encontradoJugador.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN SKYBLUE & PINK WINS!</p>" 
            document.querySelector(".result").classList.remove("hidden")
        }
        else if (encontradoJugador.length > encontradoJugador2.length && encontradoJugador.length == encontradoJugador3.length && encontradoJugador.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN PINK & YELLOW WINS!</p>" 
        }
        else if (encontradoJugador.length == encontradoJugador2.length && encontradoJugador.length > encontradoJugador3.length && encontradoJugador.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN SKYBLUE & YELLOW WINS!</p>" 
        }
        else if (encontradoJugador.length == encontradoJugador2.length && encontradoJugador.length > encontradoJugador3.length && encontradoJugador.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN & SKYBLUE WINS!</p>" 
        }
        else if (encontradoJugador.length > encontradoJugador2.length && encontradoJugador.length == encontradoJugador3.length && encontradoJugador.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN & PINK WINS!</p>" 
        }
        else if (encontradoJugador.length > encontradoJugador2.length && encontradoJugador.length > encontradoJugador3.length && encontradoJugador.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡GREEN & YELLOW WINS!</p>" 
        }
        else if (encontradoJugador2.length > encontradoJugador.length && encontradoJugador2.length == encontradoJugador3.length && encontradoJugador2.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡SKYBLUE PINK $ YELLOW WINS!</p>" 
        }
        else if (encontradoJugador2.length > encontradoJugador.length && encontradoJugador2.length == encontradoJugador3.length && encontradoJugador2.length > encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡SKYBLUE & PINK WINS!</p>" 
        }
        else if (encontradoJugador2.length > encontradoJugador.length && encontradoJugador2.length > encontradoJugador3.length && encontradoJugador2.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡SKYBLUE & YELLOW WINS!</p>" 
        }
        else if (encontradoJugador3.length > encontradoJugador.length && encontradoJugador3.length > encontradoJugador2.length && encontradoJugador3.length == encontradoJugador4.length) {
            resultPractice.innerHTML = "<p>¡PINK & YELLOW WINS!</p>" 
        }
    }
    // se verifica si el juego está completo y de ser así se muestra mensaje en pantalla
}

function jugadorPractice(element){
    i = element.dataset.i
    j = element.dataset.j
    if (encontrado.includes(board[i][j])) return
    if (turno == 1) {
        element.classList.add("click")
        gameElement.classList.add("enemy-turn")
        setTimeout(() => {
            currentBoard[i][j].img = board[i][j]
            x = i
            y = j
            valor = board[i][j]
            turno = 2
            gameElement.classList.remove("enemy-turn")
            printBoardPractice()
        }, FLIP_HALF_DELAY);
    }
    else if (turno == 2) {
        if (i==x && j==y) return
        element.classList.add("click")
        gameElement.classList.add("enemy-turn")
        if ((board[i][j] == valor) && ((x!=i)||(y!=j))){
            encontrado.push(board[i][j])
            encontradoJugador.push(board[i][j])
            greenScore.innerHTML = "x" + encontradoJugador.length 
            setTimeout(() => {
                currentBoard[i][j].img = board[i][j]
                botBoard[i][j] = board[i][j]
                currentBoard[i][j].winner = "player player::before"
                currentBoard[x][y].winner = "player player::before"
                turno = 1
                printBoardPractice()
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("catch")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("catch")
                setTimeout(() => {
                    printBoardPractice()
                    gameElement.classList.remove("enemy-turn")
                }, 200);
            }, FLIP_HALF_DELAY);
            setTimeout(() => {
                verificarFinPractice()
            }, 401);
        }
 else {
            element.classList.add("click")
            gameElement.classList.add("enemy-turn")
            valor = board[i][j]
            setTimeout(() => {
                currentBoard[i][j].img = board[i][j]
                printBoardPractice(true)
                document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("miss")
                document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("miss")
                setTimeout(() => {
                    printBoard()
                    document.querySelector(`.button[data-i="${i}"][data-j="${j}"]`).classList.add("click")
                    document.querySelector(`.button[data-i="${x}"][data-j="${y}"]`).classList.add("click")
                    setTimeout(() => {
                        currentBoard[i][j].img = desconocido
                        currentBoard[x][y].img = desconocido
                        turno = 1
                        printBoardPractice()
                        gameElement.classList.remove("enemy-turn")
                    }, 100);
                }, 500);
            }, FLIP_HALF_DELAY);
        }
    }
}

function verificarFinPractice() {
    if (encontrado.length == elements.length) {
        let resultPractice = result
        resultPractice.innerHTML = "<p> YOU WIN!</p>" 
        document.querySelector(".result").classList.remove("hidden")
    }
    // se verifica si el juego está completo y de ser así se muestra mensaje en pantalla
}

function botInteligence() {
    for (let a = 0; a < botBoard.length; a++){
        for(let b = 0; b < botBoard[0].length; b++) {
            (a!=i)
            if (botBoard[a][b] == board[i][j] && ((a!=i)||(b!=j))) {
                x = a
                y = b
                return
            }
        }
    }
}

let gameMode = 0

function startGame() {
    if ((i1%2 == 1 && j1%2 == 1) || (i == -1 && j == -1) ) {
        return
    } 
    else {
        document.querySelector(".content").classList.add("none")
        document.querySelector(".game").classList.remove("hidden")
        document.querySelector(".game-buttons").classList.remove("none")
        document.querySelector(".two").classList.remove("skyblue-turn")
        document.querySelector(".three").classList.remove("pink-turn")
        document.querySelector(".four").classList.remove("yellow-turn")
        document.querySelector(".vs-bot").classList.remove("bot-turn")
        document.querySelector(".banner").classList.remove("hidden")
        gameElement.classList.remove("enemy-turn")
        greenScore.innerHTML = "x0" 
        skyBlueScore.innerHTML = "x0" 
        pinkScore.innerHTML = "x0" 
        yellowScore.innerHTML = "x0" 
        botScore.innerHTML = "x0" 
        encontrado = []
        encontradoJugador = []
        encontradoJugador2 = []
        encontradoJugador3 = []
        encontradoJugador4 = []
        encontradoBot = []
        turno = 1
        if (gameMode == 1) {
            createBoard((j1),(i1))
            document.querySelector(".vs-bot").classList.remove("hidden")
            document.querySelector(".one").classList.remove("hidden")
            document.querySelector(".one").classList.add("green-turn")

        }
        if(gameMode == 2) {
            createBoardPvP((j1),(i1))
            document.querySelector(".one").classList.add("green-turn")
            document.querySelector(".one").classList.remove("hidden")
            document.querySelector(".two").classList.remove("hidden")
            if (players == 3) { 
                document.querySelector(".three").classList.remove("hidden")
            }
            if (players == 4) {
                document.querySelector(".three").classList.remove("hidden")
                document.querySelector(".four").classList.remove("hidden")
            }
        }
        if(gameMode == 3) {
            createBoardPractice((j1),(i1))
            document.querySelector(".one").classList.remove("hidden")
            document.querySelector(".one").classList.add("green")
            document.querySelector(".one").classList.add("green-turn")
        }
    }
}

function showOptionsPVE() {
    document.querySelectorAll(".menu-button").forEach(button => {
        button.classList.add("hidden")
    })
    document.querySelector(".options-pve").classList.remove("hidden")
    document.querySelector(".bot-difficulty").classList.remove("none")
    document.querySelector(".easy").classList.add("dificulty-selected")
    gameMode = 1
}

function showOptionsPVP() {
    document.querySelectorAll(".menu-button").forEach(button => {
        button.classList.add("hidden")
    })
    document.querySelector(".options-pve").classList.remove("hidden")
    document.querySelector(".multy-player").classList.remove("none")
    document.querySelector(".two-players").classList.add("players-selected")
    gameMode = 2
}

function showOptionsPractice() {
    document.querySelectorAll(".menu-button").forEach(button => {
        button.classList.add("hidden")
    })
    document.querySelector(".options-pve").classList.remove("hidden")
    gameMode = 3
}

function showMenu() {
    document.querySelectorAll(".button-board-size").forEach(e => {e.classList.remove("blue")})
    document.querySelectorAll(".menu-button").forEach(button => {
        button.classList.remove("hidden")
    })
    document.querySelector(".board-size p:nth-child(2)").classList.add("none")
    document.querySelector(".options-pve").classList.add("hidden")
    document.querySelector(".game-buttons").classList.add("none")
    document.querySelector(".content").classList.remove("none")
    document.querySelector(".game").classList.add("hidden")
    document.querySelector(".multy-player").classList.add("none")
    document.querySelector(".bot-difficulty").classList.add("none")
    j=-1
    i=-1
    chance = 80
    players = 2
    document.querySelector(".medium").classList.remove("dificulty-selected")
    document.querySelector(".hard").classList.remove("dificulty-selected")
    document.querySelector(".very-hard").classList.remove("dificulty-selected")
    document.querySelector(".dark-souls").classList.remove("dificulty-selected")
    document.querySelector(".three-players").classList.remove("players-selected")
    document.querySelector(".four-players").classList.remove("players-selected")
    gameMode = 0
    document.querySelector(".vs-bot").classList.add("hidden")
    document.querySelector(".one").classList.add("hidden")
    document.querySelector(".two").classList.add("hidden")
    document.querySelector(".three").classList.add("hidden")
    document.querySelector(".four").classList.add("hidden")
    document.querySelector(".one").classList.remove("green-turn")
    document.querySelector(".two").classList.remove("skyblue-turn")
    document.querySelector(".three").classList.remove("pink-turn")
    document.querySelector(".four").classList.remove("yellow-turn")
    document.querySelector(".vs-bot").classList.remove("bot-turn")
    document.querySelector(".banner").classList.add("hidden")

}

function seeBoard() {
    document.querySelector(".result").classList.add("hidden")
}

function showBoardOptions() {
    let seeBoardRow = []
    
    for (var i = 0; i < 8; i++) {
        seeBoardRow = []
        for(var j = 0; j < 8; j++){
            var boton =
            `<button onmouseover="simulateBoard(this)" onclick="simulateBoardClick(this)"  data-i="${i}" data-j="${j}" class="button-board-size" >
            </button>`
            temporalBoardSize+=boton
            seeBoardRow.push("empty")
        }
        seeBoardSize.push(JSON.parse(JSON.stringify(seeBoardRow)));
    }
    sizeBoard.innerHTML= sizeBoard.innerHTML + temporalBoardSize
    // temporalBoardSize = sizeBoard.innerHTML= `<p style="position: absolute; top: -10px; left: 50px; color: #3169B1;"> Board Size </p>` + temporalBoardSize
}

function simulateBoard(element) {
    document.querySelectorAll(".button-board-size").forEach(e => {e.classList.remove("selected", "selected-wrong")})
    x = element.dataset.i
    y = element.dataset.j
    if (((x-(-1))%2 == 1 && (y-(-1))%2 == 1 ) || (y == 0 && x == 0)) {
        classSelected = "selected-wrong"
    } else {
        classSelected = "selected"
    }
    for (let l = 0; l <= 8; l++) {
        for (let k = 0; k <= 8; k++) {
            if (l <= x && k <= y) {
                document.querySelector(`.button-board-size[data-i='${l}'][data-j='${k}'`).classList.add(classSelected)
            }
            if (l > x && k > y) {
            }
        }
    }
    simulateBoardScreen = document.querySelector(".board-size").innerHTML
}
let [i1,j1] = ["",""]

function simulateBoardClick(element){
    document.querySelectorAll(".button-board-size").forEach(e => {e.classList.remove("blue")})
    i = element.dataset.i
    j = element.dataset.j
    let dimensions = document.querySelector(".board-size p:nth-child(2)")
    i++
    j++
    [i1,j1] = [i,j]
    classSelected = "selected"
    if ((i%2 == 1 && j%2 == 1 ) || (j == 0 && i == 0)) {
        classSelected = "selected-wrong"
        dimensions.innerHTML = "Not valid"
        dimensions.classList.add("wrong")
        document.querySelector(".board-size p:nth-child(2)").classList.remove("none")
    } else {
        dimensions.innerHTML = i + "x" + j
        dimensions.classList.remove("wrong")
        document.querySelector(".board-size p:nth-child(2)").classList.remove("none")
    }
    if ((i%2 == 1 && j%2 == 1 ) || (j == 0 && i == 0)) {
        classSelected = "selected-wrong"
    } else {classSelected = "blue"}
    for (let l = 0; l <= 8; l++) {
        for (let k = 0; k <= 8; k++) {
            if (l < i && k < j) {
                document.querySelector(`.button-board-size[data-i='${l}'][data-j='${k}'`).classList.add(classSelected)
            }
        }
    }
    
}

function onMouseLeaveBoard() {
    document.querySelectorAll(".button-board-size").forEach(e => {e.classList.remove("selected","selected-wrong")})
}

function easyDifficulty(){
    chance = 80
    document.querySelector(".easy").classList.add("dificulty-selected")
    document.querySelector(".medium").classList.remove("dificulty-selected")
    document.querySelector(".hard").classList.remove("dificulty-selected")
    document.querySelector(".very-hard").classList.remove("dificulty-selected")
    document.querySelector(".dark-souls").classList.remove("dificulty-selected")
}

function mediumDifficulty(){
    chance = 60
    document.querySelector(".easy").classList.remove("dificulty-selected")
    document.querySelector(".medium").classList.add("dificulty-selected")
    document.querySelector(".hard").classList.remove("dificulty-selected")
    document.querySelector(".very-hard").classList.remove("dificulty-selected")
    document.querySelector(".dark-souls").classList.remove("dificulty-selected")
}

function hardDifficulty(){
    chance = 40
    document.querySelector(".easy").classList.remove("dificulty-selected")
    document.querySelector(".medium").classList.remove("dificulty-selected")
    document.querySelector(".hard").classList.add("dificulty-selected")
    document.querySelector(".very-hard").classList.remove("dificulty-selected")
    document.querySelector(".dark-souls").classList.remove("dificulty-selected")
}

function veryHardDifficulty(){
    chance = 20
    document.querySelector(".easy").classList.remove("dificulty-selected")
    document.querySelector(".medium").classList.remove("dificulty-selected")
    document.querySelector(".hard").classList.remove("dificulty-selected")
    document.querySelector(".very-hard").classList.add("dificulty-selected")
    document.querySelector(".dark-souls").classList.remove("dificulty-selected")
}

function darkSoulsDifficulty(){
    chance = 5
    document.querySelector(".easy").classList.remove("dificulty-selected")
    document.querySelector(".medium").classList.remove("dificulty-selected")
    document.querySelector(".hard").classList.remove("dificulty-selected")
    document.querySelector(".very-hard").classList.remove("dificulty-selected")
    document.querySelector(".dark-souls").classList.add("dificulty-selected")
}

function twoPlayers(){
    players = 2
    document.querySelector(".two-players").classList.add("players-selected")
    document.querySelector(".three-players").classList.remove("players-selected")
    document.querySelector(".four-players").classList.remove("players-selected")
}
function threePlayers(){
    players = 3
    document.querySelector(".two-players").classList.remove("players-selected")
    document.querySelector(".three-players").classList.add("players-selected")
    document.querySelector(".four-players").classList.remove("players-selected")
}
function fourPlayers(){
    players = 4
    document.querySelector(".two-players").classList.remove("players-selected")
    document.querySelector(".three-players").classList.remove("players-selected")
    document.querySelector(".four-players").classList.add("players-selected")
}

////////// El back hace cosas raras, revisar o mandar al Dr.qus.