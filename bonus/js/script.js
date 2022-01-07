// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v -for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite(es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

// BONUS
// evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
// A) cambiare icona in basso a destra(a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano.Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
// predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
// sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto

const app = new Vue(
  {
    el: '#app',
    data: {
      counter: 0,
      messageNew: '',
      ricercaChat: '',
      menu: {
        index: false,
        show: false
      },
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          lastAccess: null,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              text: "Tutto fatto!",
              status: "received",
            }
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          lastAccess: null,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              text: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              text: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              text: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            }
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          lastAccess: null,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              text: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              text: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              text: "Ah scusa!",
              status: "received",
            }
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          visible: true,
          lastAccess: null,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              text: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              text: "Si, ma preferirei andare al cinema",
              status: "received",
            }
          ]
        }        
      ],
      answers: [
            'Secondo me si',
            'Sarà sicuramente così',
            'Non ne sono certo',
            'Potrebbe essere',
            'Perché no?',
            'Non posso',
            'Sto lavorando',
            'Non saprei...',
            'Si!',
            'Forse domani...',
            'Non è detto',
            'Speriamo bene!',
            'Confermo!',
            'Si potrebbe fare!',
            'Ci vediamo domani allora!'
          ]
        },
        
    // created per ultimo accesso di default
    created() {
      this.ultimoAccesso();
    },
    // /created per ultimo accesso di default

    methods: {
      // funzione per selezionare chat
      add: function (index) {
        this.counter = index;
      },
      // /funzione per selezionare chat

      // funzione data messaggio
      getDate: function (index) {
        //recupero la data dell'ultimo messaggio
        let lastMessage = this.contacts[index].messages.length - 1;
        let messageDate = this.contacts[index].messages[lastMessage].date;
        return messageDate;
      },
      // /fuznione data messaggio

      // funzione testo messaggio
      getMessage: function (index) {
        //recupero il testo dell'ultimo messaggio
        let lastMessage = this.contacts[index].messages.length - 1;
        let messageText = this.contacts[index].messages[lastMessage].text;
        //visualizzo in pagina i puntini se il messaggio è lungo
        if (messageText.length > 20) {
          messageText = messageText + ' ...';
        }
        return messageText;
      },
      // /funzione testo messaggio

      // funzione per risposte random
      risposteRandom: function () {
        let rand = Math.floor(Math.random() * this.answers.length);
        let randValue = this.answers[rand];
        return randValue;
      },
      // /funzione per risposte random
      
      // funzione per scrivere, aggiungere un messaggio e riceverne risposta
      addMessage: function () {
        let object =  this.contacts[this.counter].messages ;
        dayjs.extend(window.dayjs_plugin_customParseFormat);
        let data = dayjs().format("DD/MM/YYYY HH:mm:ss"); 
        if (this.messageNew.trim() != '') {
          object.push ({
            text: this.messageNew,
            date: data,
            status: "sent"
          });
            // timer per cambiare lo stato da "online" a "sta scrivendo" a "ultimo accesso" nuovamente
            setTimeout (() => {
              this.contacts[this.counter].lastAccess = 'online';
              setTimeout (() => {
                this.contacts[this.counter].lastAccess = 'sta scrivendo...';
                let newData = dayjs().format("DD/MM/YYYY HH:mm:ss");
                setTimeout(() => {
                  object.push({
                    text: this.risposteRandom(),
                    date: newData,
                    status: "received",
                  });
                  this.contacts[this.counter].lastAccess = 'online';
                  setTimeout(() => {
                    //cambio ultimo accesso
                    this.contacts[this.counter].lastAccess = `Ultimo accesso: ${object[object.length - 1].date}`;
                  }, 1000);
                }, 5000);
              }, 3000);          
            }, 3000); 
            // /timer per cambiare lo stato da "online" a "sta scrivendo" a "ultimo accesso" nuovamente
        }
        this.messageNew = '';
      },
      // /funzione per scrivere, aggiungere un messaggio e riceverne risposta
      
      // funzione ricerca chat
      ricerca: function () {
        this.contacts.forEach((contact) => {
          if (contact.name.toLowerCase().includes(this.ricercaChat.toLowerCase())) {
            contact.visible = true;
          } else {
            contact.visible = false;
          }
        });
      },
      // /funzione ricerca chat

      ultimoAccesso: function () {
        this.contacts.forEach((contact) => {
          let ultimoMessaggio = contact.messages.filter((message) => {
            return message.status == "received";
          });
          let length = ultimoMessaggio.length - 1;
          contact.lastAccess = `Ultimo accesso: ${ultimoMessaggio[length].date}`;
        });
      },

      // funzione per visualizzare e interagire col pannello opzioni
      showOptions: function (index) {
        if (this.menu.index !== index && this.menu.index !== false) {
          this.menu.show = false;
          this.menu.index = false;
        }
        this.menu.show = !this.menu.show;
        this.menu.index = index;
      },
      // /funzione per visualizzare e interagire col pannello opzioni
      
      // funzione per rimuovere un messaggio
      removeMessage: function (index) {
        let object = this.contacts[this.counter].messages;
        object.splice(index, 1);
        this.menu.show = false;
        this.menu.index = false;
      }
      // /funzione per rimuovere un messaggio
    }
  }
);
