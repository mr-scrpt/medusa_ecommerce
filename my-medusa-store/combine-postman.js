// combine-postman.js

require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const { globSync } = require("glob");
const chokidar = require("chokidar");
const axios = require("axios");

// --- НАСТРОЙКИ ---
const SOURCE_FILES_PATTERN = "src/**/*.pmn.json";
const BASE_FILE_PATH = "postman/base.pmn.json";
const OUTPUT_FILE_PATH = "postman/postman_collection.json";
// -----------------

// --- POSTMAN API ---
const POSTMAN_API_KEY = process.env.POSTMAN_API_KEY;
const POSTMAN_COLLECTION_ID = process.env.POSTMAN_COLLECTION_ID;
// -------------------

async function syncWithPostmanAPI(collectionData) {
  if (!POSTMAN_API_KEY || !POSTMAN_COLLECTION_ID) {
    console.warn(
      "⚠️ Postman API Key or Collection ID not found in .env file. Skipping API sync.",
    );
    return;
  }
  const API_URL = `https://api.getpostman.com/collections/${POSTMAN_COLLECTION_ID}`;
  try {
    console.log("🔄 Syncing with Postman API...");
    await axios.put(
      API_URL,
      { collection: collectionData },
      { headers: { "X-Api-Key": POSTMAN_API_KEY } },
    );
    console.log("✨ Collection synced with Postman successfully!");
  } catch (error) {
    console.error(
      "❌ Error syncing with Postman API:",
      error.response?.data || error.message,
    );
  }
}

/**
 * Основная функция для сборки коллекции.
 * @param {object} options - Опции сборки.
 * @param {boolean} options.forceSync - Если true, синхронизация с API произойдет даже без изменений.
 */
async function buildCollection(options = { forceSync: false }) {
  try {
    const baseContent = await fs.readFile(BASE_FILE_PATH, "utf-8");
    const finalCollection = JSON.parse(baseContent);

    if (!finalCollection.item) finalCollection.item = [];

    const fragmentFiles = globSync(SOURCE_FILES_PATTERN);
    console.log(
      `\n🚀 Building collection... Found ${fragmentFiles.length} fragment(s) to merge.`,
    );

    for (const file of fragmentFiles) {
      const fragmentContent = await fs.readFile(file, "utf-8");
      const fragmentJson = JSON.parse(fragmentContent);
      if (fragmentJson.item && Array.isArray(fragmentJson.item)) {
        finalCollection.item.push(...fragmentJson.item);
      }
    }

    const newCollectionContent = JSON.stringify(finalCollection, null, 2);

    let oldCollectionContent = "";
    try {
      oldCollectionContent = await fs.readFile(OUTPUT_FILE_PATH, "utf-8");
    } catch (e) {
      // Файла еще не существует, это нормально.
    }

    if (!options.forceSync && newCollectionContent === oldCollectionContent) {
      console.log("✅ Collection is up-to-date. No changes detected.");
      return;
    }

    if (options.forceSync) {
      console.log("🚀 Initial run: Forcing file write and API sync.");
    } else {
      console.log(
        "🔥 Changes detected! Proceeding to write file and sync API.",
      );
    }

    await fs.mkdir(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_FILE_PATH, newCollectionContent);

    console.log(
      `✅ Successfully built and updated collection at: ${OUTPUT_FILE_PATH}`,
    );

    await syncWithPostmanAPI(finalCollection);
  } catch (error) {
    console.error("❌ Error building Postman collection:", error);
  }
}

function watchFiles() {
  const filesToWatch = [BASE_FILE_PATH, ...globSync(SOURCE_FILES_PATTERN)];

  // --- ДОБАВЛЕННЫЙ СТАТУС ---
  console.log("\n👀 Watching for changes in the following files:");
  filesToWatch.forEach((file) => console.log(`  - ${file}`));
  console.log("----------------------------------------");
  // -------------------------

  const watcher = chokidar.watch(filesToWatch, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
  });

  watcher.on("all", (event, path) => {
    console.log(
      `\n📄 File change detected ('${event}' on ${path}). Rebuilding...`,
    );
    buildCollection();
  });

  watcher.on("ready", () => {
    console.log("✅ Initial scan complete. Ready for changes.");
  });

  watcher.on("error", (error) => {
    console.error("❌ Watcher error:", error);
  });
}

const isWatchMode = process.argv.includes("--watch");

// При первом запуске всегда вызываем сборку с принудительной синхронизацией
buildCollection({ forceSync: true }).then(() => {
  if (isWatchMode) {
    watchFiles();
  }
});
