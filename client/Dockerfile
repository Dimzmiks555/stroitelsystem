FROM node:22-bookworm-slim
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--openssl-legacy-provider NEXT_PUBLIC_DEMO_MODE=1 NEXT_PUBLIC_HOST=/api/demo
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY . .
RUN npm run build
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["npm","run","start","--","-p","3000"]
