# Marina Cleans — Website

Sitio web de “Marina Cleans”, servicio profesional de limpieza residencial y comercial en el área de la Bahía de SF.  
Stack: **Vite + React + TypeScript + MUI** con animaciones de **Framer Motion**.

## ✨ Características

- **Hero animado** con parallax y micro-animaciones (Framer Motion)
- **Header** con logo grande (imagen + tipografía), menú lateral (Drawer) y CTA telefónica
- **Secciones**: Why us, Services, Process, Testimonials, Team, Quote, Contact (mapa)
- **“Check out our work”**: galería **Before/After** con comparador accesible y carrusel **nativo** (sin dependencias)
- **Diseño responsive** + paleta consistente
- Accesibilidad: soporte teclado en comparador before/after y reduced motion

## 🧰 Tech

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)

> Nota: Eliminamos las librerías de carrusel (Embla). El carrusel es nativo con `scroll-snap` + JS.

## 🚀 Scripts

```bash
# desarrollo
npm run dev

# build de producción
npm run build

# vista previa del build
npm run preview

# lint
npm run lint
