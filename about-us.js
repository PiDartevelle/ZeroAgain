/*function apparition (paragraphes){
    let paragraphes = document.querySelectorAll(".card");
    let nomacliquer = document.querySelectorAll("h3");

    if (paragraphes.style.display == 'none'){
        paragraphes.style.display == 'block';
    }
}
*/
let paragraphes = document.querySelector(".card");
let nomacliquer = document.querySelector("h3");

nomacliquer.addEventListener('click', function(){
    paragraphes.style.display == 'block';
});