const express = require('express')
const app = express()
const axios = require('axios')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config()
const port = process.env.PORT || 8000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/random', (req,res) => {
   const url = 'https://randomuser.me/api/?results=30'

   const thirtyRandomPeople = async()=>{
      try{
         const response = await axios.get(url)
         const data = response.data.results.sort((a,b)=>(a.name.first > b.name.first) ? 1 : ((b.name.first > a.name.first) ? -1 : 0))
         return res.render('main/random', {data})
      }catch(error){
         console.error(error);
      }
   }
   thirtyRandomPeople()
})

app.get('/movies', (req,res) => {
   const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='
   const key = process.env.API_KEY
   const nowPlaying = '&language=en-US&page=1'
   
   const nowPlayingMovies = async()=> {
      try{
         const response = await axios.get(url+key+nowPlaying)
         const data = response.data.results
         return res.render('main/movies', {data})
      }catch(error){
         console.error(error);
      }
   }
   nowPlayingMovies()
})

app.get('/movies/alternative', (req,res) => {
   const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='
   const key = process.env.API_KEY
   const nowPlaying = '&language=en-US&page=1'
   
   const nowPlayingMovies = async()=> {
      try{
         const response = await axios.get(url+key+nowPlaying)
         const data = response.data.results
         return res.render('main/moviesAlternative', {data})
      }catch(error){
         console.error(error);
      }
   }
   nowPlayingMovies()
})


app.listen(port, () => {
   console.log(`Listening on port ${port}`)
})