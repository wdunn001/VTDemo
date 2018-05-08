FROM socialengine/nginx-spa:latest
COPY dist /app
EXPOSE 80