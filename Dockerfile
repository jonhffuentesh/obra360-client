FROM node:20.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:1.18-alpine
COPY --from=builder /app/dist/MiTiendaPlus /usr/share/nginx/html

# Crear configuración personalizada de Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80