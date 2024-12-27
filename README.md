# ProjectA

SETUP (refer to package.json):
    in your terminal, run:
        ### npm install
            - installs dependencies (see (/package.json).dependencies)
        ### npm run build:dev
            - creates the database, runs all of the migrations, and seeds all the data
        ### npm run start:dev
            - utilizes nodemon to restart the server with every saved file
    
    other npm functions:
        ### npm run start
            - Starts without nodemon, for production
        ### npm run build
            - creates the database and runs all of the migrations, doesn't seed data.
        ### npm run create
            - creates the database (see /config)
        ### npm run migrate
            - runs all of the migrations (see /migrations)
        ### npm run undo_migrate
            - rids the database of all migrations
        ### npm run seed
            - seeds all of the dummy data (see /seeders)
        ### npm run undo_seed
            - rids the database of all seeded data