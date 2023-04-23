var express = require("express");
var router = express.Router();

var franquiaController = require("../controllers/franquiaController");

router.get("/", function (req, res) {
    franquiaController.testarTotem(req, res);
});

router.get("/listarFranquia", function (req, res) {
    franquiaController.listarFranquia(req, res);
});

router.get("/listarFranquiaEmpresa/:fkEmpresa", function (req, res) {
    franquiaController.listarFranquiaEmpresa(req, res);
});

router.get("/pesquisarTotem/:descricao", function (req, res) {
    franquiaController.pesquisarDescricao(req, res);
});

router.post("/publicarFranquia/:fkEmpresa", function (req, res) {
    franquiaController.publicarFranquia(req, res);
});

router.put("/editarTotem/:fkEmpresa/:idEstabelecimento", function (req, res) {
    franquiaController.editarTotem(req, res);
});

router.delete("/deletarTotem/:fkEmpresa/:idEstabelecimento", function (req, res) {
    franquiaController.deletarTotem(req, res);
});

module.exports = router;