// Função para adicionar "." e "-" ao CPF
function addCaracters(doc, pointOne, pointTwo, pointThee) {
    if(doc.value.length == pointOne || doc.value.length == pointTwo) {
        doc.value += "."
    } else if(doc.value.length == pointThee) {
        doc.value += "-"
    }
}

// Função para adicionar caracters ao campo de Número de Celular
function addCaractersNumCell(numCell) {
    if(numCell.value.length == 0){
        numCell.value += "("
    } else if(numCell.value.length == 3) {
        numCell.value += ")"
    } else if(numCell.value.length == 4) {
        numCell.value += " "
    }
}