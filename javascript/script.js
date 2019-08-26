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
    let rxCpf = /^([0-9]{3}.)([0-9]{3}.)([0-9]{3}-)+([0-9]{2})$/g
    let rxNumCell = /^(\(\d{2}\))|(\d{2})(\s?)+(9?[0-9]{4}(\s|-?)+([0-9]{4}))$/g


    // Varifica o pressionamento de teclas
    function verifyPressKey(event) {
        if(event.code != "Backspace") {
            // Estrutura para adicionar "." e "-" ao CPF
            if(cpf.value.length == 3 || cpf.value.length == 7) {
                cpf.value += "."
            } else if(cpf.value.length == 11) {
                cpf.value += "-"
            }

            // Estrutura para adicionar "(" e "-" ao Número
            if(numCell.value.length == 0){
                numCell.value += "("
            } else if(numCell.value.length == 3) {
                numCell.value += ")"
            } else if(numCell.value.length == 4) {
                numCell.value += " "
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

        // Transformando cpf em string com os números putos
        let rpCpf = cpf.value.replace('.', '').replace(".", '').replace("-", "")
        let listCpf = []
        let cont1 = 10;
        let cont2 = 11;
        
        // Chama a função de validação de CPF
        valCpfDigito(listCpf, cont1, cont2, rpCpf)


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
        if (valCpf != null && cpfValido(win.tot1, win.tot2, listCpf, rpCpf)) {
            console.log("CPF Válido")
        } else {
            console.log("CPF Inválido")
        }

        // Validação de Número de Celular
        if (valNumCell && numCell.value.length > 0) {
            console.log("Número Válido")
        } else {
            console.log("Número Inválido")
        }
    }

    btn.addEventListener("click", valForm)
    addEventListener("keydown", verifyPressKey)

})(window, document)