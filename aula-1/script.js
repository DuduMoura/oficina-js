var cep = ''

const inputCep = document.getElementById('zipcode')

inputCep.addEventListener('keyup', (event) => {
    cep = event.target.value
    cep = cep.replace(/[^0-9]/g,'');
})

const buttonSearch = document.getElementById('search')

buttonSearch.addEventListener('click', pesquisa)

function pesquisa() {
    if (cep.length === 8) {
        getEndereco()
    } else {
        alert('Digite o CEP corretamente')
    }
}
async function getEndereco() {
    const endereco = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())

    if(endereco.erro) {
        alert('Não encontrado')
        return
    } 
    montaTabela(endereco)
    
}

const resultadoTabela = document.getElementById('results')

function montaTabela(endereco) {
    resultadoTabela.insertAdjacentHTML('beforeend',`
        <tr>
            <td>${endereco.cep}</td>
            <td>${endereco.logradouro}</td>
            <td>${endereco.bairro}</td>
            <td>${endereco.localidade}</td>
            <td>${endereco.uf}</td>
        </tr>
    `)
}