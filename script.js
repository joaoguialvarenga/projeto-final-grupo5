//chave da API 
const apiKey = '3820de5f9f25b689a03f6a04ecdd492d';

//funcao que carrega os filmes dos últimos lançamentos 
function carregarFilmesLatest(sectionId){
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR&page=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const filmes = data.results;
      const section = document.getElementById(sectionId);
      const ul = section.querySelector('ul');

      filmes.forEach(filme => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `desc/index.html?id=${filme.id}`;
        a.target = '_blank'; // Abre em uma nova aba
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
        img.alt = filme.title;
        a.appendChild(img); 
        li.appendChild(a); 
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-solid', 'fa-heart');
        heartIcon.classList.add('favorite-icon');
        heartIcon.addEventListener('click', (event) => {
          event.stopPropagation();
          toggleFavorite(filme, heartIcon);
        });

        li.appendChild(heartIcon); 
        ul.appendChild(li);
        ul.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao carregar filmes dos ultimos lancamentos:', error));
}
//carregando os filmes
carregarFilmesLatest('lancamentos');


//funcao que carrega o filmes populares
function carregarFilmesPopulares(sectionId) {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const filmes = data.results;
      const section = document.getElementById(sectionId);
      const ul = section.querySelector('ul');

      filmes.forEach(filme => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `desc/index.html?id=${filme.id}`; 
        a.target = '_blank'; 
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
        img.alt = filme.title;
        a.appendChild(img);
        li.appendChild(a); 
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-solid', 'fa-heart');
        heartIcon.classList.add('favorite-icon');
        heartIcon.addEventListener('click', (event) => {
          event.stopPropagation();
          toggleFavorite(filme, heartIcon);
        });

        li.appendChild(heartIcon); 
        ul.appendChild(li);
        ul.appendChild(li); 
      });
    })
    .catch(error => console.error('Erro ao carregar filmes populares:', error));
}
//carregando os filmes populares
carregarFilmesPopulares('populares');

// Função para carregar imagens de filmes em uma determinada categoria
function carregarFilmesPorCategoria(categoriaId, sectionId) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoriaId}&language=pt-br`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const filmes = data.results;
        const section = document.getElementById(sectionId);
        const ul = section.querySelector('ul');

        filmes.forEach(filme => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `desc/index.html?id=${filme.id}`; // Link para detalhes do filme, por exemplo
          a.target = '_blank'; // Abre em uma nova aba
          const img = document.createElement('img');
          img.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
          img.alt = filme.title;
          a.appendChild(img); // Coloca a imagem dentro do link
          li.appendChild(a); // Coloca o link dentro do elemento <li>
          const heartIcon = document.createElement('i');
          heartIcon.classList.add('fa-solid', 'fa-heart');
          heartIcon.classList.add('favorite-icon');
          heartIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(filme, heartIcon);
          });
  
          li.appendChild(heartIcon); // Coloca o ícone de coração dentro do <li>
          ul.appendChild(li);
          ul.appendChild(li); // Adiciona o <li> na lista de filmes da seção
        });
      })
      .catch(error => console.error('Erro ao carregar filmes:', error));
}

// Chamar a função para carregar filmes em cada seção
carregarFilmesPorCategoria(28, 'acao');
carregarFilmesPorCategoria(12, 'aventura'); 
carregarFilmesPorCategoria(16, 'animacao');
carregarFilmesPorCategoria(35, 'comedia');
carregarFilmesPorCategoria(80, 'crime');
carregarFilmesPorCategoria(99, 'documentario');
carregarFilmesPorCategoria(18, 'drama');
carregarFilmesPorCategoria(10751, 'familia'); 
carregarFilmesPorCategoria(14, 'fantasia');
carregarFilmesPorCategoria(36, 'historia');
carregarFilmesPorCategoria(27, 'terror');
carregarFilmesPorCategoria(10402, 'musica');
carregarFilmesPorCategoria(9648, 'misterio');
carregarFilmesPorCategoria(10749, 'romance'); 
carregarFilmesPorCategoria(878, 'ficcao');
carregarFilmesPorCategoria(10770, 'cinema');
carregarFilmesPorCategoria(53, 'thriller');
carregarFilmesPorCategoria(10752, 'guerra');
carregarFilmesPorCategoria(37, 'faroeste');



document.querySelectorAll('.carrossel').forEach(carrossel => {
  const prevButton = carrossel.querySelector('.prev');
  const nextButton = carrossel.querySelector('.next');
  const carrosselContainer = carrossel.querySelector('.carrossel-container');
  const filmeLista = carrossel.querySelector('.filme-lista');

  const scrollUnit = 200; // Ajuste conforme necessário

  nextButton.addEventListener('click', () => {
      // Desloca o connem têiner do carrossel para a direita pela unidade de rolagem
      carrosselContainer.scrollBy({
          left: scrollUnit,
          behavior: 'smooth' // Adiciona uma animação suave
      });
  });

  prevButton.addEventListener('click', () => {
      // Desloca o contêiner do carrossel para a esquerda pela unidade de rolagem
      carrosselContainer.scrollBy({
          left: -scrollUnit,
          behavior: 'smooth' // Adiciona uma animação suave
      });
  });
});

function isFavorited(filmeId) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  return favoritos.some(fav => fav.id === filmeId);
}

function toggleFavorite(filme, heartIcon) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const index = favoritos.findIndex(fav => fav.id === filme.id);
  if (index !== -1) {
    favoritos.splice(index, 1);
    heartIcon.classList.remove('favorited');
  } else {
    favoritos.push(filme);
    heartIcon.classList.add('favorited');
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODIwZGU1ZjlmMjViNjg5YTAzZjZhMDRlY2RkNDkyZCIsIm5iZiI6MTcyMDA1OTc1MS4xOTA5NDYsInN1YiI6IjY2Nzg3M2IyNGUxNTNiZWRiOWYyNTQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8_Bbjeog_4wpI5TgchIJiRyx5P_mcFOo5w7ID-feu0k'
  }
};

document.querySelector('#search-button').addEventListener('click', (event) => {
  event.preventDefault();
  const query = document.querySelector('#search-input').value;
  if (query) {
      const searchLink = document.querySelector('#search-link');
      searchLink.href = `pesquisa.html?query=${encodeURIComponent(query)}`;
      searchLink.click();
  }
});

document.querySelector('#search-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault();
      const query = document.querySelector('#search-input').value;
      if (query) {
          const searchLink = document.querySelector('#search-link');
          searchLink.href = `pesquisa.html?query=${encodeURIComponent(query)}`;
          searchLink.click();
      }
  }
});



