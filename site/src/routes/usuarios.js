var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarFuncionarios/:idEmpresa", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.get("/buscarEmpresa", function (req, res) {
    usuarioController.buscarEmpresa(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.delete("/deletarUsuario/:fkEmpresa/:idUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

router.put("/editarFuncionario/:empresa/:usuario", function (req, res) {
    usuarioController.editarUsuario(req, res);
})

module.exports = router;