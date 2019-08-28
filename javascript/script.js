(function(win, doc){
    "use strict"

    let btn = doc.querySelector("#btn")
    let name = doc.querySelector("#name") 
    let lastName = doc.querySelector("#lastName")
    let age = doc.querySelector("#age")
    let email = doc.querySelector("#email")
    let cpf = doc.querySelector("#cpf")
    let numCell = doc.querySelector("#numCell")
    let rg = doc.querySelector("#rg")
    let sex = doc.getElementsByName("radSex")
    let text = doc.querySelector("#text")

    let listForEvents = [name, lastName, email, cpf, numCell, rg]
    
    // Regex
    let rxName = /^([a-z]{3,50})+$/gi
    let rxEmail = /^[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/gi
    let rxCpf = /^([0-9]{3}.)([0-9]{3}.)([0-9]{3}-)([0-9]{2})$/g
    let rxNumCell = /^(\(\d{2}\)|\d{2})(\s?)(9?(\s?)(\d{4})(\s|-?)(\d{4}))$/g
    let rxRg = /^([0-9]{2}.)([0-9]{3}.)([0-9]{3}-)[0-9]{2}$/g

    
    // Função caso haja alteração no valor do Campo Número de celular
    function changeNumCell(event) {
        // Função para adicionar "(" e "-" ao Número de Celular
        addCaractersNumCell(numCell)
    }



    // Varifica o pressionamento de teclas
    function verifyPressKey(event) {
        
        if(event.code != "Backspace") {
            // Adiciona os caracters especiais do CPF
            addCaracters(cpf, 3, 7, 11)

            // Adiciona os caracters especias do RG
            addCaracters(rg, 2, 6, 10)
            
        }
    }


    // Valida os campos do formulario
    function valForm(event) {
        event.preventDefault()

        let listFullForm = [];

        // Transformando CPF e RG em string com os números putos
        let rpCpf = cpf.value.replace('.', '').replace(".", '').replace("-", "")
        let rpRg = rg.value.replace('.', '').replace(".", '').replace("-", "")

        let listCpf = []
        let cont1 = 10;
        let cont2 = 11;
        
        // Chama a função de validação de CPF
        valCpfDigito(listCpf, cont1, cont2, rpCpf)


        // Validação de nome
        if (valInput(name, rxName)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }
        
        // Validação de sobrenome
        if (valInput(lastName, rxName)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }

        // Validação de idade
        if (age.value >= 18 && age.value < 110) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }

        // Validação de Email
        if (valInput(email, rxEmail)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }

        // Validação de cpf
        if (valInput(cpf, rxCpf) && cpfValido(win.tot1, win.tot2, listCpf, rpCpf)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }

        // Validação de Número de Celular
        if (valInput(numCell, rxNumCell)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }

        // Validação de RG
        if(valInput(rg, rxRg) && !sameNumList(rpRg)) {
            listFullForm.push(true)
        } else {
            listFullForm.push(false)
        }
        
        $(function(){
            if(valFullForm(listFullForm)) {
                $("#msgValForm").text("Formulário Enviado")
                $("#divMsg").css({"background-color": "green"})
            } else {
                $("#msgValForm").text("Formulário Recusado, Verifique o formulário")
                $("#divMsg").css({"background-color": "red"})
            }
            $("#divMsg").slideDown(1000)
            .fadeOut(1000)
        })
    }

    
    let listForRegex = [rxName,
        rxName,
        rxEmail,
        /^([0-9]{3}.)([0-9]{3}.)([0-9]{3}-)([0-9]{1})$/g,
        rxNumCell,
        /^([0-9]{2}.)([0-9]{3}.)([0-9]{3}-)[0-9]{1}$/g
    ]

    btn.addEventListener("click", valForm)
    addEventListener("keydown", verifyPressKey)
    numCell.addEventListener('keypress', changeNumCell)
    for (let i=0; i<listForEvents.length; i++) {
        listForEvents[i].addEventListener("keydown", function(event){
            if(event.code != "Tab") {
                valRealTime(event.target, listForRegex[i])
            }
        })
    }

})(window, document)