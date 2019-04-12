# Would You Rather

## Table of Contents

* [Intro](#intro)
* [Downloading](#downloading)
* [Running](#running)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Details](#details)

## Intro

This is a polling application.  Users can create polls and can participate in
polls.  Users receive one point for creating a poll and one point for
participating in a poll.

## Downloading

To download this application enter the following command on the command line in
the directory where you would like to install it:

git clone https://github.com/cgreenblatt/would-you-rather.git

After the above command completes, change your directory to the would-you-rather
directory and run the following command on the command line:

npm install

## Running

To run the application enter the following command on the command line in the
would-you-rather directory:

npm start

## Instructions

Sign in by selecting a user and clicking on the Sign In button.

A list of poll summaries is accessed by clicking on the Home tab.  The polls can
be filtered by clicking on either Answered or Unanswered.  Unanswered polls are
displayed by default.

To participate in a poll, click on the Home tab and click on the View Poll
button.  Click on the radio button to select an option.  Click on the Submit
button to save your answer.

To create a poll, click on the New Question tab.  Enter your options and click
on the Submit button. To view all users' scores, click on the Leader Board tab.

## Contributing

Pull requests will not be accepted.


## Details

├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── App.css # app styles
    ├── App.test.js
    ├── actions # Redux actions and thunks
    │   ├── authedUser.js
    │   ├── questions.js
    │   ├── shared.js
    │   └── users.js
    ├── components # React components
    │   ├── App.js # App
    │   ├── AuthedUser.js
    │   ├── LeaderBoard.js
    │   ├── Listbox.js
    │   ├── Navbar.js
    │   ├── NavbarItem.js
    │   ├── NewQuestion.js
    │   ├── NewQuestionTA.js
    │   ├── Poll.js
    │   ├── PollContainer.js
    │   ├── PollUnanswered.js
    │   ├── QuestionOption.js
    │   ├── QuestionSummary.js
    │   ├── Questions.js
    │   ├── SignIn.js
    │   └── UserScore.js
    ├── icons # icons for React and Redux
    │   ├── reactLogo.svg
    │   └── reduxLogo.svg
    ├── index.css
    ├── index.js
    ├── middleware # middleware
    │   ├── index.js
    │   └── logger.js
    ├── reducers # reducers
    │   ├── authedUser.js
    │   ├── index.js
    │   ├── questions.js
    │   └── users.js
    └── utils
        ├── _DATA.js
        └── api.js


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
