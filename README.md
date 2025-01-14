
# Bookify server Api🔖


This is a [express.js](https://expressjs.com/) project with mongodb and mongoose database.


## Run Locally

Clone the project

```bash
git clone https://github.com/rafi10hasan/bookify-server-express.js.git
```

Go to the project directory

```bash
  cd bookify-server-express.js
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon server.js
```

## Environment Variable

`DB_URL` = db_url
`FRONTEND_HOST` = frontend_host
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = stripe_key
`STRIPE_SECRET_KEY` = secret_key
`PORT` = 5000
`ACCESS_TOKEN_SECRET` = token_secret
`RESEND_API_KEY` = resend_api_key
`CLOUDFLARE_ACCESS_KEY` = cloudflare_access_key
`CLOUDFLARE_SECRET_KEY` = secret_key
`CLOUDFLARE_BUCKET_NAME` = bucket_name
`CLOUDFLARE_ACCOUNT_ID` = account_id
`CLOUDFLARE_REGION` = region
`CLOUDFLARE_BUCKET_ID` = bucket_id

Open [http://localhost:5000](http://localhost:5000) to check api endpoint.

## Authors

- [@rafi10hasan](https://www.github.com/rafi10hasan)

## Technology Used

node.js | express.js | mongodb | mongoose | multer(for image uploading) | cloudFlare(for image hosting) | jwt | resend(for email sending) | stripe(for payment)

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.

