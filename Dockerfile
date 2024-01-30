# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Backend setup
COPY ./blood-pressure-be /usr/src/app/blood-pressure-be
WORKDIR /usr/src/app/blood-pressure-be
RUN npm install

# Frontend setup
WORKDIR /usr/src/app
COPY ./blood-pressure-fe /usr/src/app/blood-pressure-fe
WORKDIR /usr/src/app/blood-pressure-fe
RUN npm install --dev
RUN npm run build

# Back to blood-pressure-be because blood-pressure-fe build folder has been moved there
WORKDIR /usr/src/app/blood-pressure-be

# Expose the port that the application listens on.
EXPOSE 5194

# Run the application.
CMD node index.js
