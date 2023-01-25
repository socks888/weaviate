import weaviate
from weaviate import Client
import os
from dotenv import load_dotenv
load_dotenv()


openai_apikey = os.getenv("openai_api_key")

kimi5 = weaviate.AuthClientPassword(
  username = os.getenv("weaviate_username"), 
  password = os.getenv("weaviate_password"), 
  )

client = weaviate.client.Client('https://kimi5.semi.network', auth_client_secret=kimi5)

