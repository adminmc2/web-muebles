# Venta de Muebles (Sitio estático)

Sitio simple para listar muebles de segunda mano con botón para contactar vía WhatsApp.

Pasos rápidos para usar y desplegar:

1. Clona el proyecto localmente:

```bash
git clone <tu-repo-url>.git
cd venta-muebles
```

2. Edita `script.js` y reemplaza la constante `PHONE_NUMBER` por tu número (código de país + número, sin `+` ni espacios). Ej: `34123456789`.

3. Prueba en local abriendo `index.html` en el navegador o con un servidor estático (recomendado):

```bash
# Con Python 3
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

4. Subir a GitHub:

```bash
git init
git add .
git commit -m "Inicial: sitio venta de muebles"
# crea repo en GitHub y luego:
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
git push -u origin main
```

5. Desplegar en Netlify:
- En Netlify, selecciona "New site from Git" y conecta el repositorio de GitHub.
- Netlify detectará un sitio estático; no es necesario comando de build. Public directory: `/`.

6. Opcional: personaliza estilos, añade más campos de producto o un CMS (Netlify CMS, etc.).

Si quieres, puedo:
- Crear el repo en GitHub (necesitaré permisos o instrucciones). 
- Generar un flujo de GitHub Actions o añadir Netlify config más avanzada.
