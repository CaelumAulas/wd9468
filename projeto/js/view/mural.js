
const mural = document.querySelector('.mural');
const template = document.querySelector('#template-cartao');
let numeroCartao = 0;

export function adicionarCartao(conteudo)
{
    numeroCartao++;
    const cartao = template.content.firstElementChild.cloneNode(true);
    cartao.innerHTML = cartao.innerHTML.replaceAll('{{NUMERO_CARTAO}}', numeroCartao).replace('{{CONTEUDO_CARTAO}}', conteudo);
    mural.append(cartao);
}

export function toggleLayout() {
    mural.classList.toggle('mural--linha');
}

// exclusão do cartão no mural
mural.addEventListener('click', event => {
    if (event.target.classList.contains('opcoesDoCartao-remove') &&
        confirm('Tem certeza que deseja excluir esse cartão?')) {
        const cartao = event.target.closest('.cartao');
        cartao.classList.add('cartao--some');
        cartao.addEventListener('transitionend', () => cartao.remove());
    }
});

// mudança de cor no cartão
mural.addEventListener('change', event => {
    if (event.target.type === "radio") {
        const cartao = event.target.closest('article');
        cartao.style.backgroundColor = event.target.value;
    }
});

// mudança de cor no cartão via teclado
mural.addEventListener('keypress', event => {
    let isLabel = event.target.tagName === "LABEL";
    if (isLabel && (event.key === 'Enter' || event.key === ' ')) {
        event.target.click();
    }
});