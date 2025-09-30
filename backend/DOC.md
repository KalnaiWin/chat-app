===== Stage 1. Set up =====
1. `cd backend` -> `npm init -y` ->
    `npm i express` : A framework that allow you write API easily 
    `npm i mongoose` : MongoDB model tool that lets you defines schemas with MongoDB easily. 
    `npm i jsonwebtoken` : Library for creating & verifying JSON web token (JWT) that used for authentication. 
    `npm i bcryptjs` : Library for hasing password by using bcript algorithym 
    `npm i dotenv` : Allow you to access to .env file
    `npm i cookie-parser` : A Middleware to parse the cookies from request in express
2. - Create server file in src folder -> Change "test" in package.json ( Only listen when have change ) : 
                                                        Method 1:
                                                        `"dev": "node --watch src/server.js"`,
                                                        Method 2: ( recommend )
                                                        `npm i nodemon -D` --> `"dev": "nodemon src/server.js"` 
    - Insert `"type": "module"` in package.json: Allow using import express instead using require
    - Add `"start": "node src/server.js"` in `"script"`: Dont need hear the change when deploy ( if using `dev` -> cause waste CPU / memory)
    - Create folder controllers, routes in src folder and .env in backend folder
3. Authentication
    - Add auth.route.js and import it into server.js file 

===== Stage 2.Deploy on Sevalla =====

1. Set up __dirname to contain frontend in backend

===== Stage 3: MongoDB Setup =====

1. Set up mongoDB -> create new project -> copy password into .env file -> (go to network access to allow access from anywhere ) (optional)
2. Create a lib folder in src to contain db.js file which connect to mongoDB
2.1. Create model folder in src contain user.js file define User
3. Create controller auth signup function 
3.1. Create a generateToken function -> create jwt to send it in cookies
3.2. Test signup on Postman

===== Stage 4: Send email welcome for user =====

1. `npm install resend` -> Create api key in Resend -> copy api and paste into .env file
2. Create a email template contain raw html
3. Create resend file, env file in lib folder -> change process.env into ENV

===== Stage 5: Login and Logout =====

===== Stage 6: Auth Middleware and updateProfile =====

1. Create auth file from middleware folder - check if user authenticated
2. `npm install cloudinary`: support upload videos, images -> create file cloudinary in lib folder
3. Add cloud_name into .env file and create new API key in cloudinary and copy api_key and api_secret

