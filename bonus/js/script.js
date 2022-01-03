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
      ]
    },
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

      // funzione per scrivere, aggiungere un messaggio e riceverne risposta
      addMessage: function () {
        let object =  this.contacts[this.counter].messages ;
        dayjs.extend(window.dayjs_plugin_customParseFormat);
        let data = dayjs().format("D/M/YYYY HH:mm:ss"); 
        if (this.messageNew.trim() != '') {
          object.push ({
            text: this.messageNew,
            date: data,
            status: "sent"
          });          
          setTimeout(() => {
            object.push({
              text: "Ok",
              date: data,
              status: "received"
            })
          }, 1000);
        }
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
