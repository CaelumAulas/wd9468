import './view/btnAjuda.js';
import './view/btnMudaLayout.js';
import './view/mural.js';
import './view/formularioCartao.js';
import './view/busca.js';
import './view/btnSync.js';
import './view/btnLogout.js';
import { sincronizar } from './view/btnSync.js';

// quando a aplicação ficar online, iniciamos imediatamente uma sincronização dos dados
// salvos localmente com o servidor
window.addEventListener('online', function() {
    sincronizar();
});

// Registrando o Service Worker
registrarServiceWorker();
async function registrarServiceWorker()
{
    if ('serviceWorker' in navigator) 
    {
        const registro = await navigator.serviceWorker.register('/projeto/sw.js', {
            updateViaCache: "none"
        });
        console.log('Service Worker registrado: ', registro);
    }
}