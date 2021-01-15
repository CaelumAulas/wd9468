import { salvarCartoes } from "../server/sync.js";
import { excluirCartoesLocais, salvarCartoesStore } from "../storage/db.js";
import { getCartoes } from "./mural.js";
import { notificar } from "./notificacao.js";

const btnSync = document.querySelector('#btnSync');

btnSync.addEventListener('click', async function() {
    btnSync.classList.replace('botaoSync--sincronizado', 'botaoSync--esperando');
    btnSync.disabled = true;
    let mensagem = '';

    const listaDeCartoes = getCartoes();
    
    try
    {
        // tenta salvar os dados no servidor
        mensagem = await salvarCartoes(listaDeCartoes);
        await excluirCartoesLocais();
    }
    catch(erro) {
        // se não deu certo, salva os dados no front
        mensagem = await salvarCartoesStore(listaDeCartoes);
    }

    notificar(mensagem);

    btnSync.disabled = false;
    btnSync.classList.replace('botaoSync--esperando', 'botaoSync--sincronizado');
});

export async function sincronizar()
{
    if (confirm('Gostaria de carregar os dados do servidor?')) {
        window.location.reload();
    }
    else if (confirm('Gostaria de salvar a versão atual do seu mural?')) {
        btnSync.click();
    }
}

