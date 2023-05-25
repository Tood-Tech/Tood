var database = require("../database/config");

function listarTotem(idEmpresa) {

    var instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            select totem.*, estabelecimento.nome from totem 
            join estabelecimento on totem.fkestabelecimento = estabelecimento.idEstabelecimento
            join empresa on empresa.idempresa = estabelecimento.fkempresa where empresa.idempresa = '${idEmpresa}' 
            order by totem.fkestabelecimento , totem.idtotem;
        `;
    } else {
        instrucao = `
            select totem.*, estabelecimento.nome from totem 
            join estabelecimento on totem.fkestabelecimento = estabelecimento.idEstabelecimento
            join empresa on empresa.idempresa = estabelecimento.fkempresa where empresa.idempresa = '${idEmpresa}' 
            order by totem.fkestabelecimento , totem.idtotem;
        `;
    }

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosTotem(idEmpresa, idTotem) {

    instrucao = `select top 1 * from [dbo].[Totem] 
                    inner join [dbo].[DadoTotem] on [dbo].[Totem].[idTotem] = [dbo].[DadoTotem].[fkTotem]
                        where [dbo].[Totem].[idTotem] = ${idTotem} and [dbo].[Totem].[fkEstabelecimento] = ${idEmpresa}
                            order by [dbo].[DadoTotem].[idDadosTotem] desc;`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function componenteMax(idTotem) {

    instrucao = `select max(qtdProcessador) as maximoProcessador from [dbo].[DadoTotem] where dataHora >= DATEADD(WEEK, -1, GETDATE()) 
                    AND dataHora <= GETDATE() and fkTotem = ${idTotem};`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function componenteMax()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFranquiaTotem(idUsuario) {

    var instrucao = '';

    if(process.env.AMBIENTE_PROCESSO = "producao"){
        instrucao = `SELECT 
                a.id AS idTotem,
                a.titulo,
                a.descricao,
                a.fk_usuario,
                u.id AS idUsuario,
                u.nome,
                u.email,
                u.senha
            FROM aviso a
                INNER JOIN usuario u
                    ON a.fk_usuario = u.id
            WHERE u.id = ${idUsuario};
        `;
    } else{
        instrucao = `
        SELECT 
            a.id AS idTotem,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    }

    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicarTotem(fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco, empresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco);
    var instrucao = `
        INSERT INTO totem (fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco) VALUES (${fkEstabelecimento}, '${numeroSerial}', '${processador}', ${alertaProcessador}, '${ram}', ${alertaRam}, '${disco}', ${alertaDisco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarTotem(idTotem, fkEstabelecimento, disco, processador, ram, alertaProcess, alertaRam, alertaDisco) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idTotem, fkEstabelecimento, disco, processador, ram, alertaProcess, alertaRam, alertaDisco);
    var instrucao = `
        UPDATE totem SET disco = '${disco}' , processador = '${processador}' , ram = '${ram}' , alertaProcessador = '${alertaProcess}' , alertaRam = '${alertaRam}' , alertaDisco = ${alertaDisco} WHERE idtotem = ${idTotem} and fkestabelecimento = ${fkEstabelecimento};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarTotem(idTotem, fkEstabelecimento) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idTotem, fkEstabelecimento);
    var instrucao = `
        DELETE FROM totem WHERE idtotem = ${idTotem} AND fkEstabelecimento = ${fkEstabelecimento};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarFranquiaTotem,
    listarTotem,
    publicarTotem,
    editarTotem,
    deletarTotem,
    listarDadosTotem,
    componenteMax,
}
