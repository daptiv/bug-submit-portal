bug-submit-portal
=================

## Getting Started

First, you will need to ensure that you have the `TP_CREDENTIALS` environment variable set.  This is just the Base64 encoded username and password.  For example, if your API account was named `fooapi` and the password was `password`, then you could run `echo -n "fooapi:password" | base64 -` and then export that from your bash profile with `export TP_CREDENTIALS={some base64 encoded string}`.

Next, run `docker-compose up -d` to setup and start the container.  It should download everything necessary to run the app.

