var cep = ''

const inputCep = document.getElementById('zipcode')

inputCep.addEventListener('keyup', (event) => {
    cep = event.target.value
    if (cep.length === 8) {
        getEndereco()
    }
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

    console.log(endereco)
}