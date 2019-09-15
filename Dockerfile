FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8000
CMD ["node", "-r", "dotenv/config", "index.js"]
