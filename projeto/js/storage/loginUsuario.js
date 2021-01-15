import { excluirCartoesLocais } from "./db.js";

let usuarioLogado = localStorage.getItem('CEEP_USUARIO_LOGADO');

while (!usuarioLogado) 
{
    usuarioLogado = prompt('Por favor, informe um nome de usuário válido:');
    if (isEmail(usuarioLogado)) {
        localStorage.setItem('CEEP_USUARIO_LOGADO', usuarioLogado);
    }
    else {
        usuarioLogado = null;
    }
}

function isEmail(email)
{
    const validadorEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return validadorEmail.test(email);
}

export async function logout()
{
    if (confirm('Ao deslogar, suas informações não serão mantidas. Deseja continuar?')) {
        await excluirCartoesLocais();
        localStorage.removeItem('CEEP_USUARIO_LOGADO');
        window.location.reload();
    }
}

export default usuarioLogado;