# Country Info App

This back-end application is built with NestJS, TypeScript, and PostgreSQL. It provides information about countries and allows users to add national holidays to their calendar.

---

## Environment Variables

Create a `.env` file in the root of the project with the following content:

```dotenv
PORT=3000
NODE_ENV=dev

# DATABASE
DATABASE_HOST=localhost
DATABASE_PORT=9001
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
DATABASE_NAME=country_app

# JWT
JWT_SECRET=qwrsasdjfk1bia

```

## Installation & Setup

1. **Clone the Repository:**
``` bash
git clone <repository-url> cd country-info-app
```
    
2. **Place the `.env` File:**
    
    Copy your `.env` file into the root of the project.
    
3. **Build the Project:**

``` bash
yarn run build
```
    
4. **Start Docker & Create the Database:**
	Ensure Docker is running, then execute:
``` bash
yarn run docker:create
```

5. **Run Migrations:**
``` bash
yarn run migration:run
```
6. **Start the Project in Development Mode:**
``` bash
yarn run start:dev
```


## Testing the Application

### Swagger Documentation

Open your browser and navigate to:

[http://localhost:3000/api](http://localhost:3000/api)

This interactive documentation allows you to explore and test all available endpoints.

### Testing the "Add National Holidays" Endpoint

**Endpoint:**

```ruby
POST http://localhost:3000/calendar/users/:userId/holidays
```

**Example Request Body:**
``` json
{   
	"countryCode": "US",   
	"year": 2025,   
	"holidays": ["New Year's Day", "Independence Day"] 
}
```
**Notes:**

- First, create a user (sign up) and copy its `id`.
- If you forget the user ID, you can log in and retrieve it via the `/auth/me` endpoint (using your auth token).