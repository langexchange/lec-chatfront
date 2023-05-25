# lec-chatfront
Front-end of chat app based on Conversejs

## I. How to dev
+ Run `make front` and start to dev on src file. The page will reload after each change you made. The app will init on `src/langex/index.js build file.
+ Run `make bimage` to fully build docker image.

+ To check whether it works when integrating outside.
```bash
cd usage-sample
docker compose up 
```
Then open index.html with liveserver extension.

### 1. Prerequisite
#### 1.1. Enable service discovering in XMPP server
Browser environment needs to know where is the xmpp server, to do that, you must execute this command in side `lec-chatgw` service container.
```console
/etc/nginx/script.sh
```

#### 1.2. Enable TTS at the local environment
The app try to simulate what is going on on the product environment, so it is set with local certificate to enable tts at local env.

You must accept local certificate in your browser before developing the app.

### 2. Depend on which feature to def
#### 2.1. Onboard message
To receive the chatbot msg, it is needed to produce kafka messages which inform chatbot that there is a new user visiting the app.
```console
cd mock
python producer.py
```



## Deploying
+ Run `make langex` to build langex build file used for deploy.
+ SSH to copy `./dist` folder and `./nginx` folder onto deploy environment.
+ Build docker file and run.

## Todo:
[] Remove unneccessary file from converse:
  - [] Unneccessary plugins.
  - [] Sufficient build files.