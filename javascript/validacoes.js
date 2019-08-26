// Retorna se o cpf é válido ou não
function cpfValido(d1, d2, list, cpf) {
    for(let i=0; i<cpf.length; i++) {
        if(cpf[i] == cpf[i + 1]) {
            return false
        } else if(d1 == list[9] && d2 == list[10]) {
            return true
        }
    }
}


// Válida CPF pelos digitos
function valCpfDigito(listCpf, cont1, cont2, rpCpf) {
    tot1 = 0
    tot2 = 0

    for (let i=0; i < rpCpf.length; i++) {
        listCpf.push(parseInt(rpCpf[i]))
        // Validando CPF através do primeiro digito
        if (i <= 8) {
            tot1 += listCpf[i] * cont1
            cont1--
        } else if(i == 9) {
            tot1 = (tot1 * 10) % 11
        }

        // Validando CPF através do segundo digito
        if (i <= 9) {
            tot2 += listCpf[i] * cont2
            cont2--
        } else if(i == 10) {
            tot2 = (tot2 * 10) % 11
        }
    }

    window.tot1 = tot1
    window.tot2 = tot2
} 