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
