# lec-chatfront
Front-end of chat app based on Conversejs

## How to dev
+ Run `make front` and start to dev on src file. The page will reload after each change you made. The app will init on `src/langex/index.js build file.
+ Run `make bimage` to fully build docker image.

+ To check whether it works when integrating outside.
```bash
cd usage-sample
docker compose up 
```
Then open index.html with liveserver extension.

## Deploying
+ Run `make langex` to build langex build file used for deploy.
+ SSH to copy `./dist` folder and `./nginx` folder onto deploy environment.
+ Build docker file and run.

## Todo:
[] Remove unneccessary file from converse:
  - [] Unneccessary plugins.
  - [] Sufficient build files.