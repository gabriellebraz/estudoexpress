const { request, response } = require('express');
const express = require('express');
const {uuid} = require ('uuidv4'); // desestruturado pq so quer o Id

const app = express();

app.use(express.json()); //pra ler tbm o json,força a ler

//console.log(app);
//get buscar informaçoes
// post criar informaçao no back end
//put/patch alterar uma informação no back end
// delete deletar informações no back end


/*
parametros
*query params = funciona principalmente 
 dentro do get (filtra) filtros e paginação

*route params = identificar os recursos antes de deletar
identificar recursos na hora de atualizar ou deletar
ele busca para alterar

*request body = traz todo o conteudo da aplicação
resto do contedo na hora de criar ou editar um recurso
*/ 

const projects = [];

app.get('/projects', (request,response) =>{

    //const { title,owner } = request.query; comentei para usar o exeplo de pegar as informaçoes atualizadas da projets
    //console.log(query)
    //console.log(title)
    //console.log(owner)

     return response.json(projects);
});

app.post('/projects',(request,response) => {

        //const body = request.body;
        const {title,owner} = request.body; //metodo desconstruido
        const project = {id:uuid(), title,owner};
       
        projects.push(project);// essse push joga a criação do nosso projeto para nosaa array
        
        // console.log(title)
        // console.log(owner)
        // console.log(project)

        return response.json(project); //sempre retornar o projeto recem criado e nunca exibir a lista completa
})

app.put ('/projects/:id', (request,response) =>{
    
    const {id} = request.params; //aqui pegamos nosso ID

    const {title,owner} = request.body; //retornando uma nova informação
    
    //aqui usamos o findIndex para pecorrer todo o array atras do Id
    //findIndex vai pecorrer todos os projetos, e toda vez que ele percorrer na variavel project
    //caso ela satisfeita e retornar true, ela vai retornar o id que estou passando (project => project.id === id);
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex < 0){
        return response.status(400).json({error:'projeto não foi encontrado'});
    }
    // agora tem um index vou criar uma nova informação do projeto
    const project ={
    id,
    title,
    owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
});


app.delete('/projects/:id', (request,response) =>{

    const {id} = request.params

    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex < 0){
        return response.status(400).json({error:'projeto não foi encontrado'});
    }
    projects.splice(projectIndex,1);

    return response.status(204).send();
    
});

app.listen(3000);
  