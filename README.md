Node version: v10.12.0

### General 

1. Application uses browser local storage, if there is something what blocks actions to local storage the recording part of application won't work.

### Setup environment

1. `yarn` - install packages
2. possibly required `npm rebuild node-sass`
3. Application runs on localhost:8081. Check before in your local configuration if this port free. If not perhaps you will have to run `yarn start` manually with port parameter `--port XX`.
   
   Documentation: https://webpack.js.org/configuration/dev-server/#devserver-port 


### Commands

1. `yarn start` - run development environment.
2. `yarn build` - run production environment.