import openai
import json
import config
import os
from datetime import datetime
import weaviate
from config import kimi5
from flask import Flask, render_template, request

application = Flask(__name__) 

client = weaviate.client.Client('https://kimi5.semi.network', auth_client_secret=kimi5)

api_key = config.openai_apikey

@application.route('/') 
def index(): 
	return render_template('index.html')

@application.route('/search') 
def search(): 
	return render_template('search.html')

@application.route('/contact') 
def contact(): 
	return render_template('contact.html')

@application.route('/resume', methods=["POST"])
def resume():
    if request.method == "POST":
        args = request.get_json()
        _id = args['val']
        query_result = client.data_object.get(uuid=_id, class_name='Web')
        resp = query_result
        print(resp)
        return {
                "data": 
                    {"message":f"you searched for {_id}", "resp": resp['properties']['content']}
                }

@application.route('/query', methods=["POST"])
def query():
    if request.method == "POST":
        args = request.get_json()
        query = args['val']
        print(query)
        where_filter = {
                "path": ["content"],
                "operator": "Equal",
                "valueText": query
                }
        query_result = client.query\
        .get("Web", ["content", "content_type"])\
        .with_where(where_filter)\
        .with_additional('id')\
        .with_limit(50)\
        .do()
        resp = query_result
        result_length = len(resp['data']['Get']['Web'])
        return {
                "data": 
                    {"message":f"you searched for {query}", "result_length": result_length, "resp": resp['data']['Get']['Web']}
                }
        
@application.route('/davinci', methods=["POST"])
def davinci():
    if request.method == "POST":
        data = request.get_json()
        prompt = data['val']
        openai.api_key = api_key
        prompt = f"{prompt} \n\n with job description, in the prompt, write a job description, or write a resume, style the response for html"
        response = openai.Completion.create(
  		model="text-davinci-003",
  		prompt=prompt,
  		temperature=0.7,
  		max_tokens=356,
  		top_p=1,
  		frequency_penalty=0,
  		presence_penalty=0
		)
        text = response['choices'][0]['text']
        content_type = "resume"
        content = text
        currrent_date = datetime.now()
        data = {
            "content_type":content_type,
            "content": content,
            "timestamp": "now"
            }
        resp =  client.data_object.create(data,"Web")
        print(resp)
        return {
             "message": {"val":text}
            }
        
        
        

if __name__ == '__main__': 
	app.run()