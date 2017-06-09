FROM pre-thinksys-portal-api

WORKDIR /app

ADD . /app

EXPOSE 3000

CMD ["pm2-docker", "--watch" ,  "./app/server.js"]