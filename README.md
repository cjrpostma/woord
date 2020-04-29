# Woord

1. [Abstract](#1-abstract)
2. [Technology](#2-technology)
3. [Installation](#3-installation)
4. [Testing](#4-testing)
5. [Deployment](#5-deployment)

![image](https://user-images.githubusercontent.com/44818815/79809375-7ea91a80-832d-11ea-8e40-13a3db0fda1b.gif)

![image2](https://user-images.githubusercontent.com/44818815/79809433-ab5d3200-832d-11ea-933a-85d8cf02004f.gif)

### 1. Abstract

Woord is an educational project developed in one week to practice React, Redux, Redux-Thunk, Router, PropTypes, Styled Components, and React Testing Library. Data is provided by the Wordnik API.

Woord is a site that can be used as a reading companion. The purpose is to log words one encounters while reading that are unknown or perhaps only vaguely understood.

Once a word is logged, the user can view a formal definition and attempt to recite their own definition from memory. Unknown words begin with a difficulty level of 10 and the goal is, through consistent practice, to reduce the difficulty of recalling the definition and to increase understanding.

There are many additional features I wish to implement, including a back end to authenticate users and allow them to persist their own data, filtering and sorting of words and definition attempts, allowing the API to display multiple definitions per word, data visualization of difficulty levels over time, and much more.

Learning goals:

- [x] Reinforce writing composable React components
- [x] Utilize Styled Components
- [x] Utilize Material UI for a slider, snackbar, and icons
- [x] Interact with an API utilizing the fetch API and Redux-Thunk middleware
- [x] Synchronize the UI with the URL dynamically using React Router to provide a multi-page user experience, including use of the history API via withRouter
- [x] Write comprehensive unit and integration tests via Jest and React Testing Library, including testing Redux connected container components
- [x] Write unit tests for Redux functions
- [x] Wireframing / UI design via Figma

### 2. Technology

- React / Router / PropTypes
- Redux / Thunk
- Jest / React Testing Library
- Styled Components
- Material UI
- Webpack

### 3. Installation

Front end:

1. Fork and/or clone this repo
2. Change into the directory
3. Install dependencies via `npm install`
4. Start webpack-dev-server via `npm run start`
5. Visit localhost:3000 in your browser

### 4. Testing

- Install the application as outlined above
- Run `npm run test` to run the Jest testing suite

### 5. Deployment

- https://woord.herokuapp.com/
