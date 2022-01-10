# Semanticbits Interview API

## Installation

Prerequisite - nodejs must be installed (LTS) https://nodejs.org/en/download/

Open terminal and run:

`npm install`

### Running the API

Before starting the api, please add a `.env` file at the root of this project with the contents sent to you in the setup instructions from HR. To create a .env file do the following:
Mac OS - Open Terminal, navigate to the root of the project, type 'touch .env' into Terminal and then press the Enter key. In order to verify that the .env file has been created you will have to view hidden files. To view hidden files on a Mac, navigate to the root of the project and press 'Command + Shift + .' and you should see your .env file there.
Windows OS - Open Notepad or Notepad++, add the information to the .env file as sent to you in your preparation email, click File -> Save As, select All Files, name the file '.env' and save the .env file to the root of the project folder.

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

### Cleanup

`npm run cleanup`

## Manual Testing Challenge

Based on this sample feature, please read the requirements and build out a manual test plan. Please have your test plan prepared prior to the interview. The team will ask that your share your screen and showcase the plan.

Requirements:

- Zip files can be uploaded for each Provider Type (LTCH, IRF, HHA, MDS)
- Zip files can contain as many xml assessments less than or equal to 5mb.
- Zip file format is the only format accepted.
- After a file is uploaded and processed, the user should be able to review the report whether the file is accepted or rejected.

[Mockup](mockup.png)
