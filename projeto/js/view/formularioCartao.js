import { adicionarCartao } from "./mural.js";
import { notificar } from "./notificacao.js";

const formulario = document.querySelector('form');
const caixaTexto = formulario.querySelector('textarea');

formulario.addEventListener('submit', event => {
    event.preventDefault();
    if (caixaTexto.value.trim() === '') {
        notificar('Por favor, preencha o campo corretamente!');
    }
    else {
        adicionarCartao(caixaTexto.value);
        formulario.reset();
    }
});