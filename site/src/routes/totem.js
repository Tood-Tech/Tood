var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController");

router.get("/", function (req, res) {
    totemController.testarTotem(req, res);
});

router.get("/listarTotem/:idEmpresa", function (req, res) {
    totemController.listarTotem(req, res);
});

router.get("/componenteMax/:idTotem", function (req, res) {
    totemController.componenteMax(req, res);
});

router.get("/listarDadosTotem/:idEmpresa/:idTotem", function (req, res) {
    totemController.listarDadosTotem(req, res);
});


router.get("/listarFranquiaTotem/:idUsuario", function (req, res) {
    totemController.listarFranquiaTotem(req, res);
});

router.post("/publicarTotem/:fkEstabelecimento", function (req, res) {
    totemController.publicarTotem(req, res);
});

router.get("/pesquisarTotem/:descricao", function (req, res) {
    totemController.pesquisarDescricao(req, res);
});

router.put("/editarTotem/:idTotem/:fkEstabelecimento", function (req, res) {
    totemController.editarTotem(req, res);
});

router.delete("/deletarTotem/:idTotem/:fkEstabelecimento", function (req, res) {
    totemController.deletarTotem(req, res);
});

module.exports = router;