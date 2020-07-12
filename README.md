# Users management app using React & GraphQL

## What it does
The app is managing a users list by providing functionalities such as creating, listing, updating and deleting users.

## How it works
From the top form add / edit users information.
From the listing table select action buttons to start editing or deleting an user.

Columns ***Name*** and ***Status*** can be used to sort the table.

Default list sorting is alphabetically, A-Z.

### Start environment
```ssh
docker-compose up -d
```

#### Login with credentials
```
admin@test.com / password
```


### Stop environment
```ssh
docker-compose down
```

### Login to nodejs container (dev only)
```ssh
docker exec -it graph-react sh 
```


