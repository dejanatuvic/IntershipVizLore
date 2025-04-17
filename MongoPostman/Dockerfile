FROM node:18

WORKDIR /app

#instalacija zavisnosti
COPY package*.json ./
RUN npm install

#kopiranje projekta
COPY . .

#pokretanje
CMD ["node", "index.js"]
