
let db;
const subscribers = []; // lista de funções callback que se inscreveram para serem executadas
const requestDb = indexedDB.open('db_ceep_backup', 1);
requestDb.addEventListener('success', () => {
    db = requestDb.result;
    carregarCartoes();
});

requestDb.addEventListener('upgradeneeded', () => {
    db = requestDb.result;
    db.createObjectStore('store_cartoes', { keyPath: 'id', autoIncrement: true });
});

function carregarCartoes()
{
    const tx = db.transaction('store_cartoes');
    const requestCartoes = tx.objectStore('store_cartoes').getAll();
    requestCartoes.onsuccess = () => {
        const listaDeCartoesLocais = requestCartoes.result ?? [];
        subscribers.forEach(funcaoCallback => funcaoCallback(listaDeCartoesLocais));
    }
}

export function excluirCartoesLocais()
{
    return new Promise(function(resolve, reject) {
        const tx = db.transaction('store_cartoes', 'readwrite');
        tx.objectStore('store_cartoes').clear();
        tx.oncomplete = () => resolve('Cartões locais excluídos com sucesso!');
        tx.onerror = () => reject('Erro ao excluir cartões da base local!');
    });
}

/**
 * Permite que outros módulos possam inscrever funções de callback para serem executadas quando
 * a lista de cartões locais estiver disponível
 * @param {Function} funcaoCallback Função callback a ser executada quando os cartões locais forem carregados pela aplicação
 */
export function IDBSubscribeOnLoadCartoes(funcaoCallback)
{
    subscribers.push(funcaoCallback);
}

/**
 * Salva a lista de cartões do mural na base de dados local
 * @param {Array<object>} listaCartoes Lista dos cartões a serem salvos localmente
 * @returns {Promise<string>}
 */
export function salvarCartoesStore(listaCartoes)
{
    return new Promise(async function(resolve, reject) {
        // código assíncrono a ser administrado pela promise
        await excluirCartoesLocais();
        const tx = db.transaction('store_cartoes', 'readwrite');

        for (let cartao of listaCartoes)
        {
            tx.objectStore('store_cartoes').add(cartao);
        }

        tx.oncomplete = () => resolve('Cartões salvos com sucesso na base de dados local!');
        tx.onerror = () => reject('Erro ao salvar dados na base de dados local!');
    });   
}