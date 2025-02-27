import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  // Importa a função para transformar URL em caminho de arquivo
import { gethomepage, getfilmespage, getseriespage, getgeneros } from './aut-views.js';

const app = express();
const PORT = 3000;

// Obtenção do caminho correto do arquivo
const __filename = fileURLToPath(import.meta.url);  // Obtém o caminho completo do arquivo atual
const __dirname = path.dirname(__filename);  // Obtém o diretório onde o arquivo está localizado

// Configuração do view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));  // Ajuste para a pasta de views

// Servir arquivos estáticos da pasta 'assets'
app.use('/assets', express.static(path.join(__dirname, '../assets')));


// Criar e configurar o router
const router = express.Router();
// Rotas
app.get('/', gethomepage);
app.get('/filmes', getfilmespage);
app.get('/series', getseriespage);

router.get('/generos/:genreId',getgeneros);
app.use(router);


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
