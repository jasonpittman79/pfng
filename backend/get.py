import json

def get(event, context):

  return {
    "statusCode": 200,
    "body": json.dumps({"foo": "bar"}),
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    }
  }
