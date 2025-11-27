FROM node:alpine3.22 AS deps
LABEL authors="Erick Martínez"

# directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package.json tsconfig.json ./
RUN npm install


FROM node:alpine3.22 AS build

# directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:alpine3.22 AS production

# directorio de trabajo
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY --from=build /app/package*.json ./

# Install packages for production
RUN npm install --omit=dev

# Copiar proyecto compilado
COPY --from=build /app/dist ./dist

CMD [ "node", "dist/main" ]