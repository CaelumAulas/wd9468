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

export async function salvarCartoes(listaCartoes)
{
    const infoUsuario = {
        usuario: "jhonatan.jacinto@caelum.com.br",
        cartoes: listaCartoes
    };

    try 
    {
        let url = 'http://wd47-ceep.herokuapp.com/salvar-cartoes.php';
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(infoUsuario)
        });

        const dadosServidor = await resposta.json();
        console.log(dadosServidor);
    }
    catch(erro) {

    }
}