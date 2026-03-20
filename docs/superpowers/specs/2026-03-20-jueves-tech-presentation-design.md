# Jueves Tech Marzo 2026 — Diseño de Presentación

**Fecha:** 2026-03-20
**Evento:** Jueves Tech by Startup Galicia / IGAPE — 26 marzo 2026, 18:00h
**Ponente:** Agustín Jamardo
**Tema:** Emprendimiento en el entorno rural, Rural Hackers, Anceu Coliving, teletrabajo
**Idioma:** Castellano
**Output:** `jueves-tech-marzo-2026/slides.html`

---

## Enfoque narrativo

A través de las personas. El rural no lo cuentan los datos — lo cuentan Rogelio, Rosabel, Loreto, Víctor. La presentación alterna entre contexto/proyectos y retratos de personas reales con sus quotes.

---

## Técnico

- HTML único, sin frameworks, mismo sistema que `side-projects/index.html` (Sende Workshop)
- Navegación custom: flechas teclado, click izquierda/derecha, touch swipe
- Barra de progreso verde arriba
- Número de slide fijo abajo-derecha
- Logos fijos abajo-izquierda en todos los slides excepto portada y cierre

---

## Estilo visual

| Token | Valor |
|---|---|
| Background | `#0a0a0a` |
| Texto principal | `#ffffff` |
| Texto secundario | `#b0b0b0` |
| Acento | `#00a66b` |
| Font | Inter (Google Fonts), 300/400/600/700 |

**Logos fijos:** texto pequeño `RURAL HACKERS · ANCEU COLIVING` en `#444`, posición `bottom: 25px; left: 40px`
Cuando haya imágenes reales disponibles, usar `logos/rural-hackers.png` y `logos/anceu-coliving.png` con `filter: brightness(0) invert(1); opacity: 0.5`

---

## Tipos de slides

### 1. Image slide (portada / cierre)
`<img>` full-bleed con `init-page.jpg`. Sin logos superpuestos. Sin número.

### 2. Statement slide
Foto full-bleed + overlay oscuro (`rgba(0,0,0,0.6)`). Texto grande centrado en blanco. Impacto visual máximo.

### 3. Person slide
Layout: foto dominante (izquierda o derecha, 50%) + panel oscuro con:
- Nombre grande (`font-size: 3rem; font-weight: 700; color: white`)
- Bullets de descripción (`font-size: 1.2rem; color: #b0b0b0`)
- Quote en italic (`font-size: 1.4rem; color: white; border-left: 4px solid #00a66b`)

### 4. Content slide
- `h3` label en verde (`#00a66b`, uppercase, letter-spacing)
- `h2` título en blanco
- Bullets con `→` verde
- Fondo sólido `#0a0a0a`

### 5. Project slide
Split: texto izquierda + foto/grid derecha. O texto sobre foto con overlay lateral.

---

## Assets

### Logos (ruta desde `jueves-tech-marzo-2026/`)
- `../eslibre-2026/logos/rural-hackers.png`
- `../eslibre-2026/logos/anceu-coliving.png`

### Imágenes disponibles
- `../side-projects/images/rogelio.jpeg` — retrato de Rogelio (usar para person slide)
- `../side-projects/images/pegadas-rogelio.jpg` — Rogelio junto a señal de Pegadas (usar para slide Pegadas)
- `../side-projects/images/anceu-hero.jpg` — fachada Anceu Coliving
- `../side-projects/images/anceu-community.jpg` — comunidad Anceu
- `../side-projects/images/equipo-hackerdays.jpg` — equipo HackerDays
- `../side-projects/images/hackerdays-rosa-olga.jpeg` — HackerDays acción
- `../side-projects/images/pegadas-casiano.jpg` — Pegadas vista panorámica
- `../side-projects/images/pegadas-sign.jpg` — señal del camino
- `../eslibre-2026/images/rural-hackers-hero.jpg` — imagen Rural Hackers
- `init-page.jpg` — slide portada/cierre (local)

### Fotos de personas sin archivo local (marcar como placeholder)
- Agustín Jamardo (disponible en init-page.jpg recortada)
- Rosabel, Loreto, Víctor — necesitan foto externa o placeholder

---

## Estructura de slides (18)

| # | Tipo | Contenido |
|---|---|---|
| 1 | Image | `init-page.jpg` — portada del evento |
| 2 | Statement | `../side-projects/images/anceu-community.jpg` + *"Un pueblo no son casas, son personas"* |
| 3 | Person | **Agustín Jamardo** — Programador → fundador rural. Eleven Yellow / Rural Hackers / Anceu Coliving. Quote: *"Decidí que no quería elegir entre tecnología y territorio"* |
| 4 | Content | **Anceu** — aldea de 97 habitantes, 30 min de Pontevedra. El sitio que lo hizo posible. |
| 5 | Project | **Anceu Coliving** — qué es, quién viene, cómo funciona. Foto anceu-hero. |
| 6 | Person | **Rogelio** — 79 años, jubilado, nativo de Anceu, emigrante a Suíza. *"Yo os ayudo porque vosotros estáis ayudando a que mi aldea no muera"* |
| 7 | Person | **Rosabel** — La verdadera Rural Influencer. Nació en Anceu, se crió en Brasil. Presidenta de la asociación de aguas. *"Dame un teléfono, y moveré el mundo"* |
| 8 | Person | **Loreto** — Profesora jubilada, mediadora cultural Rural Hackers. *"Le habéis dado vida a este pueblo, muchas gracias"* |
| 9 | Content | **Rural Hackers** — Movimiento para la revitalización del rural con tecnología. Asociación gallega sin ánimo de lucro. |
| 10 | Project | **HackerDays** — semana intensiva, reto rural real, equipo diverso. Foto equipo. |
| 11 | Project | **Pegadas do Recordo** — 5km de caminos recuperados, señales NFC, historias del territorio. |
| 12 | Person | **Víctor** — 32 años, profesor de inglés online, madrileño, entrenador de boxeo, granjero. *"La vida en aldea, la vida mejor"* |
| 13 | Content | **Cómo se emprende en el rural** — sin oficina, sin networking de cafetería, con comunidad real |
| 14 | Content | **Construir redes en remoto** — herramientas, rituales, equipo distribuido |
| 15 | Content | **Lo que el rural te enseña** — lecciones de emprendimiento que la ciudad no da |
| 16 | Statement | `../eslibre-2026/images/rural-hackers-hero.jpg` + *"El rural no es el problema. Es la oportunidad."* |
| 17 | Content | Links + contacto — ruralhackers.org · anceu.com · hackerdays.org |
| 18 | Image | `init-page.jpg` — cierre del evento |

---

## Notas de implementación

- Para los person slides sin foto en el filesystem, usar un placeholder gris oscuro con el nombre inicial o indicar `<!-- TODO: añadir foto de [persona] -->`
- El slide de Agustín puede usar un crop de `init-page.jpg` (aparece en la imagen del evento) o un placeholder
- Misma lógica de navegación que `../side-projects/index.html` — copiar el bloque `<script>` completo del final de ese archivo (teclado, click por zonas, touch swipe)
- El CSS base es el mismo que Sende, adaptando el acento si se prefiere mantener `#00a66b`
