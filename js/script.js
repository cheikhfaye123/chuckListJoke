const fetchJoke = document.getElementById("fetchJoke")
const jokeList =document.getElementById("jokeList")

fetchJoke.addEventListener('click', hacerClick)

function hacerClick() {
    fetch ("https://api.chucknorris.io/jokes/random")
        .then (response => response.json())
        .then (data => {
            if (localStorage.getItem("chistes") === null) {
                guardarChistes([data.value]);
            } else {
                let chistes = obtenerChistes();
                chistes.push(data.value);
                guardarChistes(chistes);
            }
            
            mostrarChistesEnPantalla()
        })
        .catch (err => console.error('Este es el error: ', err))
}

mostrarChistesEnPantalla()

function eliminarChistePorIndice(i) {
    const chistes = obtenerChistes();
    chistes.splice(i, 1); 
    guardarChistes(chistes);
    mostrarChistesEnPantalla()
}

function guardarChistes(chistes) {
    localStorage.setItem("chistes",  JSON.stringify(chistes));
}

function obtenerChistes() {
    return JSON.parse(localStorage.getItem("chistes"));
}

function mostrarChistesEnPantalla() {
    const chistes = obtenerChistes();
    let chistesTotales = ""
    if(chistes !==null && chistes[0] !== ''){

    
        chistes.forEach((chiste, index) => {
            let  divchiste = '<div id="padre"><div>' + chiste + '</div>' + '<button onclick="eliminarChistePorIndice(' + index + ');">Eliminar</button></div>'; 
            chistesTotales = chistesTotales + divchiste;
        })
    }
    jokeList.innerHTML = chistesTotales;
}

	
