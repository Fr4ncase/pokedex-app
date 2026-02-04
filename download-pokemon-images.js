// download-pokemon-images.js
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://raw.githubusercontent.com/HybridShivam/pokedex-angular-app/master/src/assets/thumbnails-compressed/';
const OUTPUT_DIR = path.join(__dirname, 'public', 'pokemon-images');
const TOTAL_POKEMON = 905;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const downloadImage = (id) => {
  return new Promise((resolve, reject) => {
    const fileName = `${String(id).padStart(3, '0')}.png`;
    const url = `${BASE_URL}${fileName}`;
    const filePath = path.join(OUTPUT_DIR, `${id}.png`);

    if (fs.existsSync(filePath)) {
      console.log(`✓ ${id} ya existe`);
      resolve();
      return;
    }

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          processResponse(redirectResponse, filePath, id, resolve, reject);
        }).on('error', reject);
      } else {
        processResponse(response, filePath, id, resolve, reject);
      }
    }).on('error', (err) => {
      console.error(`✗ Error ${id}:`, err.message);
      reject(err);
    });
  });
};

function processResponse(response, filePath, id, resolve, reject) {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ Descargado: ${id}`);
      resolve();
    });
    
    fileStream.on('error', (err) => {
      console.error(`✗ Error escribiendo ${id}:`, err.message);
      reject(err);
    });
  } else {
    console.log(`✗ Error ${id}: ${response.statusCode}`);
    reject(new Error(`Error: ${response.statusCode}`));
  }
}

async function downloadAll() {
  const BATCH_SIZE = 10;
  let successCount = 0;
  let errorCount = 0;
  
  console.log(`Iniciando descarga de ${TOTAL_POKEMON} imágenes...\n`);
  
  for (let i = 1; i <= TOTAL_POKEMON; i += BATCH_SIZE) {
    const batch = [];
    for (let j = i; j < i + BATCH_SIZE && j <= TOTAL_POKEMON; j++) {
      batch.push(downloadImage(j));
    }
    
    const results = await Promise.allSettled(batch);
    
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        successCount++;
      } else {
        errorCount++;
      }
    });
    
    console.log(`Progreso: ${Math.min(i + BATCH_SIZE - 1, TOTAL_POKEMON)}/${TOTAL_POKEMON}`);
  }
  
  console.log('\n=================================');
  console.log('✓ ¡Descarga completada!');
  console.log(`Éxitos: ${successCount}`);
  console.log(`Errores: ${errorCount}`);
  console.log('=================================');
}

downloadAll();