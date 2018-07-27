FROM node:8

COPY . /opt/drone-network/dashboard

WORKDIR /opt/drone-network/dashboard

RUN ["npm", "run", "build"]

CMD ["bash", "run-prod.sh"]
