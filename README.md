# Plit v2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server -

Change location of mongoDB to your local version of the mongoDB. (located in app.js (line 7))

Run `npm install`

Run `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `node server.js prod` to load server side. (allows API calls to be made). Navigate to `http://localhost:3000/` + `api/...` to view the JSON data that is served at that endpoint.

---

## Features -

#### Dashboard

Every user has a unique Dashboard filled with their Reqs. These Reqs are displayed through a table which has multiple features.
  - Filter by **Business Unit**
  - Sort by **Days Since Creation**
  - Sort by **Days Since Approval**
  - Sort by **Amount**
  - Search by **Req No**
  - Link to **FMIS**
  - Flag **Reqs**
  - Tabs sorted by **Action, Hold, Transmission, and Out To Bid**

#### Req Detail Page

Each REQ has a details page.
This details page has a **Notes** feature that is unique to the REQ.

This feature allows you to leave important comments about the REQ. All Admins have access to this **Notes** feature and can also leave comments. These comments are updated in real time which allows Users and Admins to chat.

#### Dashboard / Pending POs

- Displays a table of the current user's Pending POs

#### Self-Service / Bid Log

- Displays a table of Bids
- Form to add a Bid
- Link to Bid Details Page

#### Self-Service / Tickets

- Displays a table of Tickets
- Form to add a Ticket

---

## Admin Features -

- Ability to impersonate any User
- Req List that displays every User's REQs
- Comment on any User's REQ
- Ability to Edit or Delete Bids

---

## Project Structure -

### `src/app/`

Front-End code location

### `server/`

- Back-End code location
- Taken from **PLIT**
  - Added additional API endpoints

---

## Deployment -

- ENV file needs to be set up
- If the API calls are going to be made to
`http://rubikdata3.com`, then `CORS` needs to be setup.
  - Also, the additional API endpoints added in PLIT-v2 need to be added to PLIT-v1.
    - These include `TICKETS` and `WORKLIST`

---

## Contact -

This Project was built by the co-op team of Summer 2019. Reach out to ddiclemente@student.bridgew.edu if you have any questions.

---

## Resources -

- Behavior Subject
  - https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
- Refreshing Component on same URL navigation
  - https://blog.angularindepth.com/refresh-current-route-in-angular-512a19d58f6e
- Angular Material
  - https://material.angular.io
