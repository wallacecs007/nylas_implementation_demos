import os
from os.path import join, dirname
from dotenv import load_dotenv
from nylas import APIClient

dotenv_path = join(dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

access_token = os.environ.get("ACCESS_TOKEN")

nylas = APIClient('', '', access_token)

account = nylas.account
print(account)

# The following attributes are available for the account object
# account.id
# account.account_id
# account.object
# account.name
# account.email_address
# account.provider
# account.organization_unit
# account.sync_state
# account.linked_at