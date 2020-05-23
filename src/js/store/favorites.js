import locations from './locations';
import currencyUI from '../views/currency';


class Favorites {
  constructor(currency) {
    this.favoriteButtons = null;
    this.favBtns = [];
    this.deletBtns = null;
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    this.container = document.getElementById('dropdown1');
  }
  onAddToFavorites() {
    this.favoriteButtons = document.querySelectorAll('.add-favorite');
    for (let favoriteButton of this.favoriteButtons) {
      favoriteButton.addEventListener('click', this.addToFavHandler)
    }
  }
  addToFavHandler(e) {
    e.preventDefault();
    favorites.favBtns.push(e.target);
    const emptyMsg = document.querySelector('.favorites-empty-res-msg');
    if (emptyMsg) {
      emptyMsg.remove();
    }
    const idClicked = e.target.id;
    const currency = favorites.getCurrencySymbol();
    const tickets = locations.lastSearch;
    const favTicket = favorites.findFavTicket(tickets, idClicked);
    favorites.renderFavTicket(favTicket, currency);
    favorites.deletBtns = document.querySelectorAll('.delete-favorite');
    e.target.classList.add('disabled');
    e.target.innerHTML  = 'Added to favorites <i class="tiny material-icons right">favorite</i>';
    favorites.onDeletOfFavorites();
  }

  findFavTicket(tickets, idClicked) {
    const favTicket = tickets.find(ticket => ticket.id == idClicked);
    return favTicket;
  }

  renderFavTicket(ticket, currency) {
    const template = Favorites.favoriteTemplate(ticket, currency);
    favorites.container.insertAdjacentHTML('afterbegin', template);
  }

  showEmptyMsg() {
    const favTickets = document.querySelectorAll('.favorite-item');
    if (!favTickets.length) {
      const template = Favorites.emptyMsgTemplate();
      favorites.container.insertAdjacentHTML('afterbegin', template);
    }
  }

  onDeletOfFavorites() {
    if (this.deletBtns !== null) {
      for (let deletBtn of this.deletBtns) {
        deletBtn.addEventListener('click', this.deletOfFavHandler)
      }
    }
  }

  deletOfFavHandler(e) {
    e.preventDefault();
    favorites.favBtns.forEach((btn, i, arr) => {
      if(btn.id == e.target.id) {
        btn.classList.remove('disabled');
        btn.innerHTML  = 'Add to favorites <i class="tiny material-icons right">favorite_border</i>';
        favorites.favBtns.splice(i, 1);
      }
    })
    const favItem = e.target.closest('.favorite-item');
    favItem.remove();
    favorites.showEmptyMsg();
  }

  static emptyMsgTemplate() {
    return `
      <div class="favorites-empty-res-msg">Ваш список избранного пуст.</div>
    `;
  }

  static favoriteTemplate(ticket, currency){
    return `
    <div class="favorite-item  d-flex align-items-start">
      <img
        src="${ticket.airline_logo}"
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
          </div>
       </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" id=${ticket.id}
          >Delete</a
        >
      </div>
    </div>`

  }
 
}

const favorites = new Favorites(currencyUI);

export default favorites;

