(function(win, doc){
    "use strict"

    let btn = doc.querySelector("#btn")
    let name = doc.querySelector("#name") 
    let lastName = doc.querySelector("#lastName")
    let age = doc.querySelector("#age")
    let email = doc.querySelector("#email")
    let cpf = doc.querySelector("#cpf")
    let numCell = doc.querySelector("#numCell")

    // Regex
    let rxName = /^([a-z]{3,50})+$/gi
    let rxEmail = /^[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/gi
    let rxCpf = /^([0-9]{3}.)+([0-9]{3}.)([0-9]{3}-)+([0-9]{2})$/g
    let rxNumCell = /^([0-9]{2})+$/g

    // Varifica o pressionamento de teclas
    function verifyPressKey(event) {
        if(event.code != "Backspace") {
            if(cpf.value.length == 3 || cpf.value.length == 7) {
                cpf.value += "."
            } else if(cpf.value.length == 11) {
                cpf.value += "-"
            }
        }
    }


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


    // Valida os campos do formulario
    function valForm(event) {
        event.preventDefault()
        let valName = name.value.match(rxName)
        let valLastName = lastName.value.match(rxName)
        let valEmail = email.value.match(rxEmail)
        let valCpf = cpf.value.match(rxCpf)
        let valNumCell = numCell.value.match(rxNumCell)

        // Transformando cpf em lista
        let rpCpf = cpf.value.replace('.', '').replace(".", '').replace("-", "")
        let listCpf = []
        let cont1 = 10;
        let cont2 = 11;
        let tot1 = 0;
        let tot2 = 0

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


        // Válidação de nome
        if (valName != null) {
            console.log("Nome Válido")
        } else {
            console.log("Nome Inválido")
        }

        // Válidação de sobrenome
        if (valLastName != null && lastName.value.length > 1) {
            console.log("Sobrenome Válido")
        } else {
            console.log("Sobrenome Inválido")
        }

        // Validação de idade
        if (age.value >= 18 && age.value < 110) {
            console.log("Idade Válida")
        } else {
            console.log("Idade Inválida")
        }

        // Validação de Email
        if (valEmail != null) {
            console.log("Email válido")
        } else {
            console.log("Email inválido")
        }

        // Válidação de cpf
        if (valCpf != null && cpfValido(tot1, tot2, listCpf, rpCpf)) {
            console.log("CPF Válido")
        } else {
            console.log("CPF Inválido")
        }

        // Validação de Número de Celular
        if (valNumCell =! null && numCell.value.length > 0) {
            console.log("Número Válido")
        } else {
            console.log("Número Inválido")
        }
    }

    btn.addEventListener("click", valForm)
    addEventListener("keydown", verifyPressKey)

})(window, document)