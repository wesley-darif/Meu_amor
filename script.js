function abrirCarta() {
    document.getElementById('carta-amor').style.display = 'block';
    document.getElementById('botao-carta').style.display = 'none';
}

function mostrarSurpresa() {
    document.getElementById('conteudo-surpresa').style.display = 'block';
}

const fotos = ["foto1.jpg", "foto2.jpg", "foto3.jpg","foto4.jpg", "foto5.jpg", "foto6.jpg","foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg", "foto11.jpg", "foto12.jpg", "foto13.jpg", "foto14.jpg", "foto15.jpg", "foto16.jpg", "foto17.jpg"];
let indiceAtual = 0;

function mostrarFoto() {
    document.getElementById('slide-atual').src = fotos[indiceAtual];
}

function proximaFoto() {
    indiceAtual = (indiceAtual + 1) % fotos.length; // Loop circular
    mostrarFoto();
}

function voltarFoto() {
    indiceAtual = (indiceAtual - 1 + fotos.length) % fotos.length; // Loop circular
    mostrarFoto();
}

function verificarSenha() {
    const senhaCorreta = "13032025";
    const senhaDigitada = document.getElementById('input-senha').value;

    if (senhaDigitada === senhaCorreta) {
        document.getElementById('tela-senha').style.display = 'none';
        document.getElementById('conteudo-site').style.display = 'block';
    } else {
        document.getElementById('mensagem-erro').innerText = "Senha errada meu amor, coloca sem o /";
    }
}

window.onload = function () {
    mostrarFoto(); // Mostra a primeira imagem no carregamento
};

// Código do jogo da memória
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let paresEncontrados = 0;

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    paresEncontrados += 1;

    // Mostra a mensagem final quando todos os pares forem encontrados
    if (paresEncontrados === cards.length / 2) {
        document.getElementById('mensagem-final').style.display = 'block';

        carta1.classList.add('virada');
        carta2.classList.add('virada');
        verificarFimDeJogo(); // <-- adicione isso aqui
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
};


function verificarFimDeJogo() {
  const todasViradas = document.querySelectorAll('.carta.virada').length;
  if (todasViradas === cartas.length) {
    document.getElementById('mensagem-vitoria').style.display = 'block';
  }
}



cards.forEach(card => card.addEventListener('click', flipCard));
