import { adicionarCartao } from "./mural.js";

const btn = document.querySelector('#btnAjuda');
btn.addEventListener('click', () => {
    const mensagens = [
        "Bem-vindo(a) ao CEEP!",
        "Clique no botão '?' para Ajuda",
        "Clique no botão 'Linhas' para mudar a exibição dos cartões"
    ];

    mensagens.forEach(msg => adicionarCartao(msg));
});

