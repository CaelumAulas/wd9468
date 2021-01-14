
let db;
const requestDb = indexedDB.open('db_ceep_backup', 1);
requestDb.addEventListener('success', () => {
    db = requestDb.result;
});

requestDb.addEventListener('upgradeneeded', () => {
    db = requestDb.result;
    db.createObjectStore('store_cartoes', { keyPath: 'id', autoIncrement: true });
});

export function salvarCartoesStore(listaCartoes)
{
    const tx = db.transaction('store_cartoes', 'readwrite');
    tx.objectStore('store_cartoes').clear();

    for (let cartao of listaCartoes)
    {
        tx.objectStore('store_cartoes').add(cartao);
    }

    tx.oncomplete = () => alert('Cartões salvos com sucesso na base de dados local');
    tx.onerror = () => alert('Erro ao salvar dados na base de dados local!');
}