# Ahoy_chatroom

## endpoint :

list of available endpoint:
- `post /register`
- `post /login`
- `get /category`
- `post /upload`

&nbsp;

## 1.post /register

request:

- body:

```json
{
    "username": "User1@mail.com",
    "password": "User123"
}
```

_Response (201 - Created)_

```json
{
  "newVerifiedUser":"User1@mail.com"
}
```


_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Please insert your username, email or password"
}
```

_Response (401 - Unauthorized)_

```json
{
  "massage":"Please login first "
}
```

&nbsp;

## 2. Post /login

request:

- body:

```json
{
    "username": "User1@mail.com",
    "password": "User123"
}
```
_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Username/password"
}
```

&nbsp;

## 3. get /category

request :


_Response (200 - success read category)_

```json
{
  "id": 1,
  "name": "anime"
},
{
  "id": 2,
  "name": "game"
},
{
  "id": 3,
  "name": "film"
}
```

&nbsp;

## 4. post /upload

request :


_Response (201 - success upload image)_

```json
{
   "message": "successfully add image"
},
```

&nbsp;

error :

_Response (500 - internal server error)_
 ```json
{
   "message": "Internal Server Error"
},
```

_Response (403 - forbidden)_
 ```json
{
   "message": "Access denied"
},
```

_Response (404 - notfound)_
 ```json
{
   "message": "Not Found"
},
```


