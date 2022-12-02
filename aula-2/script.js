let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let telaInicio = document.querySelector('.tela-inicio')
let telaFim = document.querySelector('.tela-fim')

let audioBotao = document.getElementById('botao-audio')
let audioConfirma = document.getElementById('botao-confirma')

let etapaAtual = 0
let numero = '';
let votoBranco = false;

document.querySelectorAll('.numeros .botoes--opcoes').forEach( (elemento) => 
    elemento.addEventListener('click', (event) => { // arrow function
        clicou(event.target.innerText)
    })
)

function comecarEtapa() {
    telaInicio.style.display = 'flex'
    telaFim.style.display = 'none'
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''
    numero = ''
    votoBranco = false

    for (let i=0; i < etapa.numeros; i ++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
    }

    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML= ''
    numeros.innerHTML = numeroHTML
}

function clicou(num) {
    audioBotao.play()
    let elementoNumero = document.querySelector('.numero.pisca')
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = num
        numero = `${numero}${num}`
        
        elementoNumero.classList.remove('pisca')
        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else { 
            return false;
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        aviso.style.display = 'block'
        descricao.innerHTML = `
            Nome: ${candidato.nome}<br>
            Partido: ${candidato.partido}
        `
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small">
                    <img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}
                </div>`
            } else {
                fotosHtml += `<div class="d-1-image">
                    <img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}
                </div>`
            }
        }
        lateral.innerHTML = fotosHtml
    } else {
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function branco() {
    numero = ''
    votoBranco = true
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO</div>'
    lateral.innerHTML = ''
}

function corrige() {
    comecarEtapa()
}
let votos = []
function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapa.titulo,
            voto: 'branco'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapa.titulo,
            voto: numero
        })
    }
    if(votoConfirmado) {
        etapaAtual++;
        audioConfirma.play()
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            telaInicio.style.display = 'none'
            telaFim.style.display = 'flex'
            console.log(votos)
        }
    }
}

comecarEtapa()
