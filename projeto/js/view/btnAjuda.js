import { adicionarCartao } from "./mural.js";
import { notificar } from "./notificacao.js";

const btn = document.querySelector('#btnAjuda');

btn.addEventListener('click', async () => {
    // http://wd47-ceep.herokuapp.com/get-instrucoes.php
    try 
    {
        btn.disabled = true;
        const resposta = await fetch('http://wd47-ceep.herokuapp.com/get-instrucoes.php');
        let dadosCarregados = await resposta.json();
        console.log(dadosCarregados);
        const mensagens = dadosCarregados.instrucoes;
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

