# Last Time Logged App

This project includes two views:

- The login view: it has two inputs and a buttom. When you enter the correct user and password you can access to the logout view.
- The logout view: it displays the time that has been passed since the user last logout.

The users are:

Users  | Passwords | Last Access
------------- | ------------- | -------------
user@mail.com  | User1 | 2020-12-12T20:24:01.541Z"
user2@mail.com | User2 | 2020-09-12T18:20:01.541Z
user3@mail.com | User3 | 2019-10-12T08:32:01.541Z

## Setup

Install dependencies:

```
npm i
```

## Testing

This sample uses Karma, Chai, Mocha, and Sinon for testing.

```
npm run test
```

## Dev Server

This sample uses open-wc's [es-dev-server](https://github.com/open-wc/open-wc/tree/master/packages/es-dev-server) for previewing the project without additional build steps. ES dev server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers.

To run the dev server and open the project in a new browser tab:

```
npm run serve
```

## Notes

1) I tried to set a fake server using json-server to simulate a back, but I couldn't so I decided to set the data in the app init using the localSession.
2) Convert the new Date() toISOString return the date with 1 hour less (at least in Spain), so I create a function to solve this problem.
