FROM node:alpine AS build
ARG BUILD_MODE=production
ARG VITE_BACKEND_BASE_URL
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build -- --mode $BUILD_MODE

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]