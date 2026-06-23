const paletteContainer = document.getElementById('palette-container');
const generateBtn = document.getElementById('generate-btn');
const appContainer = document.querySelector('.app-container');

// Cantidad de colores que queremos en nuestra paleta
const COLORS_COUNT = 4;

// Función para generar un color hexadecimal aleatorio
function generateRandomColor() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función principal para crear y renderizar la paleta
function generatePalette() {
    paletteContainer.innerHTML = ''; // Limpiamos la paleta anterior
    const colors = [];

    for (let i = 0; i < COLORS_COUNT; i++) {
        const randomColor = generateRandomColor();
        colors.push(randomColor);

        // Creamos la estructura de la muestra de color dinámicamente
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch');
        
        swatch.innerHTML = `
            <div class="color-box" style="background-color: ${randomColor}"></div>
            <span class="color-label">${randomColor}</span>
        `;

        // Evento para copiar el color al hacer clic en la muestra
        swatch.addEventListener('click', () => copyToClipboard(randomColor, swatch));

        paletteContainer.appendChild(swatch);
    }

    // El toque Pro: Cambiar el fondo de la app usando un degradado de los dos primeros colores
    appContainer.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
}

// Función para copiar el código de color al portapapeles
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const label = element.querySelector('.color-label');
        const originalText = label.innerText;
        
        // Microinteracción de feedback visual
        label.innerText = '¡Copiado!';
        label.style.color = '#00b074'; // Cambia temporalmente a verde claro funcional
        
        setTimeout(() => {
            label.innerText = originalText;
            label.style.color = '';
        }, 1000);
    }).catch(err => {
        console.error('Error al copiar el color: ', err);
    });
}

// Eventos para gatillar la generación de la paleta
generateBtn.addEventListener('click', generatePalette);

// Detectar la barra espaciadora para generar paletas de forma rápida
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Evita el scroll por defecto de la barra espaciadora
        generatePalette();
    }
});

// Generar una paleta inicial al cargar la página por primera vez
generatePalette();