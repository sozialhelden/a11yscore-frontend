FROM node:22.18.0-alpine AS base
WORKDIR /app

RUN apk add --no-cache curl

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

FROM base AS install

# install all dependencies into tmp directory this will cache them and speed up future builds
RUN mkdir -p /tmp/dev/
COPY package.json package-lock.json /tmp/dev/
RUN cd /tmp/dev/ && npm ci

# install prod dependencies into different directory
RUN mkdir -p /tmp/prod/
COPY package.json package-lock.json /tmp/prod/
RUN cd /tmp/prod && npm ci --omit=dev --ignore-scripts

FROM base AS build

# get all dev dependencies as well as the source and build the app
ENV NODE_ENV=production
COPY --from=install /tmp/dev/node_modules node_modules
COPY . .
RUN npm run build

# copy production dependencies and source code into final image
FROM base AS release

COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=build /app/build build
COPY --from=build /app/package.json .

# run the app
EXPOSE 3000/tcp
CMD ["npm", "run", "start"]

# check if the app is healthy
HEALTHCHECK --interval=10s --timeout=3s --retries=1 --start-period=10s \
    CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
