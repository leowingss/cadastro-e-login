const fs = require('fs')
const path = require("path")
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')


let usuarioJson = path.join('usuario.json')
const usuarioController = {
    registroForm: (req, res) => {
        res.render('registroUsuario')
    },
    salvarForm: (req, res) => {
        let { nome, email, senha } = req.body
        let senhaC = bcrypt.hashSync(senha, 10)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            return res.render('registroUsuario', { errors: errors.mapped(), old: req.body })
        }
        let usuario = JSON.stringify({ nome, email, senha: senhaC })

        fs.writeFileSync(usuarioJson, usuario)
            // res.send('Usuário cadastrado com sucesso!')
        res.redirect('/usuarios/login')
    },
    loginForm: (req, res) => {
        res.render("login")
    },
    logarUsuario: (req, res) => {
        let { email, senha } = req.body
        let usuarioSalvo = fs.readFileSync(usuarioJson, { enconding: 'utf-8' })
        usuarioSalvo = JSON.parse(usuarioSalvo)

        if (email != usuarioSalvo.email) {
            return res.send('Usuário inválido')
        }

        if (!bcrypt.compareSync(senha, usuarioSalvo.senha)) {
            return res.render('senhaInvalida')
        }

        res.redirect('/usuarios/saudacao')
    },
    saudacao: (req, res) => {
        res.render('saudacao')
    }



}

module.exports = usuarioController