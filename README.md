# 🧑‍🎓 Proyecto de Visualización de Estudiantes

Este proyecto es una aplicación web sencilla que muestra tarjetas informativas de estudiantes con sus promedios de proyectos y enlaces a sus perfiles de GitHub.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## 📁 Estructura del proyecto

├── index.html # Página principal
├── styles.css # Estilos personalizados
├── script.js # Lógica para renderizar estudiantes
├── students.json # Archivo con los datos de los estudiantes
├── no-photo.png # Imagen predeterminada si no hay foto
└── README.md # Este archivo


## 📌 Características

- Visualización de estudiantes con su:
  - Nombre
  - Intensidad
  - Promedio de proyectos (escala de 1.0 a 5.0)
  - Imagen de perfil desde GitHub (si aplica)
  - Botón al perfil de GitHub
- Los estudiantes sin GitHub se muestran al final con una imagen por defecto.
- Promedios normalizados (por ejemplo, `bit-1` en escala 10 es convertido a 5).
- Diseño responsive con Bootstrap y un estilo personalizado.


## ▶️ Cómo ejecutar

1. Clona o descarga este repositorio.
2. Asegúrate de que todos los archivos estén en la misma carpeta.
3. Abre `index.html` en tu navegador.
4. ¡Listo!

## 📄 Notas adicionales

- Puedes editar `students.json` para agregar más estudiantes.
- Las imágenes se cargan dinámicamente desde GitHub usando el `usernameGithub`.

## 🧑‍💻 Autor

- Proyecto desarrollado por Nicholas Wells – 2025.
