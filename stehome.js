const footerYear = function () {
  const span = document.getElementById('year')
  span.innerText = new Date().getFullYear()
}

// ENDPOINT DI OGGI -> 'https://striveschool-api.herokuapp.com/api/agenda'
const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
// su questo endpoint oggi potremo fare chiamate GET, POST, PUT e DELETE

const getConcerts = function () {
  // in questa funzione recupererò i concerti esistenti tramite chiamata HTTP con metodo GET
  fetch(concertsURL, {
    // method: 'GET'
    // body:
    // headers: {
    //     Authorization
    // }
  })
    .then((response) => {
      // qui se non altro il server ci ha risposto!
      if (response.ok) {
        // qui entrate non solo se avete ricevuto la response, ma solo se questa response conteneva
        // il dato che volevate!
        // proseguiamo ad ESTRARRE il JSON da questa response che è OK
        return response.json()
      } else {
        // avete ricevuto dal server un 401, 403, 404, 500
        // per evitare di duplicare anche qui la gestione dell'errore (che intendo configurare nel blocco catch)
        // mi teletrasporto nel blocco catch, sollevando a mano un'ECCEZIONE
        throw new Error('Response NON ok')
      }
    })
    .then((data) => {
      // se finisco qui, l'operazione di ESTRAZIONE JSON è andata a buon fine!

      // qui, per prima cosa, nascondo lo spinner dalla pagina!
      document.getElementById('spinner-section').classList.add('d-none')

      console.log('ARRAY DI CONCERTI ESISTENTI', data)
      //   ora, da questo array di concerti, dobbiamo creare delle colonne con dentro delle card
      data.forEach((concertObject) => {
        const newCol = document.createElement('div')
        newCol.classList.add('col')
        newCol.innerHTML = `
            <div class="card">
                <img src="https://thumbs.dreamstime.com/b/rock-concert-29673156.jpg" class="card-img-top" alt="concert stock picture">
                <div class="card-body">
                    <h5 class="card-title">${concertObject.name}</h5>
                    <p class="card-text">${concertObject.description}</p>
                    <p class="card-text">${concertObject.time} - ${concertObject.price}€</p>
                    <a href="./details.html?id=${concertObject._id}" class="btn btn-primary">VAI AI DETTAGLI</a>
                </div>
            </div>
        `
        const row = document.getElementById('products-lineUp')
        row.appendChild(newCol)
      })
    })
    .catch((error) => {
      // qui significa che abbiamo riscontrato un problema
      console.log('ERRORE NELLA FETCH', error)
    })
}

footerYear()
getConcerts()