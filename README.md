# Backend for Wolt's Summer2020 Internships Engineering Pre-assignment

[Assignment](https://github.com/woltapp/summer2020) was **very fun**!

## My solution
* Endpoint accepts only POST-requests
* Case insensitive search
* Query must be legal and present, otherwise only some ***message*** is returned
* Server prettifies returned json data
* No external dependencies - **No technical debt**
* Minimizing magic numbers - **Easier to Read**
* Eslint with airbnb-base - Like
Wolt [seem's](https://github.com/woltapp/redux-autoloader/blob/master/.eslintrc) to use

## How to run it
Server starts listening environment variable $PORT, defined in npm scripts to 3000.
So just run:

```npm start```

## How to test it
Mocha is used for testing so:

```npm i```

```npm test```

## Testing endpoint with curl
```curl -H "Content-Type: application/x-www-form-urlencoded" -X POST "http://localhost:3000/restaurants/search?q=City&lat=60.17045&lon=24.93147"```
```curl -H "Content-Type: application/x-www-form-urlencoded" -X POST "http://localhost:3000/restaurants/search?q=K%C3%A4si&lat=60.17045&lon=24.93147"```

## Links
* My [Github Profile](https://github.com/tuommii)
* My [LinkedIn](www.linkedin.com/in/miikka-tuominen-dev)
