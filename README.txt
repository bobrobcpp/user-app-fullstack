# Using user_app
This Nodejs application demonstrates the ability for a user to register, login and logout of an account  

# Tech stack
 Next.js  
 React  
 Redux  
 Drizzle Postgresql  

# Install the dependencies
npm i  

# Prepare the database locally
Download and install postgresql for your operating system - remember the db password you set (optionally setup a cloud postgresql db with supabase)  
Create a .env file at root of the project set your DATABASE_URL there, an example is in .env.example  
npm run generate  
npm run migrate  

# Run the app in development mode
npm run dev  

# Run the app in production mode
npm run build  
npm run start  

View the application at localhost:3000  

# View the changes you make to the database in drizzle studio
npm run studio  