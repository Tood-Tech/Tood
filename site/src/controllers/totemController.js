var totemController = require("../models/totemModel");

function testarTotem(req, res) {
    console.log("ENTRAMOS NO totemController");
    res.send("ENTRAMOS NO TOTEM CONTROLLER");
}

function listarTotem(req, res) {
    var idEmpresa = req.params.idEmpresa;

    totemController.listarTotem(idEmpresa).then(function (resultado) {
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

function componenteMax(req, res) {
    var idTotem = req.params.idTotem;

    totemController.componenteMax(idTotem).then(function (resultado) {
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

function listarDadosTotem(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var idTotem = req.params.idTotem;

    totemController.listarDadosTotem(idEmpresa, idTotem).then(function (resultado) {
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

function editarTotem(req, res) {
    var idTotem = req.params.idTotem;
    var fkEstabelecimento = req.body.fkEstabelecimento;
    var disco= req.body.disco;
    var processador = req.body.processador;
    var ram = req.body.ram;
    var alertaProcess = req.body.alertaProcess;
    var alertaRam = req.body.alertaRam;
    var alertaDisco = req.body.alertaDisco;

    totemController.editarTotem(idTotem, fkEstabelecimento, disco, processador, ram, alertaProcess, alertaRam, alertaDisco)
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

function publicarTotem(req, res) {
    var fkEstabelecimento = req.body.fkEstabelecimentoServer;
    var numeroSerial = req.body.numeroSerialServer;
    var processador = req.body.processadorServer;
    var alertaProcessador = req.body.alertaProcessadorServer;
    var ram = req.body.ramServer;
    var alertaRam = req.body.alertaRamServer;
    var disco = req.body.discoServer;
    var alertaDisco = req.body.alertaDiscoServer;

    if (fkEstabelecimento == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (numeroSerial == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (processador == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        totemController.publicarTotem(fkEstabelecimento, numeroSerial, processador, alertaProcessador, ram, alertaRam, disco, alertaDisco)
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

module.exports = {
    testarTotem,
    listarTotem,
    listarFranquiaTotem,
    pesquisarTotem,
    publicarTotem,
    editarTotem,
    deletarTotem,
    listarDadosTotem,
    componenteMax,
}