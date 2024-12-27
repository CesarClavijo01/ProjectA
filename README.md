# ProjectA

## Setup Instructions

1. **Install Dependencies**

    In your terminal, run the following command to install the required dependencies:

    ```bash
    npm install
    ```

    This will install all the dependencies listed in the `package.json` file.

2. **Build Development Environment**

    After installing the dependencies, run this command to create the database, run migrations, and seed the data:

    ```bash
    npm run build:dev
    ```

3. **Start Development Server**

    To start the server in development mode (with `nodemon` to automatically restart the server on file changes), run:

    ```bash
    npm run start:dev
    ```

    This will run the server with live reloading enabled during development.

---

## Other NPM Scripts

- **Start the Server in Production**

    To start the server without `nodemon` (for production), run:

    ```bash
    npm run start
    ```

- **Build the Database and Run Migrations (without seeding)**

    To create the database and run all migrations without seeding data, run:

    ```bash
    npm run build
    ```

- **Create the Database**

    If you need to manually create the database (see `/config` for configuration), use:

    ```bash
    npm run create
    ```

- **Run Migrations**

    To run all the migrations, run:

    ```bash
    npm run migrate
    ```

- **Undo Migrations**

    To remove all migrations from the database, use:

    ```bash
    npm run undo_migrate
    ```

- **Seed Dummy Data**

    To seed all of the dummy data (see `/seeders` for the data definition), use:

    ```bash
    npm run seed
    ```

## Routes

1. ### /api/users

    - **POST /api/users/register**

        Register a new user

    - **POST /api/users/login**

        Login an existing user

    - **GET /api/users/search (incomplete)**

        Search users by (username)?

    - **GET /api/users/userId (incomplete)**

        Get one user

2. ### /api/users/account

    REQUIRES USER

    - **GET /**

        Get own account

    - **PATCH /first-name**

        Update first name

    - **PATCH /last-name**

        Update last name

    - **PATCH /username**

        Update username

    - **PATCH /email**

        Update email

    - **PATCH /password**

        Update password
