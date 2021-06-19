const express = require('express')
const router = express.Router()
const validateRegister = require('../middlewares/validation')

const usuarioController = require('../controllers/usuarioController')

router.get('/criar', usuarioController.registroForm)

router.post('/criar', validateRegister, usuarioController.salvarForm)

router.get('/login', usuarioController.loginForm)

router.post('/login', usuarioController.logarUsuario)

module.exports = router