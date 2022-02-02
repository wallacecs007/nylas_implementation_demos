import os
from os.path import join, dirname
from dotenv import load_dotenv
from nylas import APIClient

dotenv_path = join(dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')

nylas = APIClient(client_id, client_secret, '')

accounts = nylas.accounts.all()
print(accounts)

account = nylas.accounts.get(accounts[len(accounts) - 1]['id'])
print(account)

print(nylas.accounts.first())

# The following attributes are available for the account object
# account.email
# account.id
# account.sync_state
# account.billing_state
# account.trial