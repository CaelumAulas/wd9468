import { salvarCartoes } from "../server/sync.js";
import { getCartoes } from "./mural.js";

const btnSync = document.querySelector('#btnSync');

btnSync.addEventListener('click', async function() {
    btnSync.classList.replace('botaoSync--sincronizado', 'botaoSync--esperando');
    btnSync.disabled = true;

    const listaDeCartoes = getCartoes();
    await salvarCartoes(listaDeCartoes);

    btnSync.disabled = false;
    btnSync.classList.replace('botaoSync--esperando', 'botaoSync--sincronizado');
});