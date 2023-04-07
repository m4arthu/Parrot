
var tempo
var QtdCartas
var jogadas
var carta1, carta2

(function shuffle() {
    embaralhar()
})()

function embaralhar() {
    const cards = document.querySelectorAll(".card")
    const qtdcarta = prompt('Selecione a quantidade de cartas \n selecione um valor par entre 4 e 14!!')
    tempo = setInterval(contador, 1000)
    time = 0
    jogadas = 0
    QtdCartas = Number(qtdcarta)
    var cardlst = []
    cards.forEach((carta) => {    
        carta.classList.add("d-none")
        carta.classList.remove("pareada")
    })

    if (qtdcarta == null || Number(qtdcarta) == 0 || Number(qtdcarta) % 2 != 0 ||
        Number(qtdcarta) == 2 || Number(qtdcarta) > 14) {
        embaralhar()
    } else {
        for (let i = 0; i < Number(qtdcarta); i++) {
            cardlst.push(cards[i])
        }
        cardlst.forEach(card => {
            let ramdomPos = Math.floor(Math.random() * 14);
            card.style.order = ramdomPos;
            card.setAttribute("onclick", "selectCard(this)")
            card.classList.remove("d-none")
        })

    }
}

function selectCard(carta) {
    jogadas++
    const flipedCards = document.querySelectorAll(".flip")
    // caso  não tenha mais de duas cartas executar a função
    if (flipedCards.length < 2) {
        if (carta1 == undefined) {
            carta1 = carta
            carta1.removeAttribute("onclick")
        } else if (carta1 != carta) {
            carta2 = carta
            carta1.removeAttribute("onclick")
        }
        if (carta1 != undefined && carta2 != undefined) {
            // se as cartas forem  iguais não desviram 
            if (carta1.id == carta2.id) {
                carta1.classList.add("pareada")
                carta2.classList.add("pareada")
                checkVictory()
            } else {
                rotateAnimation(carta)
            }

        } else {
            rotateAnimation(carta)
        }
    }
}

function rotateAnimation(Cards) {
    Cards.classList.add("flip")
    if (carta2 != undefined) {
        setTimeout(() => {
            carta1.classList.remove("flip")
            carta2.classList.remove("flip")
            carta1.setAttribute("onclick", "selectCard(this)")
            carta2.setAttribute("onclick", "selectCard(this)")
            carta1 = undefined
            carta2 = undefined
        }, 1000)
    }
}

function checkVictory() {
    const cartasParedas = document.querySelectorAll(".pareada")
    carta1.classList.remove("flip")
    carta2.classList.remove("flip")
    carta1 = undefined
    carta2 = undefined
    if (cartasParedas.length == QtdCartas) {  
        window.clearInterval(tempo)
        setTimeout(()=> {
            window.alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${time} segundos!`)
            Reiniciar()
        },500)
    }
}

function contador() {
    const contador = document.getElementById("time")
    time++
    contador.innerHTML = `${time}`
    
}

function Reiniciar() {
    var reiniciar 
    while (reiniciar !== "sim" || reiniciar !== "não" && (reiniciar => /[A-Z]/.test(reiniciar)) == false  ){
        reiniciar = window.prompt("deseja jogar novamente?")
    }
    if(reiniciar == "sim") {
        embaralhar()
    } else if(reiniciar == "não") {
       Saida()
    }
}

function Saida() {
    return
}