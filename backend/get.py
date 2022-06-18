import json

f = open('portfolio.json')
data = json.load(f)
f.close()

def get(event, context):

  return {
    "statusCode": 200,
    "body": json.dumps(data),
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    }
  }
