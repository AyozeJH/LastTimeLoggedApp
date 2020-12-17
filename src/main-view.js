import {LitElement, html, css} from 'lit-element';
import './views/logout/logout';
import './views/logging/logging';

export class MainView extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      loggedIn: { type: Boolean },
      lastLogged: { type: String, reflect: true },
      seconds: { type: Number },
      minutes: { type: Number },
      hours: { type: Number },
      days: { type: Number },
    };
  }

  constructor(){
    super();
    if (!localStorage.users) {
      localStorage.users = JSON.stringify({
        "usersList": [
          {
              "email": "user@mail.com",
              "password": "User1",
              "lastAccess": "2020-12-12T20:24:01.541Z"
          },
          {
              "email": "user2@mail.com",
              "password": "User2",
              "lastAccess": "2020-09-12T18:20:01.541Z"
          },
          {
              "email": "user3@mail.com",
              "password": "User3",
              "lastAccess": "2019-10-12T08:32:01.541Z"
          },
        ]
    });
    }
    this.loggedIn = false;
  }

  render() {
    return html`
      ${this.loggedIn == true ? 
        html`<log-out .days=${this.days} .hours=${this.hours} .minutes=${this.minutes} .seconds=${this.seconds} .correctTimeZone=${this.correctTimeZone.bind(this)} .logged=${this.logged.bind(this)}></log-out>` : 
        html`<log-in .lastTimeLogged=${this.lastTimeLogged.bind(this)} .logged=${this.logged.bind(this)}></log-in>` }
    `;
  }

  logged(param) {
    this.loggedIn = param;
  }

  lastTimeLogged(param) {
    this.lastLogged = param;
    this.calculateTime();
  }

  calculateTime() {
    let logInTime = this.correctTimeZone(new Date());
    let logoutTime = new Date(this.lastLogged);
    let loggedInLength = logInTime.getTime() - logoutTime.getTime();
    this.days = (Math.floor(loggedInLength/(1000*60*60*24)));
    this.hours = Math.floor(loggedInLength/(1000*60*60)) - (this.days*24);
    this.minutes = Math.floor(loggedInLength/(1000*60)) - (this.days*24*60) - (this.hours*60);
    this.seconds = Math.floor(loggedInLength/(1000)) - (this.days*24*60*60) - (this.hours*60*60) - (this.minutes*60);
    this.reformatValues();
  }

  correctTimeZone(date) {
    let correctTimeZone = date.getTime() - date.getTimezoneOffset()*60*1000;
    let actualDate = new Date(correctTimeZone);
    return actualDate;
  }

  reformatValues() {
    this.days.toString().length < 2 ? this.days = "0" + this.days : this.days;
    this.hours.toString().length < 2 ? this.hours = "0" + this.hours : this.hours;
    this.minutes.toString().length < 2 ? this.minutes = "0" + this.minutes : this.minutes;
    this.seconds.toString().length < 2 ? this.seconds = "0" + this.seconds : this.seconds;
  }

}

window.customElements.define('main-view', MainView);
