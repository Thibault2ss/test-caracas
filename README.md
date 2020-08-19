# caracas

back: Node, front: vue on Docker. Tests are run on docker building.

**you need docker-compose, and be on a unix system**

## Setup
```
make build   # builds docker image, install dependencies, lints, builds front, runs tests, runs server.
make up      # starts server
```

then connect to https://localhost:8000/

## To stop it:
```
make down
```