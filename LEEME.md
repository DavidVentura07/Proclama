# Proclama — Fase 1

App de escritorio (PWA) para **proyectar contenido durante el culto**: versículos, banners/anuncios, diapositivas de predicaciones, con vista previa en vivo tipo OBS y una segunda ventana para el proyector.

---

## 1. Qué incluye esta Fase 1

- **Proyección tipo OBS**: una ventana de control con **Vista previa** (lo que preparas) y **En vivo** (lo que se proyecta), más una **segunda ventana** que arrastras a la pantalla del proyector.
- **Versículos**: Reina-Valera 1909 **completa e integrada** (31,102 versículos). Búsqueda por **referencia** ("Juan 3:16", "sal 23", "1co 13:4"…) y por **palabra**, panel visual de libros (Antiguo/Nuevo Testamento), capítulos y versículos. Navegación con **flechas ← →** del teclado para avanzar/retroceder el versículo en vivo.
- **Fondo y texto de los versículos**: imagen de fondo con **capa oscura** ajustable (el deslizador), y control total del texto (fuente, tamaño, color, peso, alineación, interlineado, sombra, mostrar/ocultar la referencia).
- **Predicaciones**: sube las diapositivas en **PNG o PDF** (los PDF se convierten a imágenes automáticamente). Se filtran por **tema** y se ordenan por **fecha**. **Borrado automático** a los **3 meses** (configurable y se puede apagar).
- **Banners**: sube imágenes de anuncios y proyéctalas.
- **Servicio**: una lista para dejar lista la secuencia del culto.
- **Botones rápidos**: Pantalla negra, Logo, y **Esc** para negro al instante.
- **Funciona sin internet** (offline) una vez instalada.
- **Respaldo JSON**: exporta/importa todo (versículos importados, banners, predicaciones, fondos y ajustes) para pasarlo a otra computadora.
- Ícono de cruz dorada, intro animada y pie de página.

> **Pendiente para la Fase 2** (como acordamos): integrar **WorshipSlides** e **Himnario de Victoria** embebidos. Por ahora sus imágenes se pueden proyectar desde **Banners**.

---

## 2. Cómo subirla a GitHub Pages

1. Crea un repositorio nuevo en tu GitHub (por ejemplo `proclama`).
2. Sube **todos** estos archivos y carpetas **respetando la estructura**:
   ```
   index.html
   manifest.json
   sw.js
   biblias/rvr1909.json
   iconos/icon-180.png
   iconos/icon-192.png
   iconos/icon-512.png
   iconos/favicon.ico
   ```
3. Activa **Pages** (Settings → Pages → Branch: `main`, carpeta `/`).
4. Abre la URL que te da GitHub en **Chrome**.
5. Para instalarla como app: menú de Chrome → "Instalar Proclama".

> **Importante (offline):** cada vez que actualices archivos, **sube el número de versión** en `sw.js` (cambia `proclama-v1` por `proclama-v2`, etc.). Así todos los equipos instalados toman la versión nueva. Como ya sabes, conviene desinstalar y reinstalar la app después de cada actualización.

---

## 3. Cómo proyectar (la segunda ventana)

1. Conecta el proyector como **segunda pantalla** en Windows (modo "Extender").
2. En Proclama, pulsa **"Abrir proyección"** (arriba a la derecha). Se abre una ventana nueva.
3. **Arrastra** esa ventana hacia la pantalla del proyector.
4. Haz clic en ella y presiona la tecla **F** para ponerla en **pantalla completa**.
5. Listo: lo que envíes "a vivo" desde el control aparecerá ahí, con la transición que elijas (Fundido/Corte, configurable).

La **Vista previa** del control siempre te muestra lo que estás preparando, y **En vivo** lo que se está proyectando en ese momento.

---

## 4. Sobre las versiones de la Biblia (importante)

- **RVR 1909** viene integrada porque es de **dominio público**.
- **RVR 1960, NVI, NBLA** tienen **derechos de autor**, por eso no las puedo incluir yo. La app tiene un **importador**: si consigues esas versiones en un archivo `.json` (de una fuente que lo permita o material con licencia que tengas), las cargas con el botón **"+ Importar versión"** y quedan disponibles en tu instalación local. Esto es responsabilidad tuya respecto a los permisos.

---

## 5. Notas útiles

- **PDF de predicaciones**: la **primera vez** que conviertas un PDF, el equipo necesita **internet** (descarga el lector de PDF una sola vez; luego queda guardado para offline). Las predicaciones **ya guardadas** se proyectan sin internet.
- **Las imágenes** (banners, predicaciones, fondos) se guardan en el navegador del equipo, no en GitHub. Usa el **respaldo JSON** para moverlas a otra computadora.
- **Nunca compartas** tu token personal de GitHub conmigo ni en el código.

---

*Diseñada para el servicio de nuestro Señor Jesucristo por David Ventura.*
