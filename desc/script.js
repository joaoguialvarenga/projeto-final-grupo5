const apiKey = '3820de5f9f25b689a03f6a04ecdd492d';

        function getMovieIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id');
        }

        function fetchMovieDetails(movieId) {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('titulo-filme').textContent = data.title;
                    document.getElementById('titulo-filme').style.fontSize = '40px';
                    document.getElementById('poster-filme').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                    document.getElementById('genero').textContent = 'Gênero: ' + data.genres.map(genre => genre.name).join(', ');
                    document.getElementById('lancamento').textContent = 'Lançamento: ' + data.release_date;
                    document.getElementById('sinopse').textContent = data.overview;
                    document.getElementById('avaliacao').textContent = data.vote_average;

                    fetchRecommendations(movieId);

                })
                .catch(error => console.error('Erro ao carregar detalhes do filme:', error));
        }

        document.addEventListener('DOMContentLoaded', () => {
            const movieId = getMovieIdFromUrl();
            if (movieId) {
                fetchMovieDetails(movieId);
            } else {
                console.error('ID do filme não encontrado na URL');
            }
        });

        function fetchRecommendations(movieId) {
            const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=pt-BR&page=1`;
        
            fetch(recommendationsUrl)
                .then(response => response.json())
                .then(data => {
                    // Process recommendations data and update your HTML
                    console.log('Recommendations:', data);
                    // Update HTML with recommendations data
                    updateRecommendations(data.results); // Assuming data.results contains recommended movies
                })
                .catch(error => console.error('Erro ao carregar recomendações:', error));
        }
        
        function updateRecommendations(recommendations) {
            const container = document.querySelector('.image-container2');
        
            recommendations.forEach(movie => {
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
        
                container.appendChild(img);
            });
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            const movieId = getMovieIdFromUrl();
            if (movieId) {
                fetchMovieDetails(movieId);
            } else {
                console.error('ID do filme não encontrado na URL');
            }
        });

        function fetchMovieReviews(movieId) {
            const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`;
        
            fetch(reviewsUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Reviews:', data);
                    updateReviews(data.results); // Assuming data.results contains reviews
                })
                .catch(error => console.error('Erro ao carregar reviews:', error));
        }
        
        function updateReviews(reviews) {
            const commentsContainer = document.querySelector('.comentarios');
            const commentsList = commentsContainer.querySelector('.comentario');
        
            reviews.forEach(review => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comentario');
        
                const profileImageDiv = document.createElement('div');
                profileImageDiv.classList.add('image-comentario');
        
                const profileImage = document.createElement('img');
                profileImage.src = 'iconeperfil.png'; // Placeholder image
                profileImage.alt = 'Perfil';
        
                const userName = document.createElement('h2');
                userName.textContent = review.author;
        
                const commentText = document.createElement('p');
                commentText.textContent = review.content;
        
                profileImageDiv.appendChild(profileImage);
                profileImageDiv.appendChild(userName);
                commentDiv.appendChild(profileImageDiv);
                commentDiv.appendChild(commentText);
        
                commentsList.appendChild(commentDiv);
            });
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            const movieId = getMovieIdFromUrl();
            if (movieId) {
                fetchMovieDetails(movieId);
                fetchRecommendations(movieId);
                fetchMovieReviews(movieId); // Add this line to fetch reviews
            } else {
                console.error('ID do filme não encontrado na URL');
            }
        });
        




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
                searchLink.href = `../pesquisa.html?query=${encodeURIComponent(query)}`;
                searchLink.click();
            }
          });
          
          document.querySelector('#search-input').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const query = document.querySelector('#search-input').value;
                if (query) {
                    const searchLink = document.querySelector('#search-link');
                    searchLink.href = `../pesquisa.html?query=${encodeURIComponent(query)}`;
                    searchLink.click();
                }
            }
          });      