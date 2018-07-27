drone-network-sim
===

Display drones on a dashboard, simulate drones communicating their position to 
a net-ops-center via protobuf.

dependencies
===

- node
- docker
- docker-compose

build 
===

`npm i && docker-compose build`

run
===

`docker-compose up --scale drone-network-drone-sim=8`

develop
===

`npm run dev` can be run in each module to run it, or at the top level to run
all modules together. Requires a `mongodb` process to be running at `localhost:27017`
