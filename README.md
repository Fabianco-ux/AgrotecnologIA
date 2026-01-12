# AgrotecnologIA (DEMO)

Aplicación web de demostración con 4 páginas:

- Panel (Dashboard) con tarjetas y datos simulados
- Control de Cultivos con formulario moderno y resumen simulado
- Análisis y Rendimiento con gráficos (Chart.js)
- Sostenibilidad e IA con recomendaciones y generador de ideas (simulado)

## Requisitos

- Node.js 18+

## Iniciar backend (opcional, para proxy IA)

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env` (opcional):

```bash
copy .env.example .env
```

Edita el valor `DEEPSEEK_API_KEY` si quieres habilitar el proxy (sigue siendo DEMO).

3. Arrancar servidor:

```bash
npm start
```

Servidor en `http://localhost:3000`.

## Abrir la app

Abre `index.html` directamente en tu navegador. Si usas el proxy IA, mantén el servidor corriendo.

## Notas

- Los datos y resultados son simulados (DEMO, no reales).
- La integración real con la API de DeepSeek queda pendiente; este proyecto usa un proxy simulado y no envía tu clave.

## Despliegue en GitHub Pages

Este proyecto puede publicarse como sitio estático con GitHub Pages. Ya incluye un workflow en `.github/workflows/pages.yml` que publica únicamente el frontend.

Pasos:

1. Crea un repositorio en GitHub y sube el contenido del proyecto.
2. Asegúrate de que la rama sea `main`.
3. Verifica que el workflow se ejecute al hacer `push`.
4. En Settings → Pages, confirma que la fuente es "GitHub Actions". Al finalizar la acción, tu sitio estará disponible en `https://<tu-usuario>.github.io/<tu-repo>/`.

Importante:

- El backend Node no corre en GitHub Pages. La sección de IA se mantiene en modo simulado si no hay backend.
- Los secretos (`.env`) están excluidos por `.gitignore`.

## Embed para Google Sites

Una vez publicado en GitHub Pages, puedes embeber el sitio en Google Sites usando un iframe.

Snippet (reemplaza `<tu-usuario>` y `<tu-repo>`):

```html
<iframe
	src="https://<tu-usuario>.github.io/<tu-repo>/"
	width="100%"
	height="800"
	frameborder="0"
	allowfullscreen
></iframe>
```

Recomendaciones:
- Usa rutas relativas (ya configurado) para que el sitio cargue correctamente.
- Mantén el backend (si lo usas) desplegado aparte, por ejemplo en Render, Railway o Vercel, y ajusta la URL del fetch en `app.js`.
