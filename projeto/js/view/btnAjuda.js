import { getInstrucoes } from "../server/sync.js";
import { adicionarCartao } from "./mural.js";
import { notificar } from "./notificacao.js";

const btn = document.querySelector('#btnAjuda');

btn.addEventListener('click', async () => {
    try 
    {
        btn.disabled = true;
        const mensagens = await getInstrucoes();
        mensagens.forEach(msg => adicionarCartao(msg.conteudo, msg.cor));
    }
    catch(erro) {
        console.error(erro);
        notificar('Erro ao carregar informações de ajuda!');
    }
    finally {
        btn.disabled = false;
    }
});

