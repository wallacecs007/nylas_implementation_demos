const Nylas = require('nylas');
const { Scope, NativeAuthenticationProvider } = require('nylas/lib/models/connect');
require('dotenv').config()


Nylas.config({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const options = {
  redirectURI: 'http://localhost:3000',
  loginHint: '',
  scopes: [Scope.EmailReadOnly, Scope.EmailSend, Scope.ContactsReadOnly],
  provider: NativeAuthenticationProvider.Imap
};

// Redirect your user to the auth_url
const authUrl = Nylas.urlForAuthentication(options);

console.log(authUrl);