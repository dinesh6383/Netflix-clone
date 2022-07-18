//Why this is used because when the screen gets loaded all the function are being called...
window.onload =() => {
    getOriginals()
    getTrending()
    getTopRated()  
    getDramas()
    getComedy() 
    getKidsMovies() 
    getNewRelases()
}

//It is main function of the code where all the function contains this function call.
//It fetches the api and returns the data as an output.
//Try catch block is used tio handle the error.
const fetchMovies = (url, dom_element, image_path) =>{
    let link = fetch(url)
    link.then(response => response.json())
    .then(value =>{
        try{
            displayMovies(value.results,dom_element,image_path)
        }
       catch(e){
        console.log(e)
       }
    })
}

//The get orgiginal functions get the netflix original contents form the API and passes it to the fetchMovies() function.
const getOriginals = () => {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key=13fd01e9e3c163002560499a4744d05b&with_networks=213';
    fetchMovies(url,'#original-contents','poster_path')
}

//The get trending function get the trending contents form the API and passes it to the fetchMovies() function.
const getTrending = () =>{
    let url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=13fd01e9e3c163002560499a4744d05b'
    fetchMovies(url,'#trending','backdrop_path')
}

//The top rated movies are beign fetched and passed to fetchMovied() function.
const getTopRated = () =>{
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=13fd01e9e3c163002560499a4744d05b&language=en-US&page=1'
    fetchMovies(url,'#top-rated','backdrop_path')
}

//It gets the drama contents and fetch to the fetchMovies() function
const getDramas = () => {
    let url = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=13fd01e9e3c163002560499a4744d05b'
    fetchMovies(url,'#drama','backdrop_path')
}

//It gets the comedy contents and fetched to the fetchMovies() function.
const getComedy = () => {
    let url = 'https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=13fd01e9e3c163002560499a4744d05b'
    fetchMovies(url,'#comedy','backdrop_path')
}

//It gets the kids contents and fetched to the fetchMovies() function.
const getKidsMovies = () => {
    let url = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=13fd01e9e3c163002560499a4744d05b'
    fetchMovies(url,'#kids','backdrop_path')
}

//It gets the recent released contents and fetched to the fetchMovies() function.
const getNewRelases = () => {
    let url = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-04-15&primary_release_date.lte=2022-07-15&api_key=13fd01e9e3c163002560499a4744d05b'
    fetchMovies(url,'#new-movies','backdrop_path')
}

//Display movie function is used to place the fetched contents into the DOM by creating img tag and placing inside it.
const displayMovies = (movielist, dom_element, image_path) => {
    
    let movieEl = document.querySelector(dom_element);
    
    for(var movie of movielist){
        if(movie[image_path]!=null){
            let movieHolder = document.createElement('img')
            movieHolder.setAttribute('data-id',movie.id)
            movieHolder.src = `https://image.tmdb.org/t/p/original${movie[image_path]}`
            movieEl.append(movieHolder)
            movieHolder.addEventListener('click',(e)=>{
                getTrailer(e.target.getAttribute('data-id'))
            })
        }
    }  
}

//Get trailer function is used to get the trailer through the id fetched and passes it to the setTrailer function
const getTrailer = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=13fd01e9e3c163002560499a4744d05b&language=en-US`)
    .then(response => response.json())
    .then(value => {
        const res = value.results
        const getDetails = res.filter(result => {
            if(result.site == 'YouTube' && result.type == 'Trailer'){
                return true
            }
            else{
                return false
            }
        })
        setTrailer(getDetails);
    })
    //one of the method to get the modal functionality through jquery.
    //It is used to call that API..
    $('#trailer-modal').modal('show')
}

//Set trailer function is used to set the trailer inside the modals iframe. 
const setTrailer = (details) => {
    let frame = document.getElementById('movieTrailer')
    let noMovieFound = document.querySelector('.movieNotFound')
        if(details.length > 0){
            noMovieFound.classList.add('d-none')
            frame.classList.remove('d-none')
            frame.src =  `https://www.youtube.com/embed/${details[0].key}`
        }
        else{
            frame.classList.add('d-none')
            noMovieFound.classList.remove('d-none')
        }
        let closeBtn = document.querySelector('.btn-close')
            closeBtn.onclick = () =>{
            frame.src =  ''
     }
}



