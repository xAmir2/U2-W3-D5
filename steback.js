// COME SONO FATTI GLI OGGETTI CONCERTO TRA VERRANNO RECUPERATI/CREATI/MODIFICATI/ELIMINATI da EpiTicket One?
// non è compito vostro, da frontenders, immaginare la struttura di questi oggetti... è compito del backender!

// Giangiorgio mi dice... un concerto è fatto così:
// ci sono 4 PROPRIETÀ, e sono tutte obbligatorie!
// esempio:
// {
// name: 'Pupo a S. Siro',
// description: 'Evento imperdibile',
// time: '2026-04-16T20:00',
// price: 100
// }

// QUINDI LO SCHEMA DELL'OGGETTO È:
// name -> string
// description -> string
// time -> string
// price -> string/number

const concertsURL = 'https://striveschool-api.herokuapp.com/api/agenda'
// ------ PARTE FINALE DELLA LEZIONE -----------

// la pagina di backoffice adesso servirà un DUPLICE scopo:
// a) se aperta dalla navbar, come prima potrà CREARE nuovi concerti
// b) se invece viene raggiunta da un tasto "✏️MODIFICA EVENTO", deve recuperare dalla barra degli indirizzi
// l'ID del concerto da modificare, fare una GET "specifica" per recuperarne i dettagli e RIPOPOLARE il FORM

const allTheParameters = new URLSearchParams(location.search)
const concertID = allTheParameters.get('id')

// se sono in modalità CREAZIONE, questo id sarà null
// se invece ho cliccato su modifica evento, l'id sarà una stringa

if (concertID) {
  // se questo parametro URL c'è, ora devo fare una fetch e RIPOPOLARE il FORM!
  fetch(concertsURL + '/' + concertID)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero dettagli concerto')
      }
    })
    .then((details) => {
      // ho recuperato i dettagli del concerto! ripopolo il form:
      const nameInput = document.getElementById('name')
      const descriptionInput = document.getElementById('description')
      const priceInput = document.getElementById('price')
      const timeInput = document.getElementById('time')

      // ripopolo
      nameInput.value = details.name
      descriptionInput.value = details.description
      timeInput.value = details.time.slice(0, -5) // tolgo gli ultimi 5 caratteri dal dato
      priceInput.value = details.price
    })
    .catch((err) => {
      console.log('ERRORE NEL RIPOPOLAMENTO DEL FORM', err)
    })
}

// ------ PARTE FINALE DELLA LEZIONE -----------

class Concert {
  constructor(_name, _description, _time, _price) {
    this.name = _name
    this.description = _description
    this.time = _time
    this.price = _price
  }
}

// recuperare il form
const form = document.getElementById('concert-form')
form.addEventListener('submit', function (e) {
  e.preventDefault()
  // prendo i riferimenti ai 4 input
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const timeInput = document.getElementById('time')
  const priceInput = document.getElementById('price')
  // ora, grazie ai 4 input, recupero i VALORI di questi input (sono sempre stringhe!)
  const name = nameInput.value // 'Pupo'
  const description = descriptionInput.value // 'Imperdibile'
  const time = timeInput.value // '2026-04-16T20:00'
  const price = priceInput.value // '99'
  console.log(name, description, time, price)
  // creo l'oggetto Concert che sarà poi pronto per essere spedito alle API
  const nuovoConcerto = new Concert(name, description, time, price)
  console.log('CONCERTO RECUPERATO DAL FORM', nuovoConcerto)
  // il concerto è a posto, ora è tempo di fare una HTTP REQUEST per contattare l'API e salvarlo
  // in maniera persistente!

  // l'indirizzo della fetch cambia tra POST e PUT! la PUT vuole l'ID nell'indirizzo...
  let urlToUse
  if (concertID) {
    // MODALITÀ MODIFICA, PUT vuole indirizzo SPECIFICO
    urlToUse = concertsURL + '/' + concertID
  } else {
    // MODALITÀ CREAZIONE, POST vuole indirizzo GENERICO
    urlToUse = concertsURL
  }

  fetch(urlToUse, {
    method: concertID ? 'PUT' : 'POST',
    // ogni volta che usate POST o PUT, dovete VOI mandare un JSON alle API! quindi serve un BODY
    body: JSON.stringify(nuovoConcerto), // dobbiamo INVIARE IL CONCERTO IN JSON
    headers: {
      'Content-Type': 'application/json', // informare l'API che il contenuto di questa fetch è un JSON
    },
  })
    .then((response) => {
      if (response.ok) {
        // se finiamo nell'if, ok è true e il concerto è stato salvato correttamente!
        // quindi io qua sì, potrei continuare a estrarre response.json() ma potrei anche solamente
        // accontentarmi del fatto che la response è ok
        alert('CONCERTO SALVATO!')
        form.reset()
      } else {
        // la response NON è ok, il concerto non è stato accettato dal server
        throw new Error('Il server ha rifiutato il concerto')
      }
    })
    .catch((err) => {
      console.log('SALVATAGGIO CONCERTO FALLITO', err)
    })
})

// nelle API che seguono i principi RESTful l'endpoint su cui fate l'operazione di GET è anche lo stesso
// su cui fate le operazioni di POST

const footerYear = function () {
  const span = document.getElementById('year')
  span.innerText = new Date().getFullYear()
}

footerYear()