import { LitElement, html, css } from 'lit-element';
import { LogInLiterals } from '../../literals/logInLiterals'

export class LogIn extends LitElement {
  static get styles() {
    return css`
      div {
        text-align: center;
      }
      img {
        width: 50%;
        margin: auto;
        display: block;
      }
      input {
        width: 75%;
        padding: 12px 20px;
        margin: 8px 0 20px;
        display: inline-block;
        border: none;
        border-bottom: 1px solid grey;
        border-radius: 4px;
        box-sizing: border-box;
      }
      button {
        background-color: darkblue;
        width: 75%;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
      }
      .textSize {
        font-size: xx-large;
      }
    `;
  }

  static get properties() {
    return {
        literals: { type: Object },
        userName: { type: String },
        userPassword: { type: String },
        data: { type: Object },
        correct: { type: Boolean}
    };
  }

  constructor(){
    super();
    this.literals = LogInLiterals;
    this.userName = '';
    this.userPassword = '';
    this.correct = false;
  }

  render() {
    return html`
      <div>
        <img src="./assets/lock-icon.png">
        <form id="sampleForm">
          <input id="userName" @change=${this.getInputValue} type="email" placeholder="${this.literals.mail}"  required class="textSize">
          <input id="userPassword" @change=${this.getInputValue} type="password" placeholder="${this.literals.psw}" required class="textSize">
          <button @click=${this.logIn} class="textSize">${this.literals.in}</button>
        </form>
      </div>
    `;
  }

  getInputValue (e) {
    if(e.srcElement.id === "userName" && e.srcElement.validity["valid"]) {
      this.userName = e.srcElement.value;
    } else if (e.srcElement.id === "userPassword") {
      this.userPassword = e.srcElement.value;
    }
  }

  logIn() {
    if(this.userName !== '' && this.userPassword !== '') {
      let users = JSON.parse(window.localStorage.users);
      let usersList = users.usersList;
      usersList.forEach(user => {
        if(this.userName === user.email && this.userPassword === user.password){
          sessionStorage.setItem('user', this.userName);
          this.lastTimeLogged(user.lastAccess);
          this.correct = true;
        }
      });
      if(this.correct) {
        this.logged(true);
      } 
      else {
        alert(this.literals.error);
      }
    }
  }

}

window.customElements.define('log-in', LogIn);
