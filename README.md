# Semanticbits Interview API

## Installation

Prerequisite - nodejs must be installed (LTS) https://nodejs.org/en/download/

Open terminal and run:

`npm install`

### Running the API

Before starting the api, please add a `.env` file at the root of this project with the contents sent to you in the setup instructions from HR.

`npm run start`

### Examples

Healthcheck

GET `localhost:3000/api/v1/health`

To get all of the issues

GET `/api/v1/issues`

Filters available: `status, category`

Get issues by id

GET `/api/v1/issues/{id}`

Add new issue

POST `/api/v1/issues`

Update an issue

PUT `/api/v1/issues/{id}`

Request Body example:

```
{
  "snowids": ["123","456","789"],
  "date_reported": "2021-05-21",
  "status": "Open",
  "category": "Patient Assessment",
  "description": "This is a test",
  "date_resolved": null,
  "provider_types": ["HHA", "IRF", "LTCH"]
}
```
