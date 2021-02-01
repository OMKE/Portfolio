<h1 align="center">omaririskic.com - Portfolio</h1>

## How to run

### Docker 🐬
```$ docker-compose build && docker-compose up -d```  

There are four containers:
- nginx
- php
- queue
- mysql  
- angular


#### PHP
1. Navigate to `backend` folder and run ```$ cp .env.example .env```
2. Navigate back to the project root and generate APP_KEY with:   
```$ docker-compose exec php php artisan key:generate```
3. Link storage path with:  
```$ docker-compose exec php php artisan storage:link```
4. Run migrations and seed the database with:  
```$ docker-compose exec php php artisan migrate:fresh --seed```  
5. Generate JWT secret with:  
```$ docker-compose exec php php artisan jwt:secret```

Access an api on http://localhost:8088/api/v1  

Run tests with:   
```$ docker-compose exec php php artisan test --filter <testSuiteName \ methodName>```

#### Angular
Access frontend app on http://localhost:4200

##### SSR
Navigate to `frontend` folder and run with `npm run dev:ssr`.  
Access ssr frontend app on http://localhost:4201

##### SSG
Navigate to `frontend` folder and run with `npm run prerender`. Pre-rendered pages will be in the `dist` folder.  
**Note**  
SSG uses custom script - `frontend/prerender/routes.ts` to get dynamic routes for pre-rendering, in this case it fetches all the projects from the api,  
extracts all of the ids and saves them to the prerender/routes-result.txt file  
We can add as many dynamic routes as we want, we just need to add new entry to `routes` set. 'url' key stands for API URL and 'name' is the route name in our frontend app.

### Without Docker
1. Navigate to `backend` folder
2. Run ```$ cp .env.example .env```
3. Change the data in .env file accordingly (mysql connection) 
4. Generate APP_KEY with:  
```$ php artisan key:generate```
5. Generate JWT_SECRET with: 
```$ php artisan jwt:secret```
6. Migrate the database and seed with data:  
```$ php artisan migrate:fresh --seed```  
7. Make a symlink to storage path:  
```$ php artisan storage:link```
8. Start the server:  
```$ php artisan serve```
9. Navigate to `frontend` folder and run `npm i && npm start`  
10. Access frontend app on http://localhost:4200  

**Note**  
For SSR and SSG see instructions above  

**Note**  
In order to send an email when a new message is created, you need to run queue worker.  
For development run: `$ php artisan queue:work` in another terminal window  
For production, Laravel recommends
[Supervisor](https://laravel.com/docs/8.x/queues#supervisor-configuration)    
 

#### Useful bash/zsh functions and aliases: 

artisan - function - shorthand for 'docker-compose exec php php artisan' or  
when current folder doesn't have docker-compose.yml file, it will just run php artisan with provided arguments  
```$xslt
    function artisan(){
        if test -f "docker-compose.yml"; then
            docker-compose exec php php artisan "$@"
        else
            php artisan "$@"
        fi
    }
```
PHPUnit with filter  
``alias pf="clear && phpunit --filter"``
  
artisan test with filter  
``alias at="clear && artisan test --filter"``


## Documentation 📚

[omaririskic.com - API](https://documenter.getpostman.com/view/6089658/TVYQ3Ere#64651b17-3546-4d25-bc15-4136e47bc814)