
const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6ba7bbb3e4daaac860be860ed95f1f30&page=1'
const img_url = 'https://image.tmdb.org/t/p/w1280'
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=6ba7bbb3e4daaac860be860ed95f1f30&page=1&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(api_url)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${img_url + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <div class="year"><h6>${releaseyear(release_date)}</div>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function releaseyear(year){
    return year.slice(0, 4)
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(search_url + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})