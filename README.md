# Interview Scheduler

Interview Scheduler is a single page application built with React. Testing with Jest was used throughout the development of this project. Testing with Cypress was used to validate all stages of a user's experience with the application. 

A user can view the schedule for a particular day of the week and see booked appointments and available appointment slots. The user can create an appointment by entering their name, selecting an interviewer and clicking SAVE. The user can edit their appointment as well as delete their appointment. Data is persisted by the API server using a PostgreSQL database.

## Final Product
!["Select a day and create an appointment"](https://github.com/samamoo/scheduler/blob/master/docs/scheduler-book.gif?raw=true)
!["Delete an appointment"](https://github.com/samamoo/scheduler/blob/master/docs/scheduler-delete.gif?raw=true)
!["Book an appointment"](https://github.com/samamoo/scheduler/blob/master/docs/scheduler_book.png?raw=true)
!["Delete an appointment"](https://github.com/samamoo/scheduler/blob/master/docs/scheduler_delete.png?raw=true)

## Dependencies
- @testing-library/react
- Babel
- Prop-Types
- React
- React-Dom
- React-Scripts
- React Test Renderer
- Classnames
- Axios
- Storybook
- Node SASS
- Normalize.CSS

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
