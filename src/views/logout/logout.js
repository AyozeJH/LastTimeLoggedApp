import {LitElement, html, css} from 'lit-element';
import { LogOutLiterals } from '../../literals/logOutLiterals'

export class LogOut extends LitElement {
  static get styles() {
    return css`
      div {
        text-align: center;
      }
      h1 {
        font-size: xxx-large;
      }
      label {
          border: none;
          text-align: center;
          color: darkgray;
          font-size: xx-large;
          margin: none;
      }
      input {
        border: none;
        text-align: center;
        color: darkgray;
        font-size: xxx-large;
      }
      button {
        background-color: lightblue;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
      }
      .textSize {
        font-size: xx-large;
      }
      span{
        display: inline-block;
        width: min-content;
        margin: 30px 15px 60px;
      }
      span select input { 
          display: block; 
          position: relative; 
      } 
      span input { 
        text-align: center;
        width: 100%;
        font-size: xxx-large;
        }
      span label { 
          display: block; 
          position: relative; 
          text-align: center;
      } 
    `;
  }

  static get properties() {
    return {
      literals: {type: Object},
      seconds: { type: Number },
      minutes: { type: Number },
      hours: { type: Number },
      days: { type: Number },
      userLogged: { type: String }
    };
  }

  constructor(){
    super();
    this.literals = LogOutLiterals;
    this.userLogged = window.sessionStorage.getItem('user');
  }

  render() {
    return html`
      <div class="container">
        <div>
          <h1>${this.literals.welcome}</h1>
          <p class="textSize">${this.literals.message}</p>
        </div>
        <div>
          <span>
            <input id="days" name="days" value="${this.days}" readonly>
            <label for="id">${this.literals.dd}</label>
          </span>
          <span>
            <input id="hours" name="hours" value="${this.hours}" readonly>
            <label for="hours">${this.literals.hh}</label>
          </span>
          <span>
            <input id="minutes" name="minutes" value="${this.minutes}" readonly>
            <label for="minutes">${this.literals.mm}</label> </span>
          <span>
            <input id="seconds" name="seconds" value="${this.seconds}" readonly>
            <label for="seconds">${this.literals.ss}</label> </span>
        </div>
        <button @click=${this.logOut} class="textSize">${this.literals.out}</button>
      </div>
    `;
  }

  logOut() {
    let newLogOut = this.correctTimeZone(new Date());
    let newData = JSON.parse(window.localStorage.getItem('users'));
    newData.usersList.forEach(user => {
      if(user.email === this.userLogged){
        user.lastAccess = newLogOut.toISOString();
        window.localStorage.setItem('users', JSON.stringify(newData));
      }
    });
    this.logged(false);
  }

}

window.customElements.define('log-out', LogOut);
