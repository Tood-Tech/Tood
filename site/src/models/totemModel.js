var database = require("../database/config");

function listarTotem(idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select totem.*, estabelecimento.nome from totem 
    join estabelecimento on totem.fkestabelecimento = estabelecimento.idEstabelecimento
    join empresa on empresa.idempresa = estabelecimento.fkempresa where empresa.idempresa = '${idEmpresa}' 
    order by totem.fkestabelecimento , totem.idtotem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarTotem(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucao = `
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
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFranquiaTotem(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicarTotem(fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, gpu, alertaGpu, disco, alertaDisco, empresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, gpu, alertaGpu, disco, alertaDisco);
    var instrucao = `
        INSERT INTO totem (fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, gpu, alertaGpu, disco, alertaDisco) VALUES (${fkEstabelecimento}, '${numeroSerial}', ${processador}, ${alertaProcessador}, ${ram}, ${alertaRam}, ${gpu}, ${alertaGpu}, ${disco}, ${alertaDisco});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarTotem(idTotem, fkEstabelecimento, disco, processador, gpu, ram, alertaProcess, alertaRam, alertaDisco, alertaGpu) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idTotem, fkEstabelecimento, disco, processador, gpu, ram, alertaProcess, alertaRam, alertaDisco, alertaGpu);
    var instrucao = `
        UPDATE totem SET disco = '${disco}' , processador = '${processador}' , gpu = '${gpu}' , ram = '${ram}' , alertaProcessador = '${alertaProcess}' , alertaRam = '${alertaRam}' , alertaDisco = ${alertaDisco} , alertaGpu = ${alertaGpu} WHERE idtotem = ${idTotem} and fkestabelecimento = ${fkEstabelecimento};
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
    pesquisarTotem,
    publicarTotem,
    editarTotem,
    deletarTotem
}
