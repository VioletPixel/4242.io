# 4242.io

This is the code for [4242.io](https://4242.io/), the website where I keep all my [Stripe](https://stripe.com/) developer resources.

## Requirements

- [PHP](https://php.net/) 8.2+
- [Composer](https://getcomposer.org/)

## Install and run locally

1. Fetch or download the repo
2. Go into the root directory of this repo
3. Run `composer install` to install dependencies
4. Make a copy of `secrets-EXAMPLE.ini` and name it `secrets.ini`
5. Fill in the required values in `secrets.ini`
6. Perform a find and replace across the entire project for my Stripe publishable keys and replace them with your own:
  - Stripe US Account: `pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk`
  - Stripe GB Account: `pk_test_51O2zNKCHlokEYlHRvTSxtf7Xhv6hVRBfnMObfmlxgPhtT5rGvfzSPIT11kQ3KdXQn1bxZASNYZ2RKaYuYLFjeuM400bjPRpvrM`
7. Run  `php -S localhost:4242 -t public/` to start PHP's built-in web server
8. Go to https://localhost:4242 in your browser and make sure everything works as expected

## Test Integrations

To create a new test integration:

1. Duplicate the `public/test/_template` directory and it's contents
2. Rename `_template` as appropriate (see the other directories in `public/test` for inspiration)
3. Modify the files inside your new directory
4. Test it out locally

## 404's

The web server should be configured to use `public/404/` to handle not found errors.  There's already an `.htaccess` included with the following for Apache:

```
ErrorDocument 404 /404/
```

The PHP script in the `public/404/` directory will then take appropriate action, including redirecting from old URLs to new ones as needed, or will display a "not found" page.
