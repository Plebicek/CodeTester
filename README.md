### ToDo list: Error Handler Tests

- [ ] Accept only \*.zip
- [ ] Class Queue
- [ ] FIX: Socket closed unexpectedly Redis
- [ ] ADD: logging
- [ ] ADD: log file
- [ ] Docker add nonroot user
- [ ] Docker network
- [x] Docker compose dev mode

# Install

//ToDo: prod + dev setup

# Run

The right way to run CodeTester in docker.

## Run prod

//ToDo

## Run dev mode

Be in projects root folder <br/>
`docker compose -f compose-dev.yaml up -d`

# DEADLINES

29.7 12:00
total: 14 days

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
12. - [ ] Remove main
13. - [x] Child executes when everything is correct
14. - [ ] Child handle wrong settings
- [ ] remove answer when error in process occure 
- [ ] Add logger when tests starts (who and when) 

15. - [ ] Docker add Healthcheck (autorestart)

## Word

1. Describe program Architecture (main app, queue system + childprocess)
2. Describe code that process testing function (multer, queue system, childprocess)
3. Step by step installing and running the via Docker

## Prezentation

## Poster
