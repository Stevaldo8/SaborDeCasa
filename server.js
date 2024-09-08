const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsing do body como JSON
app.use(express.json());

// Servir o HTML e arquivos estáticos
app.use(express.static(__dirname));

// Rota para salvar o cadastro
app.post('/salvarCadastro', (req, res) => {
    const cadastro = req.body.cadastro;
    
    // Caminho do arquivo cadastros.txt
    const filePath = path.join(__dirname, 'cadastros.txt');

    // Adicionar nova linha ao arquivo cadastros.txt
    fs.appendFile(filePath, cadastro, (err) => {
        if (err) {
            console.error('Erro ao salvar o cadastro:', err);
            res.status(500).json({ sucesso: false });
        } else {
            res.json({ sucesso: true });
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
