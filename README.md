# Requirements
Have installed Docker
Have MySQL db
# Instalation 
_The right way to run The Code Tester in production mode via docker._
Is important to have docker installed. 
#### 1. Install Project
```sh
git clone https://github.com/Plebicek/CodeTester.git
```
#### 2. Set production enviroments
_Create `.env` file in `src` folder._
```env
PORT=3000 #HTTP server port
DATABASE_URL= #"mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME" 
JWT_TOKEN =  #random string at least 13 characters
COOKIE_SECRET = #random string at least 13 characters
CLIENT_ID= #Microsoft OAuth2 Client Id
CLIENT_SECRET = #Microsoft OAuth2 Client secret Id
TENANT = #Microsoft OAuth2 tenant 
REDIS_URL= "redis://redis:6379" #Using Docker compose REDIS  
NODE_ENV= "production" #Dont change
```
#### 3. Build the application 
_Be in the root of the project folder._
```sh
docker compose build 
```
#### 4. Run the application 
_Be in the root of the project folder._
```sh
docker compose up -d  
```
#### 5. check the application 
_Check if redis, app and autoheal are running._
```sh
docker compose ps
```
## Run dev mode
### Buil Dev compose file
_Complete all the steps to the third step._
Be in projects root folder
```sh
docker compose -f compose-dev.yaml build 
```
### Run Dev compose file
_Be in projects root folder. The project starts with debuger on. You need to press continue in debuger to start the server_
```sh
docker compose -f compose-dev.yaml up 
```
## CODE
1. - [x] Check if its not too late
2. - [x] Check or create new answer
3. - [x] Creates new answer
4. - [x] Displays if answer already exists
5. - [x] Save file if its .zip
6. - [x] Dont save if its not zip and send back message
7. - [x] Add to queue
8. - [x] Render responose 
9. - [x] Run java test
10. - [x] Parse results
11. - [x] Save results to the db
12. - [x] Remove main
13. - [x] Child executes when everything is correct
14. - [x] Child handle wrong settings
- [x] remove answer when error in process occure 
15. - [x] Docker add Healthcheck (autorestart)

## Word
1. Describe program Architecture (main app, queue system + childprocess)
2. Describe code that process testing function (multer, queue system, childprocess)
3. Step by step installing and running the via Docker

