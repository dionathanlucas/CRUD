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
        createClient (client)
        clearFields ()
    }
}
document.getElementById ('Enviar')
    .addEventListener ('click', saveClient)


// CRIANDO NOVAS LINHAS

const createRow = (client) => {
    const newRow = document.createElement ('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.profissão}</td>
        <td>${client.ação}
            <button type="button" class="button green">Editar</button>
            <button type="button" class="button red">Excluir</button>
        </td>
    `
    document.querySelector ('#myTable').appendChild(newRow)
}


// LIMPAR LINHAS DA TABELA

const clearTable = () => {
    const rows = document.querySelectorAll ('#myTable>table tr')
    rows.forEach (row => row.parentNode.removeChild (row))
}



// ATUALIZAR TABELAS
const updateTable = () => {
    const dbClient = readClient ()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()