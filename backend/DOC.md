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