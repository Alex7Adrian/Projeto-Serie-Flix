import express from 'express';
import fetch from 'node-fetch';  // Usando o import
import path from 'path';

const app = express();
const PORT = 3000;
const api_tmdb_key = 'd349eb82b1dbdd57cedbf1764658e88a';

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));  // Substituindo __dirname para compatibilidade com ESM

// Serve arquivos estáticos da pasta 'assets'
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));  // Substituindo __dirname para compatibilidade com ESM

// Rota para a página inicial (exibe filmes e séries)
app.get('/', async (req, res) => {
  try {
    // Buscando filmes e séries
    const filmesResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_tmdb_key}&page=1`);
    const filmesData = await filmesResponse.json();
    
    const seriesResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_tmdb_key}&page=1`);
    const seriesData = await seriesResponse.json();
    
    // Renderizando a página inicial com filmes e séries
    res.render('index', {
      filmes: filmesData.results.slice(0, 6),  // Passa os 6 primeiros filmes
      series: seriesData.results.slice(0, 6)   // Passa as 6 primeiras séries
    });
  } catch (error) {
    console.error("Erro ao buscar filmes ou séries:", error);
    res.status(500).send('Erro ao buscar filmes ou séries');
  }
});

// Rota para a página de filmes (exibe todos os filmes)
app.get('/filmes', async (req, res) => {
  let page = req.query.page || 1;
  const resultsPerPage = 30;  // Definindo um limite de filmes por página 
  
  try {
    // Buscando todos os filmes
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_tmdb_key}&page=${page}`);
    const data = await response.json();

    const totalResults = data.total_results;  // Número total de filmes
    const totalPages = Math.ceil(totalResults / resultsPerPage);  // Calculando total de páginas com base nos resultados e resultados por página

    // Controlando a quantidade de páginas a ser exibida na paginação (max 10 páginas)
    const maxPages = 10;
    const startPage = Math.max(1, page - 4);  // Garantir que a página inicial não seja menor que 1
    const endPage = Math.min(totalPages, startPage + maxPages - 1);  // Limitar a quantidade de páginas visíveis

    // Gerando a lista de páginas a serem exibidas
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    res.render('filmes', { 
      filmes: data.results || [],  // Passando os filmes para a view
      page: parseInt(page),  // Página atual
      totalPages: totalPages,  // Total de páginas
      pages: pages,  // Páginas para a navegação
    });
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).send('Erro ao buscar filmes');
  }
});

// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
