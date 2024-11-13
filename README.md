# Install the dependencies
npm i

# Prepare the database locally
download and install postgresql for your operating system - remember the db password you set (optionally setup a cloud postgresql db with supabase)
create a .env file at root of the project set your DATABASE_URL there, an example is in .env.example
npm run generate
npm run migrate

# Run the app in development mode
npm run dev

View the application at localhost:3000

# View the changes you make to the database in drizzle studio
npm run studio