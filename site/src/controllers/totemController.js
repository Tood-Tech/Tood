var totemController = require("../models/totemModel");

function testarTotem(req, res) {
    console.log("ENTRAMOS NO totemController");
    res.send("ENTRAMOS NO TOTEM CONTROLLER");
}

function listarTotem(req, res) {
    totemController.listarTotem().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarFranquiaTotem(req, res) {
    var idUsuario = req.params.idUsuario;

    totemController.listarFranquiaTotem(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarTotem(req, res) {
    var descricao = req.params.descricao;

    totemController.pesquisarTotem(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicarTotem(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;

    if (titulo == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        totemController.publicarTotem(titulo, descricao, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editarTotem(req, res) {
    var idTotem = req.params.idTotem;
    var fkEstabelecimento = req.body.fkEstabelecimento;
    var disco= req.body.disco;
    var processador = req.body.processador;
    var gpu = req.body.gpu;
    var ram = req.body.ram;
    var alertaProcess = req.body.alertaProcess;
    var alertaRam = req.body.alertaRam;
    var alertaDisco = req.body.alertaDisco;
    var alertaGpu = req.body.alertaGpu;

    totemController.editarTotem(idTotem, fkEstabelecimento, disco, processador, gpu, ram, alertaProcess, alertaRam, alertaDisco, alertaGpu)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletarTotem(req, res) {
    var idTotem = req.params.idTotem;
    var fkEstabelecimento = req.params.fkEstabelecimento;

    totemController.deletarTotem(idTotem, fkEstabelecimento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    testarTotem,
    listarTotem,
    listarFranquiaTotem,
    pesquisarTotem,
    publicarTotem,
    editarTotem,
    deletarTotem
}