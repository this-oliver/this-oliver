# Content

This directory contains the configurations for the content management system (CMS) for this project which are based on the [`this-oliver/headless-cms`](https://github.com/this-oliver/headless-cms) repository.

The CMS is used to manage the following content:

- about
- notes
- experiences

## Getting Started

Pre-requisites:

- Docker

To get started, you will need to:

1. Authenticate with the GitHub Container Registry.
2. Setup the `.env` file

**Authentication with the GitHub Container Registry**:

You can do this by running (*you will be prompted for a password - personal access token with the `read:packages` scope*):

```bash
docker login ghcr.io -u <your-username>
```

**Setting up the `.env` file**:

1. create a `.env` file in the root of the directory
2. copy the *content variables* from the [`.env.sample`](./.env.sample) file into the `.env` file
3. modify the values as necessary

To generate random values that are hard to guess for the keys, run the following command:

```bash
openssl rand -base64 32
```

## Running the CMS

To start the CMS, simply run:

```bash
docker run --rm \
  -p 1337:1337 \
  -v ./.database:/app/.database \
  -v ./public/uploads:/app/public/uploads \
  -v ./src:/app/src \
  --env-file .env \
  ghcr.io/this-oliver/headless-cms:latest
```
