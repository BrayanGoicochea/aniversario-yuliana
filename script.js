// ==========================================
// VARIABLES GLOBALES
// ==========================================
const initialScreen = document.getElementById('initial-screen');
const timelineScreen = document.getElementById('timeline-screen');
const finalScreen = document.getElementById('final-screen');
const startBtn = document.getElementById('start-btn');
const homeBtn = document.getElementById('home-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPointSpan = document.getElementById('current-point');
const totalPointsSpan = document.getElementById('total-points');

let currentPointIndex = 0;
let timelinePoints = [];
let isOnFinalScreen = false;

// ==========================================
// INICIAR TIMELINE
// ==========================================
startBtn.addEventListener('click', () => {
    initialScreen.classList.remove('active');

    setTimeout(() => {
        timelineScreen.classList.add('active');
        initializeTimeline();
    }, 500);
});

// Botón home para volver al inicio
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        timelineScreen.classList.remove('active');

        // Ocultar pantalla final si está visible
        if (finalScreen) {
            finalScreen.classList.remove('active');
        }
        isOnFinalScreen = false;

        // Colapsar todos los puntos y resetear
        document.querySelectorAll('.point-content.expanded').forEach(content => {
            content.classList.remove('expanded');
            content.classList.add('collapsed');
        });

        currentPointIndex = 0;

        setTimeout(() => {
            initialScreen.classList.add('active');
        }, 300);
    });
}

// ==========================================
// NAVEGACIÓN ESTILO PREZI
// ==========================================
function initializeTimeline() {
    timelinePoints = Array.from(document.querySelectorAll('.timeline-point'));
    totalPointsSpan.textContent = timelinePoints.length;

    // Mostrar solo el primer punto
    showPoint(0);
    updateNavigationButtons();
}

function showPoint(index) {
    // Si está en la pantalla final, ocultarla
    if (isOnFinalScreen) {
        finalScreen.classList.remove('active');
        isOnFinalScreen = false;
    }

    // Ocultar todos los puntos
    timelinePoints.forEach((point, i) => {
        point.classList.remove('active', 'exit-left', 'exit-right');

        if (i < index) {
            point.classList.add('exit-left');
        } else if (i > index) {
            point.classList.add('exit-right');
        }
    });

    // Mostrar el punto actual con animación
    requestAnimationFrame(() => {
        timelinePoints[index].classList.add('active');
    });

    currentPointIndex = index;
    currentPointSpan.textContent = index + 1;

    // Actualizar barra de progreso
    updateProgressBar();
    updateNavigationButtons();
}

function showFinalScreen() {
    // Ocultar todos los puntos
    timelinePoints.forEach(point => {
        point.classList.remove('active');
        point.classList.add('exit-left');
    });

    // Mostrar pantalla final
    if (finalScreen) {
        requestAnimationFrame(() => {
            finalScreen.classList.add('active');
        });
    }

    isOnFinalScreen = true;
    updateNavigationButtons();
}

function updateProgressBar() {
    const progressBar = document.querySelector('.timeline-line::before');
    const progress = ((currentPointIndex + 1) / timelinePoints.length) * 100;

    // Actualizar CSS custom property para la barra de progreso
    document.documentElement.style.setProperty('--timeline-progress', `${progress}%`);

    // Alternativa: actualizar directamente el elemento
    const lineElement = document.querySelector('.timeline-line');
    if (lineElement) {
        lineElement.style.setProperty('--progress-width', `${progress}%`);
    }
}

function updateNavigationButtons() {
    // Deshabilitar botón anterior si estamos en el primer punto y no en final
    prevBtn.disabled = (currentPointIndex === 0 && !isOnFinalScreen);

    // Deshabilitar botón siguiente si estamos en la pantalla final
    nextBtn.disabled = isOnFinalScreen;
}

// Event listeners para navegación
prevBtn.addEventListener('click', () => {
    if (isOnFinalScreen) {
        // Volver del final al último punto
        showPoint(timelinePoints.length - 1);
    } else if (currentPointIndex > 0) {
        showPoint(currentPointIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPointIndex < timelinePoints.length - 1) {
        showPoint(currentPointIndex + 1);
    } else if (currentPointIndex === timelinePoints.length - 1 && !isOnFinalScreen) {
        // Mostrar pantalla final después del último punto
        showFinalScreen();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (!timelineScreen.classList.contains('active')) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (isOnFinalScreen) {
            showPoint(timelinePoints.length - 1);
        } else if (currentPointIndex > 0) {
            showPoint(currentPointIndex - 1);
        }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentPointIndex < timelinePoints.length - 1) {
            showPoint(currentPointIndex + 1);
        } else if (currentPointIndex === timelinePoints.length - 1 && !isOnFinalScreen) {
            showFinalScreen();
        }
    } else if (e.key === 'Escape') {
        // ESC para volver al inicio
        homeBtn.click();
    }
});

// ==========================================
// SISTEMA DE EXPANDIR/COLAPSAR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.point-toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const point = this.closest('.timeline-point');
            const content = point.querySelector('.point-content');

            // Toggle entre collapsed y expanded
            if (content.classList.contains('collapsed')) {
                // Expandir
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                this.textContent = this.textContent.replace('Título', '✓ Título');

                // Scroll suave al contenido (optimizado con requestAnimationFrame)
                requestAnimationFrame(() => {
                    content.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                });
            } else {
                // Colapsar
                content.classList.remove('expanded');
                content.classList.add('collapsed');
                this.textContent = this.textContent.replace('✓ ', '');
            }
        });
    });

    // ==========================================
    // FUNCIONALIDAD DE VERSÍCULOS BÍBLICOS
    // ==========================================
    const verseButtons = document.querySelectorAll('.verse-btn');

    verseButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Encontrar el versículo hermano
            const bibleVerse = this.nextElementSibling;

            // Usar requestAnimationFrame para animación optimizada
            requestAnimationFrame(() => {
                // Animar desaparición del botón
                this.style.opacity = '0';
                this.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    this.style.display = 'none';

                    // Mostrar versículo con animación
                    bibleVerse.classList.remove('hidden');
                    bibleVerse.style.opacity = '0';
                    bibleVerse.style.transform = 'translateY(10px)';

                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            bibleVerse.style.opacity = '1';
                            bibleVerse.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }, 300);
            });
        });
    });

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    // Asegurar que solo la pantalla inicial esté visible
    initialScreen.classList.add('active');
    timelineScreen.classList.remove('active');

    // Asegurar que todos los contenidos estén colapsados inicialmente
    document.querySelectorAll('.point-content').forEach(content => {
        content.classList.add('collapsed');
        content.classList.remove('expanded');
    });
});

// ==========================================
// OPTIMIZACIÓN: REDUCIR CARGA DE IMÁGENES
// ==========================================
// Lazy loading para imágenes (mejora el rendimiento inicial)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observer para todas las imágenes del timeline
    document.querySelectorAll('.timeline-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// SWIPE PARA MÓVILES
// ==========================================
let touchStartX = 0;
let touchEndX = 0;

timelineScreen.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

timelineScreen.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - siguiente
        if (currentPointIndex < timelinePoints.length - 1) {
            showPoint(currentPointIndex + 1);
        }
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - anterior
        if (currentPointIndex > 0) {
            showPoint(currentPointIndex - 1);
        }
    }
}
