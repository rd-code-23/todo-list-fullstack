# todo-list-fullstack

## Quick Start

1. Fill out envrionment variables

    &ensp;Go into client and fill out .env file:
    &ensp;``` cd client ```

    &ensp;Go into server/config and fill out dev.env file:
    &ensp;``` cd server/config ```
    
2. Start Application

     ### &ensp; With Docker:
    #####  &ensp;&ensp;&ensp;Start Application:
     &ensp;&ensp;&ensp;```docker-compose up ```
    #####  &ensp;&ensp;&ensp;See output for services in seperate terminal
     &ensp;&ensp;&ensp;```docker-compose logs -f client```
    
     &ensp;&ensp;&ensp;```docker-compose logs -f server```
    
    ### &ensp; Without Docker:

    ####  &ensp;&ensp;&ensp;Client:

     &ensp;&emsp; 1. Go into client directory 

     &ensp;&emsp;``` cd client ```

     &ensp;&emsp;2. To start client:

     &ensp;&emsp;```npm i && npm start``` 

    ####  &ensp;&emsp; Server:
     &ensp;&emsp;1. Go into server directory 
     
     &ensp;&emsp;``` cd server ```

     &ensp;&emsp;2. To start server:

     &ensp;&emsp;```npm i && npm run dev``` 

