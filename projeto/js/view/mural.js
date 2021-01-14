import { getCartoesSalvos } from "../server/sync.js";

const mural = document.querySelector('.mural');
const template = document.querySelector('#template-cartao');
let numeroCartao = 0;

// getCartoesSalvos().then(listaCartoesSalvos => {
//     listaCartoesSalvos.forEach(cartao => {
//         adicionarCartao(cartao.conteudo, cartao.cor);
//     });
// });

(async function () {
    const listaCartoesSalvos = await getCartoesSalvos();
    listaCartoesSalvos.forEach(cartao => {
        adicionarCartao(cartao.conteudo, cartao.cor);
    });
})();

export function adicionarCartao(conteudo, cor = '')
{
    numeroCartao++;
    const cartao = template.content.firstElementChild.cloneNode(true);
    cartao.innerHTML = cartao.innerHTML.replaceAll('{{NUMERO_CARTAO}}', numeroCartao).replace('{{CONTEUDO_CARTAO}}', conteudo);
    cartao.style.backgroundColor = cor;
    mural.append(cartao);
}

export function toggleLayout() {
    mural.classList.toggle('mural--linha');
}

// window.getCartoes = getCartoes;
export function getCartoes()
{
    const cartoes = mural.querySelectorAll('.cartao');
    const listaCartoes = Array.from(cartoes).map(cartao => {
        return {
            conteudo: cartao.querySelector('.cartao-conteudo').textContent.trim(),
            cor: cartao.style.backgroundColor
        }
    });

    return listaCartoes;
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