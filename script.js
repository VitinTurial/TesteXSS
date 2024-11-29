const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Usando o body-parser para lidar com os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de comentários armazenados (simulação de banco de dados)
let comentarios = [];

// Página inicial com o formulário
app.get('/', (req, res) => {
    let comentariosHtml = comentarios.map(comentario => {
        return `<p><strong>Usuário:</strong> ${comentario}</p>`;
    }).join('');
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Comentários</title>
        </head>
        <body>
            <h1>Deixe seu comentário</h1>
            <form action="/salvar_comentario" method="POST">
                <label for="comentario">Comentário:</label>
                <textarea name="comentario" id="comentario" rows="4" cols="50"></textarea>
                <br>
                <button type="submit">Enviar</button>
            </form>

            <h2>Comentários:</h2>
            <div id="comentarios">
                ${comentariosHtml}
            </div>
        </body>
        </html>
    `);
});

// Rota para salvar comentário
app.post('/salvar_comentario', (req, res) => {
    const comentario = req.body.comentario;
    comentarios.push(comentario); // Simulando o armazenamento do comentário
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
