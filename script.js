'use strict'


//Funções para criar banco de dados vazio e enviar +1 ao DB
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))


// CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}


// READ
const readClient = () => getLocalStorage()


// UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient ()
    dbClient [index] = client
    setLocalStorage (dbClient)
}


// DELETE
const deleteClient = (index) => {
    const dbClient = readClient ()
    dbClient.splice (index, 1)
    setLocalStorage (dbClient)
}







const isvalidFields = () => {
  return  document.getElementById ('form').reportValidity()
}


// Interação com o Layout


const saveClient = () => {
    if (isvalidFields()) {
        const client = {
            nome: document.getElementById ('nome').value,
            email: document.getElementById ('email').value,
            telefone: document.getElementById ('telefone').value,
            profissão: document.getElementById ('profissão').value
        }
        const index = document.getElementById ('nome').dataset.index
           if (index == "new") {
        createClient (client)
        updateTable ()
        } else {
           updateClient (index, client)
           updateTable ()

        }
    }
}
document.getElementById ('Enviar')
    .addEventListener ('click', saveClient)


// CRIANDO NOVAS LINHAS

const createRow = (client, index) => {
    const newRow = document.createElement ('tr')
    newRow.innerHTML = `
        <td>${client.id=[index]}</td>
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.profissão}</td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector ('#myTable').appendChild(newRow)
}


// LIMPAR LINHAS DA TABELA

const clearTable = () => {
    const rows = document.querySelectorAll ('#myTable> tr')
    rows.forEach (row => row.parentNode.removeChild (row))
}



// ATUALIZAR TABELAS
const updateTable = () => {
    const dbClient = readClient ()
    clearTable()
    dbClient.forEach(createRow)
}


const fillFields = (client) =>{
    document.getElementById ('nome').value = client.nome
    document.getElementById ('email').value = client.email
    document.getElementById ('telefone').value = client.telefone
    document.getElementById ('profissão').value = client.profissão
    document.getElementById ('nome').dataset.index = client.index
}


const editClient = (index) => {
    const client = readClient () [index]
    client.index = index
    fillFields(client)
}


// Validando botões Editar e Deletar
const editDelete = (event) => {
    if (event.target.type =='button'){

        const [action, index] = event.target.id.split('-')

        if (action =='edit') {
           editClient (index)
        } else {
            const client = readClient () [index]
            const response = confirm (`Deseja realmente excluir os dados de ${client.nome}`)
            if (response) {
                deleteClient (index)
                updateTable()
            }
           
        }
    }
}

updateTable()



//EVENTOS
document.getElementById ('Enviar')
    addEventListener ('click', saveClient)

    document.querySelector ('#myTable>table')
    addEventListener ('click', editDelete)