# Project commands

## Start container (with build)

make up

## Stop container

make down

## Start backend container

make backend

## Start frontend container

make frontend

## Frontend URL

<http://localhost:80>

## Backend requests

All requests to '/api' are proxied through frontend container
<http://localhost:80/api>
