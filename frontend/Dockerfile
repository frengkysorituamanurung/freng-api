# Gunakan Node.js untuk membangun frontend
FROM node:18 AS build

# Set direktori kerja dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Build frontend
RUN npm run build

# Gunakan Nginx sebagai web server untuk frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 untuk frontend
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
