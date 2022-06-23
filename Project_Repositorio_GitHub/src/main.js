import api from './api';

class App{
    //Criando o Construtor
    constructor(){

        //Criando uma lista de repositórios
        this.repositorios = [];

        //Capturando o formulario
        this.formulario = document.querySelector('form');

        //Metodo para registrar os eventos
        this.registrarEventos();

        // Recuperando a lista
        this.lista = document.querySelector('.list-group');

    }

    // Criando o metodo para registrareventos
    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    
    async adicionarRepositorio(evento){
        // Evita o formulario de carregar a pagina
        evento.preventDefault();

        //Recuperando o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        // Verificar se o input vier vazio sai da aplicaçao
        if (input.length === 0){
            return; // O return sempre sai da função
        }

        let response = await api.get(`/repos/${input}`);
        //console.log(response);

        
        let {name, description, html_url, owner: {avatar_url}} = response.data;

        // Adicionando o repositorio na lista
        this.repositorios.push({
            nome: name,
            descricao:description,
            avatar_url,
            link:html_url,
        });
        
        this.renderizarTela();
    }

    // Renderizar a tela
    renderizarTela(){
        // Limpando o conteudo de lista
        this.lista.innerHTML = '';

        // Percorrendo alista de repositorios e criando os elementos
        this.repositorios.forEach(repositorio =>{

            // Criando os elementos
            //<li> recuperando o elemento
            let li = document.createElement('li');
            // Adicionado os atributos
            li.setAttribute('class', 'list-group-item list-group-item-action');

            //<img>
            let img = document.createElement('img');
            img.setAttribute('src', repositorio.avatar_url);
            // Adicionando a imagem como filha do li
            li.appendChild(img);

            //<strong>
            let strong = document.createElement('strong');
            let textNome = document.createTextNode(repositorio.nome)
            strong.appendChild(textNome);
            li.appendChild(strong);

            //<p>
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorio.descricao);
            p.appendChild(txtDescricao);
            li.appendChild(p);

            //<a>
            let a = document.createElement('a');
            let txtLink = document.createTextNode('Acessar');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorio.link);
            a.appendChild(txtLink);
            li.appendChild(a);

            //Adicionado li como filho da ul
            this.lista.appendChild(li);

            // Limpando o conteudo do imput
            this.formulario.querySelector('input[id=repositorio]').value = '';

            //Adicionando foco no imput
            this.formulario.querySelector('input[id=repositorio]').focus();

            

        })
    }
    
}
new App();