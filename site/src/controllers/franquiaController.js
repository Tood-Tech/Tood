var franquiaController = require("../models/franquiaModel");

function testarTotem(req, res) {
    console.log("ENTRAMOS NO franquiaController");
    res.send("ENTRAMOS NO TOTEM CONTROLLER");
}

function listarFranquia(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    franquiaController.listarFranquia(fkEmpresa).then(function (resultado) {
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

function listarFranquiaEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    franquiaController.listarFranquiaEmpresa(fkEmpresa)
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

    franquiaController.pesquisarTotem(descricao)
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
        franquiaController.publicarTotem(titulo, descricao, idUsuario)
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

    franquiaController.editarTotem(idTotem, fkEstabelecimento, disco, processador, gpu, ram, alertaProcess, alertaRam, alertaDisco, alertaGpu)
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

    franquiaController.deletarTotem(idTotem, fkEstabelecimento)
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
    listarFranquia,
    listarFranquiaEmpresa,
    pesquisarTotem,
    publicarTotem,
    editarTotem,
    deletarTotem
}