# caracas

back: Node, front: vue on Docker. Tests are run on docker building.

**you need docker-compose, and be on a unix system**

## Setup
- add .env file in project root, then

```
make build   # builds docker image, install dependencies, lints, builds front, runs tests, runs server.
make up      # starts server
```

then connect to https://localhost:8000/

## To stop it:
```
make down
```

## Screenshot
![Alt text](/src/assets/screenshot.png?raw=true "Screenshot")