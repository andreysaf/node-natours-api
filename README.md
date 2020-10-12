# node-natours-api
Node.js, Express, MongoDB - Practice Project - Check it out on [Heroku](https://booktours-natours-app.herokuapp.com/)
![Screenshot](https://github.com/andreysaf/node-natours-api/blob/master/screen.png?raw=true "Screenshot")

This project designed to architect and build a Node.JS backend for CRUD operations for tours, users, bookings and provide server-side rendering of a website. The project concentrates mostly on the backend, so the front-end is not responsive. 

Shoutout to [Jonas](https://github.com/jonasschmedtmann) for putting together [an awesome course](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/). 

## Running locally

There are a few steps to get the application running locally:

```
npm i
```

After you would need to create config.env in the `root` directory and insert the following:

```
NODE_ENV=development
PORT=3000
USERNAME=your_mongodb_username
DATABASE=your_mongodb_database
DATABASE_PASSWORD=your_mongodb_database_password

JWT_SECRET=your-own-secret-has-to-be-super-long
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_HOST=your_mailtrap_host
EMAIL_PORT=your_mailtrap_port
EMAIL_FROM=your_mailtrap_from

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

You would need to create free accounts at [MongoDB](https://www.mongodb.com/), [Mailtrap](https://mailtrap.io/), and [Stripe](https://stripe.com/en-ca). Those keys should be available in the developer section of each website.

After you can simply run:

```
npm run start:dev
```

This will then start a local server running on port 3000. You can then open your browser and navigate to `http://127.0.0.1:3000`.
