import json

def get(event, context):

  return {
    "statusCode": 200,
    "body": json.dumps({"a": "0",
                        "b": "1"}),
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    }
  }
