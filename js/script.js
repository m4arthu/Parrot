
var tempo = setInterval(contador, 1000)
var QtdCartas

(function shuffle() {
    embaralhar()
    tempo
})()

function embaralhar() {
    const cards = document.querySelectorAll(".card")
    const qtdcarta = prompt('Selecione a quantidade de cartas \n selecione um valor par entre 4 e 14!!')
    QtdCartas = Number(qtdcarta)
    var cardlst = []

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
            card.classList.remove("d-none")
        })

    }
}
var time = 0
var carta1, carta2
var jogadas = 0
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
        console.log(cartasParedas)
        cartasParedas.forEach((carta) => {
            carta.setAttribute("onclick", "selectCard(this)")
            carta.classList.remove("pareada")
            carta.classList.add("d-none")
        })
            window.alert(`Você ganhou em ${jogadas} jogadas!`)
            jogadas = 0
            time = 0
            embaralhar()
    }
}

function contador() {
    const contador = document.getElementById("time")
    time++
    contador.innerHTML = `${time}`
    
}