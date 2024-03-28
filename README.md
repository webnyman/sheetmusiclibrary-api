# API design assignment - Sheet music library API

This is an API with CRUD-functionality for a database of sheet music.

Documentation for the api:
https://swedishbrass.com/1dv027api/api-docs/

Starting endpoint for the api:
https://swedishbrass.com/1dv027api/api/v1

Postman collection:

Endpoint that is not in the collection:
https://swedishbrass.com/1dv027api/api/v1/webhooks/register/{id}

**id**: The ID of the user for which the webhook is being registered.
**Authorization**: Bearer Token
**Body** (json) url to webhook being registered:
{
  "url": "https://example.com/webhook"
}

