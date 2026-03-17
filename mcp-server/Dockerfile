FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist/ ./dist/
EXPOSE 3100
ENV PORT=3100
CMD ["node", "dist/http.js"]
