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

    instrucao = `select max(qtdProcessador) as maximoProcessador from [dbo].[DadoTotem] where fkTotem = ${idTotem};`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function componenteMax()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function armazenamentoTotal(idTotem) {

    instrucao = `select top 1 qtdDisco as faltaDisco from [dbo].[DadoTotem] 
	                where fkTotem = ${idTotem} order by idDadosTotem desc;`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function armazenamentoTotal()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function memoriaRam(idTotem) {

    instrucao = `select top 1 qtdRam as ram from [dbo].[DadoTotem] 
	                    where fkTotem = ${idTotem} order by idDadosTotem desc;`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function memoriaRam()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ramGrafico(idTotem) {

    instrucao = `select top 1 qtdRam, format(dataHora, 'HH:mm:ss') AS Hour from [dbo].[DadoTotem]
	                where fkTotem = ${idTotem}
		                order by idDadosTotem desc`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function memoriaRam()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function processadorGrafico(idTotem) {

    instrucao = `select top 1 qtdProcessador, format(dataHora, 'HH:mm:ss') AS Hour from [dbo].[DadoTotem]
	                where fkTotem = ${idTotem}
		                order by idDadosTotem desc`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function processadorGrafico()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function discoGrafico(idTotem) {

    instrucao = `select top 1 pacoteEnviado, pacoteRecebido, format(dataHora, 'HH:mm:ss') AS Hour from [dbo].[DadoTotem]
	                where fkTotem = ${idTotem}
		                order by idDadosTotem desc`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function discoGrafico()");

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function statusTotem(idTotem) {

    instrucao = `select idTotem, ativo from [dbo].[Totem];`

    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function statusTotem()");

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

function publicarTotem(fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco, rebootProcessador, rebootRam) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco);
    var instrucao = `
        INSERT INTO totem (fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco, rebootProcessador, rebootRam) VALUES (${fkEstabelecimento}, '${numeroSerial}', '${processador}', ${alertaProcessador}, '${ram}', ${alertaRam}, '${disco}', ${alertaDisco}, ${rebootProcessador}, ${rebootRam});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarTotem(idTotem, fkEstabelecimento, disco, processador, ram, alertaProcess, alertaRam, alertaDisco, rebootProcessador, rebootRam) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idTotem, fkEstabelecimento, disco, processador, ram, alertaProcess, alertaRam, alertaDisco);
    var instrucao = `
        UPDATE totem SET disco = '${disco}' , processador = '${processador}' , ram = '${ram}' , alertaProcessador = '${alertaProcess}' , alertaRam = '${alertaRam}' , alertaDisco = ${alertaDisco}, rebootProcessador = ${rebootProcessador}, rebootRam = ${rebootRam} WHERE idtotem = ${idTotem} and fkestabelecimento = ${fkEstabelecimento};
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
    armazenamentoTotal,
    memoriaRam,
    ramGrafico,
    processadorGrafico,
    discoGrafico,
    statusTotem,
}
