import { getmoviesbypage,getpopularSeries,getpopularMovies,getseriesbypage } from "./api-externa.js";
import { getGenerosFilmes,getGenerosSeries } from "./api-externa.js";


//pega dados de api-externa para parece tela principal
export const gethomepage = async(req,res)=>{
    try{
        // Pegando os gêneros de filmes e séries

    
    const generosFilmes = await getGenerosFilmes();
    const generosSeries = await getGenerosSeries();
    const filmes = await getpopularMovies();
    const series = await getpopularSeries();

    res.render('index', { //vao aparecer 6 filmes e series populares 
        generosFilmes: generosFilmes.genres,  // Certifique-se de passar aqui
        generosSeries: generosSeries.genres, 
        filmes: filmes.slice(0,6),
        series: series.slice(0,6),
        })
    } catch(error){
        console.error("erro ao buscar" , error);
        res.status(500).send('erro ao buscar ')
    } 
};
//pega os dados do total de paginas dos filmes 
export const getfilmespage = async(req,res)=>{
    let page = req.query.page || 1;
    const totalGradiente = 30; //quantidade de filme por pagina

    try{
        const data = await getmoviesbypage(page);
        const totalResults = data.total_results;
        const totalPages = Math.ceil(totalResults/totalGradiente);//pega o resultado total e divindo pelo numero de filmes que eu quero no gradiente que no caso e 30 
         //ceil arredondar 
        const maxPages = 10;
        const startPage = Math.max(1,page-4);
        const endPage = Math.min(totalPages,startPage+maxPages-1);

        const pages = [];
        for(let i = startPage;i <= endPage; i++){
            pages.push(i);
        }
        // o res.render passa os dados para view renderizando para o front-end 
        res.render('filmes',{
            filmes: data.results || [],
            page: parseInt(page),
            totalPages: totalPages,//passa o valor total de pag para view
            pages: pages,
        })
    }catch(error){
        console.error('erro ao buscar filmes:',error);
        error.status(500).send('erros ao buscar filmes');
    }
};


export const getseriespage = async(req,res)=>{
    let page = req.query.page || 1;
    const totalGradiente = 30;

    try{
        const data = await getseriesbypage(page);
        const totalResults = data.total_results;
        const totalPages = Math.ceil(totalResults/totalGradiente);

        const maxPages = 10;
        const startPage = Math.max(1,page-4);
        const endPage = Math.min(totalPages,startPage+maxPages-1);

        const pages = [];
        for(let i = startPage; i <= endPage;i++){
            pages.push(i);
        }

        res.render('series',{
            series: data.results || [],
            page: parseInt(page),
            totalPages: totalPages,
            pages:pages,

            });
    }catch(error){
        console.error("error ao buscar series",error);
        error.status(500).send('erro ao buscar series');
    }
};


export const getgeneros = async(req,res)=>{
    const genreId = req.params.genreId; // Pega o ID do gênero vindo da URL
    const page = req.query.page || 1;
    
    try{
        const generosfilmes = await getGenerosFilmes(genreId,page);
        const generosseries = await getGenerosSeries(genreId,page);
        
        const totalResults = generosfilmes.total_results;
        const totalPages = Math.ceil(totalResults/30);

        const maxPages = 10;
        const startPage= Math.max(1,page-4);
        const endPage = Math.min(totalPages, startPage + maxPages - 1);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        res.render('generos', {
            filmes: generosfilmes.results || [],
            series: generosseries.results || [],
            genre: genreId,
            page: parseInt(page),
            totalPages: totalPages,
            pages: pages,
        });
    } catch (error) {
        console.error("Erro ao buscar filmes e séries por gênero", error);
        res.status(500).send('Erro ao buscar filmes e séries por gênero');
    }
};
