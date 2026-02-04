// generate-basic-data.js
import fs from 'fs';

async function generateBasicData() {
  const basicData = [];

  for (let i = 1; i <= 905; i++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await res.json();

      basicData.push({
        id: data.id,
        name: data.name,
        types: data.types
          .sort((a, b) => a.slot - b.slot) // ✅ Orden correcto
          .map((t) => t.type.name), // ✅ Solo nombres
        image: `/pokemon-images/${i}.png`,
      });

      console.log(`✓ ${i}/905 - ${data.name}`);
    } catch (error) {
      console.error(`✗ Error con Pokémon ${i}:`, error.message);
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  fs.writeFileSync(
    './public/pokemon-basic.json',
    JSON.stringify(basicData, null, 2),
  );

  const fileSize = (
    fs.statSync('./public/pokemon-basic.json').size / 1024
  ).toFixed(2);
  console.log(`\n✓ Archivo generado: ${fileSize} KB`);
  console.log(`✓ Total Pokémon: ${basicData.length}`);
}

generateBasicData();
