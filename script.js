const searches=document.querySelector("#searchForm");

searches.addEventListener("submit",(e)=>{
  e.preventDefault();
  const search=document.querySelector("#searchMovie");
  fetchData(search.value);
  search.value="";
});
const fetchData=async(search)=>{
  try {
    const response=await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=ee62d61b`
    );
    const data=await response.json();
    cloneData(data.Search);
  } catch (error){
    const parent=document.querySelector(".cards-parent");
    parent.innerHTML="<h1>Oops...Not found!</h1>";
  }
};
const cloneData=(movies) => {
  const parent=document.querySelector(".cards-parent");
  const template=document.querySelector("#movie-card-template");
  parent.innerHTML="";

  movies.map((movie)=>{
    if (movie.Poster=="N/A") 
    return;
    const cardClone=template.content.cloneNode(true); //for deep cloning nodes
    makeCard(cardClone,movie);
    parent.appendChild(cardClone);
  });
};
const makeCard=(cardClone,movie)=>{
  const image=cardClone.querySelector(".card-image");
  const title=cardClone.querySelector("#title span");
  const year=cardClone.querySelector("#year span");
  const type=cardClone.querySelector(".movie-type span");
  image.src=movie.Poster;
  title.innerHTML=movie.Title;
  year.innerHTML=movie.Year;
  type.innerHTML=movie.Type.toUpperCase();
};