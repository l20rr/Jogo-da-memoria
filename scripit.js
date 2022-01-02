const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let cards = null;
startgame();

function startgame() {


    initializecards(game.createCardsFromTechs())
}



function createCardContent(card, cardElement) {
    createCardface(FRONT, card, cardElement)
    createCardface(BACK, card, cardElement)

}

function initializecards(cards) {
    let gameboard = document.getElementById("gameboard");

    game.cards.forEach(cards => {
        let cardElement = document.createElement('div');
        cardElement.id = cards.id
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = cards.icon;

        createCardContent(cards, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameboard.appendChild(cardElement)
    })
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.setCard) {
            if (game.checkmath()) {
                game.cleatcards();
                if (game.checkgameover()) {
                    let gameoverlayer = document.getElementById("gameover");
                    gameoverlayer.style.display = 'flex';
                }
            } else {

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipcards();
                }, 1000)
            };

        }
    }
}

function restart() {

    let gameoverlayer = document.getElementById("gameover");
    gameoverlayer.style.display = 'none';
    location.reload()
}




function createCardface(face, card, element) {
    let cardElementface = document.createElement('div');
    cardElementface.classList.add(face);

    if (face == FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementface.appendChild(iconElement);
    } else {
        cardElementface.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementface);
}

createCardsFromTechs(techs);