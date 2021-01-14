import usuarioLogado from "../storage/loginUsuario.js";

/**
 * Função que retorna uma lista de instruções do back-end da aplicação
 * @returns {Promise<Array<object>>}
 */
export async function getInstrucoes()
{
    const resposta = await fetch('http://wd47-ceep.herokuapp.com/get-instrucoes.php');
    let dadosCarregados = await resposta.json();
    const mensagens = dadosCarregados.instrucoes;

    return mensagens;
}

/**
 * Salva as informações dos cartões criados pelo usuário no banco de dados do servidor
 * @param {Array<object>} listaCartoes Array de objetos com as informações dos cartões a serem salvos
 * @returns {Promise<string>}
 */
export async function salvarCartoes(listaCartoes)
{
    const infoUsuario = {
        usuario: usuarioLogado,
        cartoes: listaCartoes
    };

    let url = 'http://wd47-ceep.herokuapp.com/salvar-cartoes.php';
    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(infoUsuario)
    });

    const dadosServidor = await resposta.json();
    // console.log(dadosServidor);

    if (dadosServidor.quantidade == 1) {
        return 'Cartão salvo com sucesso!';
    }
    else {
        return `${dadosServidor.quantidade} cartões salvos com sucesso!`;
    }
}

/**
 * Busca a lista de cartões salvos para um usuário específico e os retorna para serem exibidos
 * @returns {Promise<Array<object>>}
 */
export async function getCartoesSalvos()
{
    let url = 'http://wd47-ceep.herokuapp.com/get-cartoes.php?usuario=' + usuarioLogado;

    const resposta = await fetch(url);
    const dadosCartoes = await resposta.json();

    return dadosCartoes.cartoes ?? [];
}