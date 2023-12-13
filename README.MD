# Post Scheduler

## Table of Contents

-   Description of the project
-   Technologies used
-   Getting Started
    -   Prerequisites
    -   Installation
-   Features
-   Postman Documentation
-   License
    <br>

### Description

This API service allows authenticated users make a post to their profile at the time of the request or it can be scheduled for a later time.
This eliminates the need for individuals to always have to remember to make a post as this is now simplified and made easy through the post scheduler.

### Technologies used

1. Node.js
2. Typescript
3. Mongo.DB
4. RabbitMQ
5. Redis
6. Cron jobs

### Getting Started

Follow these instruction to get the project up and running on your local machine for development and testing purposes.

#### Prerequisites

-   [Node.js](https://nodejs.org/en/) installed.
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager.

#### Installation

1. Clone the repository: <br>
   <code>git clone https://github.com/pick-cee/post-scheduler.git</code>
2. Navigate to the project directory: <br>
   `cd post-scheduler`
3. Install dependencies: <br>
   <code> npm install</code>
   <br> or <br>
   <code>yarn</code>

4. Run the development server: <br>
   <code> npm run dev</code>
   <br> or <br>
   <code>yarn start</code>
   <br>

The application will be available at `http://localhost:8080`.
<br>

### Features

-   Sign up with a unique email and password
-   Authenticated users can make post, schedule post, delete post, edit their post and view all their post.
-   All users are permitted to view the posts on the platform. It is public access.
    <br>

### Postman Documentation

coming soon!!!

### License

This project is licensed under the ISC License.
