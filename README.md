drone-network-sim
===

display drones on a dashboard, simulate drones communicating their position to 
a net-ops-center via protobuf.

dependencies
===

node, docker, docker-compose

build 
===

docker-compose build

run
===

docker-compose up --scale drone-network-drone-sim=8 
