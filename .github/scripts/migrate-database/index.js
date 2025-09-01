#!/usr/bin/env node
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
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

function checkCommand(command) {
  try {
    execSync(`which ${command}`);
  } catch {
    console.error(`${command} is not installed. Please install it to run this script.`);
    process.exit(1);
  }
}

async function uploadToStrapi(endpoint, data, published = true) {
  const url = `${STRAPI_URL}/api/${endpoint}?status=${published ? "published" : "draft"}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${STRAPI_TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to upload from Strapi: ${res.statusCode} ${url} - ${data}`));
        }
      });
    });
    req.write(JSON.stringify({ data }));
    req.on("error", (error) => {
      reject(new Error(`Error fetching from Strapi: ${error.message}`));
    });
    req.end();
  });
}

async function processCollection(collection) {
  const outputFile = path.join(TEMPORARY_DIR, `${collection}.json`);

  if (!fs.existsSync(outputFile)) {
    console.warn(`Attempting to export collection ${collection}.`);

    try {
      execSync(`mongoexport --uri="${MONGO_URL}/${MONGO_DB}" --username="${MONGO_USERNAME}" --password="${MONGO_TOKEN}" --out="${outputFile}" --collection="${collection}" --jsonArray`);
    } catch (error) {
      throw new Error(`Error exporting collection ${collection}: ${error.message}`);
    }
  }

  const data = JSON.parse(fs.readFileSync(outputFile, "utf-8"));

  if (collection === "notes") {
    const tags = [...new Set(data.flatMap(note => note.tags))];
    tags.forEach(async (tag) => {
      await uploadToStrapi("tags", { label: tag });
      console.log(`Uploaded tag: ${tag}`);
    });

    data.forEach(async (note) => {
      const { title, content, slug, createdAt, publish } = note;
      const date = createdAt.$date.split("T")[0];

      const body = { title, content, slug, date };
      await uploadToStrapi("notes", body, publish);
      console.log(`Uploaded note: ${title}`);
    });
  }

  if (collection === "experiences") {
    data.forEach(async (experience) => {
      const { title, org, startYear, endYear, description, type, link } = experience;
      await uploadToStrapi("experiences", {
        title,
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
MONGODB_COLLECTIONS.forEach(async (collection) => {
  try {
    await processCollection(collection);
  } catch (error) {
    console.error(`Error processing collection ${collection}: ${error.message}`);
  }
});

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
