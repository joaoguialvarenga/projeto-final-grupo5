const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODIwZGU1ZjlmMjViNjg5YTAzZjZhMDRlY2RkNDkyZCIsIm5iZiI6MTcyMDA1OTc1MS4xOTA5NDYsInN1YiI6IjY2Nzg3M2IyNGUxNTNiZWRiOWYyNTQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8_Bbjeog_4wpI5TgchIJiRyx5P_mcFOo5w7ID-feu0k'
    }
    };
    document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        buscarFilmes(query);
    }
});
  
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

function buscarFilmes(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=true&language=pt-BR&page=1&query=${encodeURIComponent(query)}`, options)
        .then(response => response.json())
        .then(data => {
            exibirResultadosPesquisa(data.results);
        })
        .catch(err => console.error('Erro ao buscar filmes:', err));
}

function exibirResultadosPesquisa(filmes) {
    const ulFilmesPesquisa = document.querySelector('#filmes-pesquisa');
    ulFilmesPesquisa.innerHTML = ''; // Clear previous results

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
        const titulo = document.createElement('span');
        titulo.textContent = filme.title;
        li.appendChild(titulo);
        ulFilmesPesquisa.appendChild(li);
    });
}