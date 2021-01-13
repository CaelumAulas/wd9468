const inputBusca = document.querySelector('#busca');
inputBusca.addEventListener('input', function() {
    let termo = inputBusca.value.trim();
    const buscaTermo = new RegExp(termo, 'i');
    const listaCartoes = document.querySelectorAll('.cartao');
    listaCartoes.forEach(cartao => cartao.style.display = '');

    if (termo.length > 0)
    {
        for (const cartao of listaCartoes)
        {
            let textoCartao = cartao.querySelector('.cartao-conteudo').textContent;
            if (!buscaTermo.test(textoCartao)) {
                cartao.style.display = 'none';
            }
        }
    }
});