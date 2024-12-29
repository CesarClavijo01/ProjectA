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

    - ### POST /api/users/register

        - **Description**:
        
            Registers a new user.

        - **Request Body**:

            ```
            {
                firstName: "John",                          // Optional: First name of the user
                lastName: "Doe",                            // Optional: Last name of the user
                username: "johndoe123",                     // Required: Unique username for the user
                reqEmail (requested): "john@example.com",   // Required: Requested email address, must be a valid email format.
                conEmail (confirmed): "john@example.com",   // Required: Confirmed email address, must match reqEmail.
                reqPassword (requested): "Password123!",    // Required: Requested password, must meet security criteria.
                conPassword (confirmed): "Password123!"     // Required: Confirmed password, must match reqPassword.
            }
            ```

        - **Responses**:

            - `201 Created`: User successfully registered. Returns user data (e.g., `id`, `username`) and a JWT token.
            - `400 Bad Request`: One or more required fields are missing, emails do not match, or username/email is already in use, or password mismatch.
            - `500 Internal Server Error`: If there was an error while registering the user, the server will return a generic error message.


    - **POST /api/users/login**

        Login an existing user

    - **GET /api/users/search**

        Search users by username with pagination:

        - Query parameters:
          - `username` (required): Partial username to search for.
          - `limit` (optional): Number of results per page (default: 10).
          - `page` (optional): Page index for results (default: 0).

    - **GET /api/users/:userId**

        Get a single user by their user ID.

2. ### /api/account

    REQUIRES USER

    - **GET /api/account/**

        Get own account

    - **PATCH /api/account/first-name**

        Update first name

    - **PATCH /api/account/last-name**

        Update last name

    - **PATCH /api/account/username**

        Update username

    - **PATCH /api/account/email**

        Update email

    - **PATCH /api/account/password**

        Update password

3. ### /api/admin

    REQUIRES USER
    REQUIRES ADMIN PERMISSIONS

    - **POST /api/admin/add-role/:userId**

        Creates a UserRole entry, adds a role to a user.
        
    - **DELETE /api/admin/remove-role/:userId**

        Removes a UserRole entry, removes a role from a user.

    - **DELETE /api/admin/remove-user/:userId**

        Removes a user and all ascociated data from the database.
