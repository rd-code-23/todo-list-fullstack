# todo-list-fullstack

## Quick Start

1. Fill out envrionment variables:

    Go into client and fill out .env file:
    ``` cd client ```

    Go into server/config and fill out dev.env file:
    ``` cd server/config ```
    
2. Start Application:

    ### With Docker (tested on wsl2):
    ##### Start Application:
    ```docker-compose up app ```
    ##### See output for services in seperate terminal:
    ```docker-compose logs -f app```

    ```docker-compose logs -f server```
    
    ### Without Docker:

    #### Client:

    1. Go into client directory:

    &emsp;``` cd client ```

    2. To start client:

    &emsp;```npm i && npm start``` 

    #### Server:
    &ensp;&emsp;1. Go into server directory:

    &ensp;&emsp;``` cd server ```

    &ensp;&emsp;2. To start server:

    &ensp;&emsp;```npm i && npm run dev``` 

    ## Run Unit Tests
    
    1. Fill out envrionment variables:

       Go into server/config and fill out test.env file:  ```cd server/config```

    2. Start Application:
        ### With Docker (tested on wsl2):
        ```docker-compose up test```
        ### Without Docker:
        ``` cd server ```

        ```npm run test```
