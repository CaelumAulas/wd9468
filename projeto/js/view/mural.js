
const mural = document.querySelector('.mural');

export function toggleLayout() {
    mural.classList.toggle('mural--linha');
}

// exclusão do cartão no mural
mural.addEventListener('click', event => {
    if (event.target.classList.contains('opcoesDoCartao-remove')) {
        const cartao = event.target.closest('.cartao');
        cartao.remove();
    }
});