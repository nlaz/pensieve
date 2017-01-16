# Boreas (In Progress)
A simple app to run daily flashcards in email

## Running Locally
This app built on Node(link) and MongoDB(link). Install those if you haven't already.

#### 0. Project Setup
Pull project down from GitHub. Install the Node dependencies.
```
$ git clone https://github.com/nlaz/boreas.git
$ cd boreas/
```

Setup the app's environment variables. It won't work without them. There's a lot of ways to do this. A sample config file is provided.
```
$ cp .sample.env .config.env
$ vim .config.env
```

Add your environment variables here.
```
export NODE_ENV='development'
export PORT='3000'
export MONGODB_HOST='mongodb://localhost:27017/boreas'
export SENDGRID_API_KEY='{YOUR_SENDGRID_KEY_HERE}'
```

You may need to run this file to actually export these variables into your environment or add it to your `~/.bashrc file`.
```
$ source .config.env
```

#### 1. DB Setup
This app relies on the user information in the MongoDB database to send emails. It might be helpful to add your email to the database for testing.

Connect to the MongoDB shell.
```
$ mongo
```

Use a database called `boreas`.
```
> show dbs
> use boreas
```
Insert a user item for with your test email.
```
> db.users.insert({ name: 'Jane Doe', email: '{YOUR_TEST_EMAIL}', is_email_on: true })
> db.users.find()
```

#### 2. Testing Emails
If everything above goes well, you should be able to now run the app locally.
```
$ npm start
```
You should now see an email in your inbox. Congrats!
