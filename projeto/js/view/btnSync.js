import { salvarCartoes } from "../server/sync.js";
import { salvarCartoesStore } from "../storage/db.js";
import { getCartoes } from "./mural.js";
import { notificar } from "./notificacao.js";

const btnSync = document.querySelector('#btnSync');

btnSync.addEventListener('click', async function() {
    btnSync.classList.replace('botaoSync--sincronizado', 'botaoSync--esperando');
    btnSync.disabled = true;

    const listaDeCartoes = getCartoes();
    
    try
    {
        // tenta salvar os dados no servidor
        let mensagem = await salvarCartoes(listaDeCartoes);
        notificar(mensagem);
    }
    catch(erro) {
        // se não deu certo, salva os dados no front
        salvarCartoesStore(listaDeCartoes);
    }

    btnSync.disabled = false;
    btnSync.classList.replace('botaoSync--esperando', 'botaoSync--sincronizado');
});