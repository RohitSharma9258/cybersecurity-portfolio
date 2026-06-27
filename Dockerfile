# --- BUILD STAGE ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy default nginx configuration to support React Router HTML5 History API
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
