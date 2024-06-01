# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main"]
