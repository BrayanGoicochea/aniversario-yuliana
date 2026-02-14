# 🚀 GUÍA DE DESPLIEGUE A GITHUB PAGES

## 📍 PASO 1: Crear el Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name:** `aniversario-yuliana` (o el nombre que prefieras)
3. **Description:** "Sitio web de nuestro primer aniversario 💕"
4. Selecciona: ✅ **Public**
5. **NO** marques "Add a README file"
6. Haz clic en: **Create repository**

---

## 💻 PASO 2: Ejecutar Comandos Git

Copia y pega estos comandos UNO POR UNO en tu terminal PowerShell:

### 1. Inicializar repositorio Git
```bash
git init
```

### 2. Configurar tu identidad (si no lo has hecho antes)
```bash
git config user.name "BrayanGoicochea"
git config user.email "tu-email@ejemplo.com"
```
*(Reemplaza con tu email de GitHub)*

### 3. Agregar todos los archivos
```bash
git add .
```

### 4. Hacer el primer commit
```bash
git commit -m "Sitio de aniversario completo con 10 momentos especiales"
```

### 5. Renombrar rama a main
```bash
git branch -M main
```

### 6. Conectar con GitHub
```bash
git remote add origin https://github.com/BrayanGoicochea/aniversario-yuliana.git
```
*⚠️ IMPORTANTE: Si usaste otro nombre de repo, cámbialo aquí*

### 7. Subir a GitHub
```bash
git push -u origin main
```

---

## ⚙️ PASO 3: Activar GitHub Pages

1. Ve a tu repositorio: https://github.com/BrayanGoicochea/aniversario-yuliana
2. Haz clic en **"Settings"** (⚙️)
3. En el menú izquierdo, haz clic en **"Pages"**
4. En **"Branch"**, selecciona: **main**
5. Deja **"/ (root)"** en la carpeta
6. Haz clic en **"Save"**

---

## 🎉 PASO 4: Obtener tu Enlace

Espera 2-3 minutos y tu sitio estará disponible en:

### 🔗 **https://brayangoicochea.github.io/aniversario-yuliana/**

*(Si usaste otro nombre de repositorio, reemplaza `aniversario-yuliana` con ese nombre)*

---

## ✅ Verificar que todo funcione

Una vez que GitHub Pages esté activo:

1. Abre el enlace en tu navegador
2. Verifica que:
   - ✅ El corazón rojo aparece en la pantalla inicial
   - ✅ Todas las 11 imágenes se cargan correctamente
   - ✅ Los botones de navegación funcionan
   - ✅ La pantalla final muestra "FELIZ ANIVERSARIO"

---

## 🔄 Si necesitas hacer cambios después

Cuando quieras actualizar el sitio:

1. Haz tus cambios en los archivos
2. Ejecuta estos comandos:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 🆘 Si tienes problemas

**Problema:** "Permission denied" al hacer push
**Solución:** Usa GitHub Desktop o configura SSH keys

**Problema:** Las imágenes no se ven
**Solución:** Asegúrate de que la carpeta IMAGENES esté en el repositorio

**Problema:** El sitio muestra 404
**Solución:** Espera 5 minutos más o verifica que el nombre del repo sea correcto

---

## 💝 ¡Listo!

Comparte el enlace con Yuliana:
**https://brayangoicochea.github.io/aniversario-yuliana/**

*¡Feliz aniversario! 🎉💕*
