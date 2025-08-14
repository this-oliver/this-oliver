#!/usr/bin/env node
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const process = require("node:process");

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_TOKEN = process.env.MONGO_TOKEN;

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

const TEMPORARY_DIR = path.resolve(__dirname, ".mongodb");
if (!fs.existsSync(TEMPORARY_DIR)) {
  fs.mkdirSync(TEMPORARY_DIR);
}

const MONGODB_COLLECTIONS = ["notes", "experiences"];

function createSlug(string) {
  return string.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function checkCommand(command) {
  try {
    execSync(`which ${command}`);
  } catch {
    console.error(`${command} is not installed. Please install it to run this script.`);
    process.exit(1);
  }
}

function uploadToStrapi(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${STRAPI_TOKEN}`
    }
  };

  const req = http.request(url, options, (res) => {
    res.on("data", (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  });

  req.on("error", (error) => {
    console.error(`Error uploading to Strapi: ${error.message}`);
  });

  req.write(JSON.stringify({ data }));
  req.end();
}

function processCollection(collection) {
  console.log(`Fetching collection: ${collection}`);
  const outputFile = path.join(TEMPORARY_DIR, `${collection}.json`);

  try {
    execSync(`mongoexport --uri="${MONGO_URL}/${MONGO_DB}" --username="${MONGO_USERNAME}" --password="${MONGO_TOKEN}" --out="${outputFile}" --collection="${collection}" --jsonArray`);
  } catch (error) {
    console.error(`Error exporting collection ${collection}: ${error.message}`);
    return;
  }

  if (!fs.existsSync(outputFile)) {
    console.error(`File ${outputFile} does not exist. Skipping collection ${collection}.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(outputFile, "utf-8"));

  if (collection === "notes") {
    const tags = [...new Set(data.flatMap(note => note.tags))];
    tags.forEach((tag) => {
      uploadToStrapi("tags", { label: tag });
      console.log(`Uploaded tag: ${tag}`);
    });

    data.forEach((note) => {
      const { title, content, slug, createdAt } = note;
      const date = createdAt.$date.split("T")[0];
      uploadToStrapi("notes", {
        title,
        content,
        slug,
        date
      });
      console.log(`Uploaded note: ${title}`);
    });
  }

  if (collection === "experiences") {
    data.forEach((experience) => {
      const { title, org, startYear, endYear, description, type, link } = experience;
      const slug = createSlug(title);
      uploadToStrapi("experiences", {
        title,
        slug,
        org: type === "project" ? "personal" : org,
        startDate: `${startYear}-01-01`,
        endDate: endYear ? `${endYear}-01-01` : null,
        description,
        type,
        link
      });
      console.log(`Uploaded experience "${title}"`);
    });
  }
}

// Check required commands
["mongosh", "curl", "jq"].forEach(checkCommand);

// Process collections
MONGODB_COLLECTIONS.forEach(processCollection);

// Cleanup temporary directory
if (fs.existsSync(TEMPORARY_DIR)) {
  fs.readdirSync(TEMPORARY_DIR).forEach((file) => {
    fs.unlinkSync(path.join(TEMPORARY_DIR, file));
  });
  fs.rmdirSync(TEMPORARY_DIR);
  console.log(`Temporary directory ${TEMPORARY_DIR} cleaned up.`);
} else {
  console.log(`Temporary directory ${TEMPORARY_DIR} does not exist.`);
}
