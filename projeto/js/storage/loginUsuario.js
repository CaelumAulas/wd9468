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

export function logout()
{
    localStorage.removeItem('CEEP_USUARIO_LOGADO');
    window.location.reload();
}

export default usuarioLogado;