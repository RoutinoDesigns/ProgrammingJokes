const jokeContainer=document.getElementById('jokeContainer')
const jokeText=document.getElementById('joke')
const twitterButton=document.getElementById('Twitter')
const newJokeButton=document.getElementById('newJoke')
$(window).on("load",function(){
	$(".LoadingGif .Loading-Anim").fadeOut(1800, function() {
		$(".LoadingGif").fadeOut(1800);
	});

})
function addclass(param){
    param.classList.add('trimJoke');
}
function removeclass(param){
    param.classList.remove('trimJoke');
}
//Get a JSON formatted joke from the Joke Api
async function getJoke() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/' //CORS Block fix
const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&format=json';
try {
    const response = await fetch(proxyUrl + apiUrl); 
    const data = await response.json();
  // console.log(data)
   
  // Jokes in the api are sometimes separated into 2 parts

   if(data.joke){
  //  console.log(data.joke.length)
        
    if (data.joke.length > 100) {
        addclass(jokeText)
      } else {
        removeclass(jokeText);
      }
    jokeText.innerText=data.joke;
   }else{
        
    if (data.setup.length+data.delivery.length > 100) {
       
        addclass(jokeText)
      } else {
        removeclass(jokeText);
      }
    jokeText.innerText=data.setup+""+data.delivery;
   }

  
} catch (error) {
    //generate another joke
    getJoke(); 
   // console.log("error",error)
  }
}
function tweet() {
    const tweetJoke = jokeText.innerText;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetJoke}`;
    window.open(twitterUrl, '_blank');
  }
  
  // Event Listeners
  newJokeButton.addEventListener('click', getJoke);
  twitterButton.addEventListener('click', tweet);
  
getJoke();
//category
//type
//joke  