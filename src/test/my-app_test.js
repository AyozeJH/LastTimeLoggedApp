import { MainView } from '../main-view.js';
import { LogIn } from '../views/logging/logging.js';
import { LogOut } from '../views/logout/logout.js';
import { fixture, html } from '@open-wc/testing';
import '../../node_modules/sinon/pkg/sinon';
import { LogInLiterals } from '../literals/logInLiterals.js';

const expect = chai.expect;

const global = window;
global.localStorage.users =
  JSON.stringify({
    "usersList": [
      {
          "email": "user",
          "password": "user",
          "lastAccess": "2020-12-12T20:24:01.541Z"
      },
    ]
});

suite('main-view', () => {
  const mainView = new MainView;
  const logIn = new LogIn;

  test('is defined', () => {
    const el = document.createElement('main-view');
    expect(el).instanceOf(MainView);
  });

  test('renders the default view', async () => {
    const el = await fixture(html`<main-view></main-view>`);
    expect(el).shadowDom.equal(`<log-in></log-in>`);
  });

  test('loggedIn is false by default', async () => {
    expect(mainView.loggedIn).equal(false);
  });

});

suite('log-in', () => {
  const logIn = new LogIn;
  const mainView = new MainView;

  test('is defined', () => {
    const el = document.createElement('log-in');
    expect(el).instanceOf(LogIn);
  });

  test('renders', async () => {
    const el = await fixture(html`<log-in></log-in>`);
    expect(el).shadowDom.equal(
      `
        <div>
          <img src="./assets/lock-icon.png">
          <form id="sampleForm">
            <input id="userName" type="email" placeholder="Email"  required class="textSize">
            <input id="userPassword" type="password" placeholder="Password" required class="textSize">
            <button class="textSize">Log in</button>
          </form>
        </div>
      `
    );
  });

  test('Alert when incorrect user', async () => {
    logIn.userName = "wrongUser";
    logIn.userPassword = "wrongUser";
    let spiedFunction = sinon.spy(window, 'alert')
    logIn.logIn();
    expect(spiedFunction).to.have.been.called;
  });

});

suite('log-out', () => {
  const logOut = new LogOut;
  const mainView = new MainView;
  test('is defined', () => {
    const el = document.createElement('log-out');
    expect(el).instanceOf(LogOut);
  });

  test('renders', async () => {
    const el = await fixture(html`<log-out></log-out>`);
    expect(el).shadowDom.equal(
      `
        <div class="container">
          <div>
            <h1>Welcome!</h1>
            <p class="textSize">The last time you accesed was:</p>
          </div>
          <div>
            <span>
              <input id="days" name="days" value="undefined" readonly>
              <label for="id">days</label>
            </span>
            <span>
              <input id="hours" name="hours" value="undefined" readonly>
              <label for="hours">hours</label>
            </span>
            <span>
              <input id="minutes" name="minutes" value="undefined" readonly>
              <label for="minutes">minutes</label> </span>
            <span>
              <input id="seconds" name="seconds" value="undefined" readonly>
              <label for="seconds">seconds</label> </span>
          </div>
          <button class="textSize">LOGOUT</button>
        </div>
      `
    );
  });

});