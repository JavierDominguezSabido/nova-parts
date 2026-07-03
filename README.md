# Nova Parts

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111)

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

## Consideraciones

- El catálogo utiliza datos simulados almacenados en `script.js`.
- El formulario valida los campos, pero no envía correos porque no existe backend.
- Los enlaces legales del footer son placeholders y deben conectarse a páginas reales antes de una publicación comercial.
- Las imágenes se sirven localmente desde `assets/`.

---

Desarrollado para **Nova Parts**.
