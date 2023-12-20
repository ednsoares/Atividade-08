let modal = document.getElementById('myModal');
let closeBtn = document.getElementsByClassName('close')[0];
const form = document.getElementById('myForm');
const header = document.getElementById('header');
let acertos = 0;
let tentativas = 0;
let pontos = 0;
const cardBoard = document.querySelector('#cardboard');

const imgs = [
  '1.jpg',
  '471.jpg',
  '1352.jpg',
  '1575.jpg',
  '5.jpg',
  '6.jpg',
];

let cardHTML = '';

imgs.forEach(img => {
  cardHTML += `
  <div class="memory-card" data-card="${img}">
  <img class="front-face" src="images/${img}">
  <img class="back-face" src="images/0.jpg">
    </div>`;
});

cardBoard.innerHTML = cardHTML.concat(cardHTML);


const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  if (lockCard === true) return false;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;
  tentativas++;
  checa();
}

function checa() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  !isMatch ? desabilitaCartas() : resetarCards(isMatch);
}

function desabilitaCartas() {
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetarCards();
  }, 1000);
}

function resetarCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    acertos++;
  }
  if (acertos > 2) {
    pontos = tentativas/acertos * 100;
    const parabensTexto = document.querySelector('#parabensTexto');
    parabensTexto.innerHTML = 'Sua pontuação foi de '+  Math.round(pontos) +' pontos'; 
    exibirModal('victoryModal');
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}


(function aleatorio() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
});


window.onload = function () {
  modal.style.display = 'block';
};


closeBtn.onclick = function () {
  modal.style.display = 'none';
};


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function putName(name = 'Anônimo') {
  header.innerHTML = `Olá ${name}, bom jogo!`;
  return null;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  modal.style.display = 'none';
  const inputNome = document.querySelector('#nome');
  const nome = inputNome.value;

  putName(nome);
});

const restartButton = document.getElementById('novamente');
restartButton.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {

  cards.forEach(card => {
    card.classList.remove('flip');
  });

  acertos = 0;
  tentativas = 0;

  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });

  (function aleatorio() {
    cards.forEach(card => {
      let rand = Math.floor(Math.random() * 12);
      card.style.order = rand;
    });
  })();
}


const parabensTexto = document.querySelector('#a');
parabensTexto.innerHTML = 'Sua pontuação foi de '+ ((10 / 20) * 100) +' pontos'; 
function exibirModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

