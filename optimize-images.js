// optimize-images.js
// Instala las dependencias: npm install sharp heic-convert --save-dev
const sharp = require('sharp');
const heicConvert = require('heic-convert');
const fs = require('fs');
const path = require('path');

const INPUT_BASE = './public/images/equipment/original';
const OUTPUT_BASE = './public/images/equipment/optimized';

// Configuración de optimización
const QUALITY = 80; // Calidad JPG/WebP (1-100)
const MAX_WIDTH = 1200; // Ancho máximo en píxeles
const MAX_HEIGHT = 900; // Alto máximo en píxeles

// Extensiones de imagen válidas (sin videos)
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

// Función para convertir HEIC a buffer JPG
async function convertHeicToJpeg(inputPath) {
  try {
    const inputBuffer = await fs.promises.readFile(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.9
    });
    return outputBuffer;
  } catch (error) {
    console.error(`Error convirtiendo HEIC: ${error.message}`);
    throw error;
  }
}

async function optimizeImage(inputPath, outputDir, fileName) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    let imageBuffer;

    console.log(`  → Procesando: ${fileName}`);

    // Si es HEIC, convertir primero
    if (ext === '.heic' || ext === '.heif') {
      console.log(`    • Convirtiendo HEIC a JPG...`);
      imageBuffer = await convertHeicToJpeg(inputPath);
    } else {
      // Para otros formatos, leer directamente
      imageBuffer = await fs.promises.readFile(inputPath);
    }

    // Obtener metadata de la imagen
    const metadata = await sharp(imageBuffer).metadata();
    console.log(`    • Dimensiones originales: ${metadata.width}x${metadata.height}`);

    // Calcular nuevas dimensiones manteniendo aspecto
    let newWidth = metadata.width;
    let newHeight = metadata.height;

    if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
      const aspectRatio = newWidth / newHeight;
      if (newWidth > newHeight) {
        newWidth = MAX_WIDTH;
        newHeight = Math.round(MAX_WIDTH / aspectRatio);
      } else {
        newHeight = MAX_HEIGHT;
        newWidth = Math.round(MAX_HEIGHT * aspectRatio);
      }
      console.log(`    • Redimensionando a: ${newWidth}x${newHeight}`);
    }

    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const baseName = path.parse(fileName).name;

    // Generar versión JPG optimizada
    await sharp(imageBuffer)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(path.join(outputDir, `${baseName}.jpg`));

    // Generar versión WebP (mejor compresión)
    await sharp(imageBuffer)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    // Generar thumbnail
    await sharp(imageBuffer)
      .resize(400, 300, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 70 })
      .toFile(path.join(outputDir, `${baseName}-thumb.jpg`));

    const originalSize = fs.statSync(inputPath).size / 1024;
    const jpgSize = fs.statSync(path.join(outputDir, `${baseName}.jpg`)).size / 1024;
    const webpSize = fs.statSync(path.join(outputDir, `${baseName}.webp`)).size / 1024;

    console.log(`    ✓ Original: ${originalSize.toFixed(0)}KB`);
    console.log(`    ✓ JPG: ${jpgSize.toFixed(0)}KB (${((1 - jpgSize/originalSize) * 100).toFixed(0)}% reducción)`);
    console.log(`    ✓ WebP: ${webpSize.toFixed(0)}KB (${((1 - webpSize/originalSize) * 100).toFixed(0)}% reducción)`);

  } catch (error) {
    console.error(`    ✗ Error: ${error.message}`);
  }
}

async function processMachineryFolder(machineryName) {
  const inputFolder = path.join(INPUT_BASE, machineryName, 'fotos');
  const outputFolder = path.join(OUTPUT_BASE, machineryName, 'fotos');

  // Verificar si existe la carpeta de fotos
  if (!fs.existsSync(inputFolder)) {
    console.log(`⚠️  No existe carpeta de fotos para: ${machineryName}`);
    return 0;
  }

  console.log(`\n📁 Procesando: ${machineryName}`);
  console.log(`   Entrada: ${inputFolder}`);
  console.log(`   Salida: ${outputFolder}`);

  const files = fs.readdirSync(inputFolder);
  
  // Filtrar solo imágenes (sin videos MP4)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log(`   ⚠️  No se encontraron imágenes`);
    return 0;
  }

  console.log(`   📸 Encontradas ${imageFiles.length} imágenes\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputFolder, file);
    await optimizeImage(inputPath, outputFolder, file);
  }

  return imageFiles.length;
}

async function processAllMachinery() {
  console.log('🚀 Iniciando optimización de imágenes de maquinaria\n');
  console.log('━'.repeat(60));

  // Verificar que existe el directorio base
  if (!fs.existsSync(INPUT_BASE)) {
    console.error(`❌ No existe el directorio: ${INPUT_BASE}`);
    console.log('\nPor favor crea la estructura:');
    console.log('public/images/maquinaria/original/<nombre_maquinaria>/fotos/');
    return;
  }

  // Obtener todas las carpetas de maquinaria
  const machineryFolders = fs.readdirSync(INPUT_BASE).filter(item => {
    const fullPath = path.join(INPUT_BASE, item);
    return fs.statSync(fullPath).isDirectory();
  });

  if (machineryFolders.length === 0) {
    console.log('❌ No se encontraron carpetas de maquinaria');
    return;
  }

  console.log(`📂 Carpetas de maquinaria encontradas: ${machineryFolders.length}`);
  console.log(`   ${machineryFolders.join(', ')}\n`);
  console.log('━'.repeat(60));

  let totalImages = 0;
  let processedMachinery = 0;

  // Procesar cada carpeta de maquinaria
  for (const machinery of machineryFolders) {
    const count = await processMachineryFolder(machinery);
    if (count > 0) {
      totalImages += count;
      processedMachinery++;
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log('✅ ¡Optimización completada!\n');
  console.log(`📊 Resumen:`);
  console.log(`   • Maquinarias procesadas: ${processedMachinery}`);
  console.log(`   • Total de imágenes optimizadas: ${totalImages}`);
  console.log(`   • Formatos generados por imagen: .jpg, .webp, -thumb.jpg`);
  console.log(`\n📁 Imágenes optimizadas en: ${OUTPUT_BASE}`);
  console.log('━'.repeat(60));
}

// Ejecutar
processAllMachinery().catch(console.error);