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

function publicarFranquia(req, res) {
    var nome = req.body.nomeServer;
    var cpnj = req.body.cpnjfServer;
    var tel = req.body.telServer;
    var cep = req.body.cepServer;
    var empresa = req.body.empresaServer;
    var fkempresa = req.body.fkEmpresa;


    if (nome == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (cpnj == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (tel == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        franquiaController.publicarFranquia(nome, cpnj, tel, cep, empresa)
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
    var empresa = req.body.empresa;
    var fkEstabelecimento = req.body.estabelecimento;
    var nome = req.body.nome;
    var cnpj = req.body.cnpj;
    var telefone = req.body.telefone;
    var cep = req.body.responsavel;

    franquiaController.editarTotem(empresa, fkEstabelecimento, nome , cnpj, telefone, cep)
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
    var idTotem = req.params.fkEmpresa;
    var fkEstabelecimento = req.params.idEstabelecimento;

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
    publicarFranquia,
    editarTotem,
    deletarTotem
}