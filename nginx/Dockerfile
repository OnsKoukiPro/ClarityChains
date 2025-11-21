FROM nginx:alpine

# Copy from the built frontend image
COPY --from=claritychains-frontend:latest /usr/share/nginx/html /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
