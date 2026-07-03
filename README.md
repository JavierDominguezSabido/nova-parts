# Nova Parts

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-222?logo=github)

Sitio web corporativo y catálogo frontend para **Nova Parts**, empresa especializada en restauración, reparación y venta de piezas de automóvil.

El proyecto combina una presentación visual premium con comparadores interactivos, catálogo filtrable y una experiencia responsive optimizada para escritorio, tablet y móvil.

## Características

- Diseño corporativo moderno y responsive.
- Página principal con servicios, proceso de trabajo y proyectos.
- Comparadores interactivos de antes y después.
- Catálogo independiente con 20 piezas simuladas.
- Buscador y filtros combinables por categoría, marca y precio.
- Menú móvil accesible con control del foco.
- Slider de opiniones.
- Sección de preguntas frecuentes.
- Formulario con validación frontend.
- Enlaces directos a Google Maps, correo, teléfono, WhatsApp e Instagram.
- Metadatos SEO, datos estructurados, `robots.txt` y `sitemap.xml`.
- Compatible con GitHub Pages y rutas relativas.
- Sin frameworks, dependencias ni proceso de compilación.

## Tecnologías

- **HTML5:** estructura semántica y accesible.
- **CSS3:** sistema visual, animaciones y responsive.
- **JavaScript:** navegación, filtros, comparadores, FAQ, slider y validación.

## Estructura del proyecto

```text
nova-parts/
├── assets/          # Imágenes, logos y comparativas
├── index.html       # Página principal
├── catalogo.html    # Catálogo de piezas
├── styles.css       # Estilos globales y responsive
├── script.js        # Interacciones y base de datos simulada
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .nojekyll
└── README.md
```

## Ejecutar en local

No requiere instalación. Puedes abrir `index.html` directamente en el navegador.

Para trabajar con un servidor local:

```bash
python -m http.server 8000
```

Después visita:

```text
http://localhost:8000
```

También puedes utilizar **Live Server** en Visual Studio Code.

## Publicar en GitHub Pages

### 1. Subir el proyecto

Crea un repositorio vacío en GitHub y ejecuta desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Publicar Nova Parts"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

### 2. Activar GitHub Pages

En el repositorio:

1. Abre **Settings → Pages**.
2. Selecciona **Deploy from a branch**.
3. Elige la rama `main`.
4. Elige la carpeta `/ (root)`.
5. Pulsa **Save**.

La web estará disponible en:

```text
https://TU_USUARIO.github.io/TU_REPOSITORIO/
```

Los cambios posteriores se publican con:

```bash
git add .
git commit -m "Actualizar web"
git push
```

## Configuración antes de publicar

Si no vas a utilizar el dominio `novaparts.es`, sustituye ese dominio por la URL definitiva de GitHub Pages en:

- `index.html`
- `robots.txt`
- `sitemap.xml`

Esto mantiene correctos los enlaces canónicos, Open Graph, datos estructurados y referencias del sitemap.

## Consideraciones

- El catálogo utiliza datos simulados almacenados en `script.js`.
- El formulario valida los campos, pero no envía correos porque no existe backend.
- Los enlaces legales del footer son placeholders y deben conectarse a páginas reales antes de una publicación comercial.
- Las imágenes se sirven localmente desde `assets/`.

## Contacto

- **Ubicación:** Calle Era de Don Pedro, 3, Monesterio
- **Correo:** robinsonorejuelas@novaparts.es
- **Teléfono:** +34 624 045 986
- **Instagram:** [@robinjr___](https://www.instagram.com/robinjr___)

---

Desarrollado para **Nova Parts**.
