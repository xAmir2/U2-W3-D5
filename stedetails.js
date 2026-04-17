const footerYear = function () {
  const span = document.getElementById('year')
  span.innerText = new Date().getFullYear()
}

footerYear()

// mi sto trasportanto l'_id del concerto nella barra degli indirizzi, per fare in modo che tutte le cards
// portino alla pagina dettagli ma in alto ci sia traccia dell'ID del concerto che devo visualizzare!

// prossimi steps: mi recupererò via JS il valore del parametro nell'URL e grazie a lui farò
// un'altra chiamata GET molto specifica, relativa SOLO al concerto con l'id che mi sono recuperato!

const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
// per avere un unico concerto la formula REST dell'URL è -> https://striveschool-api.herokuapp.com/api/agenda/69e0a96bf8cd8e0015f29af2

// come recupero il valore dell'id dalla barra degli indirizzi:
// si recuperano TUTTI I PARAMETRI della barra degli indirizzi
const allTheParameters = new URLSearchParams(location.search)
// da questo oggetto con tutti i parametri, noi estraiamo solo quello che ci interessa
const concertID = allTheParameters.get('id') // estrae solo il parametro chiamato "id"

const getDetails = function () {
  fetch(concertsURL + '/' + concertID)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('errore nel recupero dettaglio concerto')
      }
    })
    .then((details) => {
      console.log('DETAILS', details)
      //   ho recuperato i dettagli del singolo concerto da visualizzare!
      // adesso spengo lo spinner...
      document.getElementById('spinner-section').classList.add('d-none')
      //   prendo la riga in cui appendere la colonna
      const row = document.getElementById('details')
      row.innerHTML = `
        <div class="col-12 col-md-6">
            <div class="card">
                <img src="https://thumbs.dreamstime.com/b/rock-concert-29673156.jpg" class="card-img-top" alt="concert stock picture">
                <div class="card-body">
                    <h5 class="card-title">${details.name}</h5>
                    <p class="card-text">${details.description}</p>
                    <p class="card-text">${details.time} - ${details.price}€</p>
                    <div class="d-flex justify-content-between">
                        <a href="./backoffice.html?id=${details._id}" class="btn btn-info">✏️MODIFICA CONCERTO</a>
                        <button class="btn btn-danger" onclick="deleteConcert()">🗑️ELIMINA CONCERTO</button>
                    </div>
                </div>
            </div>
        </div>
    `
    })
    .catch((err) => {
      console.log('ERRORE FETCH', err)
    })
}

getDetails()

// GET SU https://striveschool-api.herokuapp.com/api/agenda -> RICEVO TUTTI I CONCERTI
// GET SU https://striveschool-api.herokuapp.com/api/agenda/69e0a96bf8cd8e0015f29af2 -> RICEVO 1 CONCERTO

const deleteConcert = function () {
  // questa funzione eliminerà il concerto attualmente visualizzato
  fetch(concertsURL + '/' + concertID, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // eliminazione andata a buon fine!
        alert('CONCERTO ELIMINATO!')
        // riportiamo l'utente in homepage!
        location.assign('./index.html')
      } else {
        throw new Error("errore nell'eliminazione del concerto!")
      }
    })
    .catch((err) => {
      console.log('ERRORE FETCH', err)
    })
}