# Jueves Tech Marzo 2026 — Presentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file HTML presentation (`jueves-tech-marzo-2026/slides.html`) for Agustín Jamardo's talk at Jueves Tech on 26 March 2026, about rural entrepreneurship, Rural Hackers, and Anceu Coliving.

**Architecture:** Single self-contained HTML file with inline CSS and JS, no build step, no dependencies except Google Fonts CDN. Same navigation pattern as `side-projects/index.html` (Sende Workshop). 18 slides of 5 types: image, statement, person, content, project.

**Tech Stack:** HTML5, CSS (custom properties, flexbox), vanilla JavaScript, Inter font via Google Fonts CDN.

---

## Files

| Action | Path | Purpose |
|--------|------|---------|
| Create | `jueves-tech-marzo-2026/slides.html` | The entire presentation |

No other files modified. All assets (images, logos) are referenced by relative path to existing files in the repo.

---

## Asset Reference Map

All paths are relative to `jueves-tech-marzo-2026/slides.html`:

| Asset | Relative Path | Used In |
|-------|--------------|---------|
| Portada/cierre | `init-page.jpg` | Slides 1, 18 |
| Anceu community | `../side-projects/images/anceu-community.jpg` | Slide 2 |
| Anceu hero | `../side-projects/images/anceu-hero.jpg` | Slide 5 |
| Rogelio retrato | `../side-projects/images/rogelio.jpeg` | Slide 6 |
| HackerDays equipo | `../side-projects/images/equipo-hackerdays.jpg` | Slide 10 |
| HackerDays acción | `../side-projects/images/hackerdays-rosa-olga.jpeg` | Slide 10 (alt) |
| Pegadas panorámica | `../side-projects/images/pegadas-casiano.jpg` | Slide 11 |
| Pegadas señal | `../side-projects/images/pegadas-rogelio.jpg` | Slide 11 (alt) |
| Rural Hackers hero | `../eslibre-2026/images/rural-hackers-hero.jpg` | Slide 16 |
| Logo Rural Hackers | `../eslibre-2026/logos/rural-hackers.png` | Fixed footer |
| Logo Anceu Coliving | `../eslibre-2026/logos/anceu-coliving.png` | Fixed footer |

Person slides without photo (Agustín, Rosabel, Loreto, Víctor): use a dark placeholder `<div class="photo-placeholder">` with the person's initial.

---

## Task 1: HTML skeleton + CSS base

**Files:**
- Create: `jueves-tech-marzo-2026/slides.html`

- [ ] **Step 1: Create the file with HTML skeleton, Google Fonts import, and CSS custom properties**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emprendimiento Rural — Agustín Jamardo · Jueves Tech 2026</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap">
    <style>
        :root {
            --accent: #00a66b;
            --accent-light: rgba(0, 166, 107, 0.1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #0a0a0a;
            color: #fff;
            overflow: hidden;
            height: 100vh;
        }
        .presentation { height: 100vh; width: 100vw; position: relative; }
        .slide {
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            padding: 60px 80px;
            opacity: 0; visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .slide.active { opacity: 1; visibility: visible; }
        /* Typography */
        h1 { font-size: 3.5rem; font-weight: 700; line-height: 1.1; margin-bottom: 30px;
             background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
             -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        h2 { font-size: 2.5rem; font-weight: 600; margin-bottom: 30px; color: #fff; }
        h3 { font-size: 1rem; font-weight: 700; color: var(--accent);
             text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
        p { font-size: 1.3rem; line-height: 1.6; color: #b0b0b0; margin-bottom: 20px; }
        ul { list-style: none; font-size: 1.2rem; line-height: 2; }
        ul li { position: relative; padding-left: 28px; color: #b0b0b0; }
        ul li::before { content: "→"; position: absolute; left: 0; color: var(--accent); }
        .highlight { color: var(--accent); font-weight: 600; }
        /* Fixed UI */
        .progress-bar { position: fixed; top: 0; left: 0; height: 3px;
                        background: var(--accent); transition: width 0.3s ease; z-index: 100; }
        .slide-number { position: fixed; bottom: 25px; right: 40px;
                        font-size: 0.85rem; color: #333; z-index: 100; }
        .logos { position: fixed; bottom: 22px; left: 40px;
                 display: flex; align-items: center; gap: 10px; z-index: 100; }
        .logos img { height: 22px; opacity: 0.45; filter: brightness(0) invert(1); }
        .logos .sep { color: #333; font-size: 0.75rem; }
        .nav-hint { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
                    font-size: 0.8rem; color: #222; z-index: 100; }
    </style>
</head>
<body>
    <div class="progress-bar" id="progress"></div>
    <div class="presentation" id="presentation">
        <!-- slides go here -->
    </div>
    <div class="logos">
        <img src="../eslibre-2026/logos/rural-hackers.png" alt="Rural Hackers"
             onerror="this.parentNode.querySelector('.rh-text').style.display='inline'">
        <span class="rh-text" style="display:none;font-size:0.7rem;color:#444;font-weight:700;letter-spacing:1px;">RURAL HACKERS</span>
        <span class="sep">·</span>
        <img src="../eslibre-2026/logos/anceu-coliving.png" alt="Anceu Coliving"
             onerror="this.parentNode.querySelector('.ac-text').style.display='inline'">
        <span class="ac-text" style="display:none;font-size:0.7rem;color:#444;font-weight:700;letter-spacing:1px;">ANCEU COLIVING</span>
    </div>
    <div class="slide-number" id="slideNumber">1 / 18</div>
    <div class="nav-hint">← → o Espacio para navegar</div>
    <script>
        const slides = document.querySelectorAll('.slide');
        const progress = document.getElementById('progress');
        const slideNumber = document.getElementById('slideNumber');
        let current = 0;
        function show(i) {
            if (i < 0) i = 0;
            if (i >= slides.length) i = slides.length - 1;
            slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
            current = i;
            progress.style.width = ((i + 1) / slides.length * 100) + '%';
            slideNumber.textContent = (i + 1) + ' / ' + slides.length;
        }
        document.addEventListener('keydown', e => {
            if (['ArrowRight', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); show(current + 1); }
            else if (['ArrowLeft', 'Backspace'].includes(e.key)) { e.preventDefault(); show(current - 1); }
            else if (e.key === 'Home') show(0);
            else if (e.key === 'End') show(slides.length - 1);
        });
        let tx = 0;
        document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
        document.addEventListener('touchend', e => {
            const d = tx - e.changedTouches[0].clientX;
            if (Math.abs(d) > 50) show(d > 0 ? current + 1 : current - 1);
        });
        document.addEventListener('click', e => {
            if (e.target.tagName === 'A') return;
            e.clientX > window.innerWidth * 0.7 ? show(current + 1) :
            e.clientX < window.innerWidth * 0.3 ? show(current - 1) : null;
        });
        show(0);
    </script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify skeleton loads with green progress bar and nav hint**

Open `jueves-tech-marzo-2026/slides.html` in a browser. Expected: black page, thin green line at top (1/18), logos text or images bottom-left, slide number bottom-right.

- [ ] **Step 3: Commit skeleton**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: add jueves-tech presentation skeleton with nav and fixed UI"
```

---

## Task 2: CSS for slide types

**Files:**
- Modify: `jueves-tech-marzo-2026/slides.html` — add CSS classes for all 5 slide types inside `<style>`

- [ ] **Step 1: Add CSS for image-slide, statement-slide, person-slide, content-slide, project-slide**

Insert inside `<style>` before the closing `</style>`:

```css
/* IMAGE SLIDE */
.image-slide { padding: 0; }
.image-slide img { width: 100%; height: 100%; object-fit: cover; }
/* hide logos/number on image slides */
.image-slide ~ * {}

/* STATEMENT SLIDE */
.statement-slide {
    background-size: cover; background-position: center;
    position: relative;
}
.statement-slide::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(0,0,0,0.62); z-index: 1;
}
.statement-slide .text {
    position: relative; z-index: 2;
    text-align: center; max-width: 900px;
}
.statement-slide .text h2 {
    font-size: 3.2rem; font-weight: 700; line-height: 1.3;
    color: #fff; margin: 0;
}
.statement-slide .text h2 strong { color: var(--accent); }

/* PERSON SLIDE */
.person-slide {
    flex-direction: row; gap: 0; padding: 0; align-items: stretch;
}
.person-slide .person-photo {
    flex: 0 0 48%; position: relative; overflow: hidden;
}
.person-slide .person-photo img {
    width: 100%; height: 100%; object-fit: cover;
}
.person-slide .photo-placeholder {
    width: 100%; height: 100%; background: #111;
    display: flex; align-items: center; justify-content: center;
    font-size: 8rem; font-weight: 700; color: #222;
}
.person-slide .person-info {
    flex: 1; padding: 60px 60px 60px 60px;
    display: flex; flex-direction: column; justify-content: center;
}
.person-slide .person-name {
    font-size: 3.5rem; font-weight: 700; color: #fff;
    margin-bottom: 24px; line-height: 1;
}
.person-slide .person-facts { margin-bottom: 32px; }
.person-slide .person-facts li { font-size: 1.15rem; color: #b0b0b0; line-height: 1.9; }
.person-slide .person-facts li::before { display: none; }
.person-slide .person-quote {
    font-size: 1.3rem; font-style: italic; color: #fff;
    border-left: 4px solid var(--accent); padding-left: 20px;
    line-height: 1.6;
}

/* CONTENT SLIDE */
.content-slide { align-items: flex-start; max-width: 900px; margin: 0 auto; }
.content-slide.centered { align-items: center; text-align: center; }

/* PROJECT SLIDE */
.project-slide { flex-direction: row; gap: 60px; padding: 60px 80px; }
.project-slide .project-text { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.project-slide .project-image { flex: 1; max-height: 70vh; object-fit: cover; border-radius: 12px;
                                 box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.project-slide .photo-placeholder { flex: 1; background: #111; border-radius: 12px;
                                     display: flex; align-items: center; justify-content: center;
                                     color: #222; font-size: 2rem; }

/* Quote style for non-person slides */
.quote {
    font-size: 1.8rem; font-style: italic; color: #fff;
    border-left: 4px solid var(--accent); padding-left: 24px; margin: 32px 0;
}
```

- [ ] **Step 2: Verify file saves without syntax errors (open in browser, no console errors)**

- [ ] **Step 3: Commit CSS**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: add CSS for all 5 slide types"
```

---

## Task 3: Slides 1–6 (Apertura + Personas 1)

**Files:**
- Modify: `jueves-tech-marzo-2026/slides.html` — add slides inside `<div class="presentation">`

- [ ] **Step 1: Add slides 1–6**

Replace `<!-- slides go here -->` with:

```html
<!-- SLIDE 1: Portada -->
<section class="slide image-slide active">
    <img src="init-page.jpg" alt="Jueves Tech — Rural Hackers">
</section>

<!-- SLIDE 2: Statement -->
<section class="slide statement-slide"
         style="background-image: url('../side-projects/images/anceu-community.jpg')">
    <div class="text">
        <h2>Un pueblo no son casas,<br><strong>son personas</strong></h2>
    </div>
</section>

<!-- SLIDE 3: Agustín Jamardo -->
<section class="slide person-slide">
    <div class="person-photo">
        <div class="photo-placeholder">AJ</div>
    </div>
    <div class="person-info">
        <div class="person-name">Agustín Jamardo</div>
        <ul class="person-facts">
            <li>Programador en Eleven Yellow</li>
            <li>Fundador de Rural Hackers</li>
            <li>Impulsor de Anceu Coliving</li>
            <li>Vive en una aldea de 97 habitantes</li>
        </ul>
        <div class="person-quote">
            "Decidí que no quería elegir entre tecnología y territorio"
        </div>
    </div>
</section>

<!-- SLIDE 4: Anceu -->
<section class="slide content-slide">
    <h3>El sitio</h3>
    <h2>Anceu, Pontevedra</h2>
    <ul>
        <li>Aldea de 97 habitantes</li>
        <li>30 minutos de Pontevedra</li>
        <li>Zona rural con envejecimiento acelerado</li>
        <li>Ahora: coliving, coworking, hackathons, proyectos</li>
    </ul>
</section>

<!-- SLIDE 5: Anceu Coliving -->
<section class="slide project-slide">
    <div class="project-text">
        <h3>Anceu Coliving</h3>
        <h2>Teletrabajo en el rural</h2>
        <ul>
            <li>Estancias de 15 a 60 días</li>
            <li>Profesionales remotos de toda Europa</li>
            <li>Coworking, comunidad y vida en aldea</li>
            <li>El experimento que lo empezó todo</li>
        </ul>
    </div>
    <img src="../side-projects/images/anceu-hero.jpg"
         alt="Anceu Coliving" class="project-image">
</section>

<!-- SLIDE 6: Rogelio -->
<section class="slide person-slide">
    <div class="person-photo">
        <img src="../side-projects/images/rogelio.jpeg" alt="Rogelio">
    </div>
    <div class="person-info">
        <div class="person-name">Rogelio</div>
        <ul class="person-facts">
            <li>79 años</li>
            <li>Jubilado</li>
            <li>Nativo de Anceu</li>
            <li>Emigrante a Suíza</li>
            <li>Apasionado por Anceu</li>
        </ul>
        <div class="person-quote">
            "Yo os ayudo porque vosotros estáis ayudando a que mi aldea no muera"
        </div>
    </div>
</section>
```

- [ ] **Step 2: Open in browser, navigate slides 1–6 with arrow keys. Check:**
  - Slide 1: imagen init-page.jpg ocupa pantalla completa
  - Slide 2: foto de fondo + texto "son personas" centrado
  - Slide 3: placeholder "AJ" izquierda + datos Agustín derecha
  - Slide 4: contenido con bullets y → verde
  - Slide 5: texto izquierda + foto anceu-hero derecha
  - Slide 6: foto Rogelio izquierda + datos + quote derecha

- [ ] **Step 3: Commit**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: add slides 1-6 (apertura, Anceu, Rogelio)"
```

---

## Task 4: Slides 7–12 (Personas 2 + Rural Hackers)

**Files:**
- Modify: `jueves-tech-marzo-2026/slides.html` — append slides 7–12 inside `.presentation`

- [ ] **Step 1: Add slides 7–12 after slide 6**

```html
<!-- SLIDE 7: Rosabel -->
<section class="slide person-slide">
    <div class="person-photo">
        <div class="photo-placeholder">R</div>
    </div>
    <div class="person-info">
        <div class="person-name">Rosabel</div>
        <ul class="person-facts">
            <li>La verdadera Rural Influencer</li>
            <li>Nació en Anceu, se crió en Brasil</li>
            <li>Trabaja en Anceu Coliving desde su apertura</li>
            <li>Presidenta de la asociación de aguas</li>
        </ul>
        <div class="person-quote">
            "Dame un teléfono, y moveré el mundo"
        </div>
    </div>
</section>

<!-- SLIDE 8: Loreto -->
<section class="slide person-slide">
    <div class="person-photo">
        <div class="photo-placeholder">L</div>
    </div>
    <div class="person-info">
        <div class="person-name">Loreto</div>
        <ul class="person-facts">
            <li>Profesora jubilada</li>
            <li>Mediadora cultural de Rural Hackers</li>
            <li>Apasionada por la lectura</li>
        </ul>
        <div class="person-quote">
            "Le habéis dado vida a este pueblo, muchas gracias"
        </div>
    </div>
</section>

<!-- SLIDE 9: Rural Hackers -->
<section class="slide content-slide">
    <h3>El movimiento</h3>
    <h2>Rural Hackers</h2>
    <ul>
        <li>Asociación gallega sin ánimo de lucro</li>
        <li>Revitalización del rural con tecnología y arte</li>
        <li>Atraer talento y retener jóvenes en el territorio</li>
        <li>Cultura hacker: prototipado, prueba y error</li>
    </ul>
    <p style="margin-top: 32px;">
        <span class="highlight">ruralhackers.org</span>
    </p>
</section>

<!-- SLIDE 10: HackerDays -->
<section class="slide project-slide">
    <div class="project-text">
        <h3>Rural Hackers</h3>
        <h2>HackerDays</h2>
        <ul>
            <li>Una semana, un reto rural real</li>
            <li>Equipo diverso: código, diseño, makers, vecinos</li>
            <li>Alojamiento y comida gratuitos</li>
            <li>2025: Punto de Agua — gestión comunitaria del agua</li>
        </ul>
        <p style="margin-top: 24px; font-size: 1rem;">
            <span class="highlight">hackerdays.org</span>
        </p>
    </div>
    <img src="../side-projects/images/equipo-hackerdays.jpg"
         alt="Equipo HackerDays" class="project-image">
</section>

<!-- SLIDE 11: Pegadas do Recordo -->
<section class="slide project-slide">
    <div class="project-text">
        <h3>Rural Hackers</h3>
        <h2>Pegadas do Recordo</h2>
        <ul>
            <li>5km de caminos olvidados recuperados</li>
            <li>Señales NFC con historias del territorio</li>
            <li>24 personas de 11 nacionalidades + vecinos</li>
            <li>Videos documentales y patrimonio inmaterial</li>
        </ul>
    </div>
    <img src="../side-projects/images/pegadas-casiano.jpg"
         alt="Pegadas do Recordo" class="project-image">
</section>

<!-- SLIDE 12: Víctor -->
<section class="slide person-slide">
    <div class="person-photo">
        <div class="photo-placeholder">V</div>
    </div>
    <div class="person-info">
        <div class="person-name">Víctor</div>
        <ul class="person-facts">
            <li>32 años</li>
            <li>Profesor de inglés online</li>
            <li>Madrileño</li>
            <li>Entrenador de boxeo</li>
            <li>Granjero</li>
        </ul>
        <div class="person-quote">
            "La vida en aldea, la vida mejor"
        </div>
    </div>
</section>
```

- [ ] **Step 2: Navigate slides 7–12 in browser. Check person slides have correct placeholder initials, project slides show images on the right (or graceful fallback), content slide has green bullets.**

- [ ] **Step 3: Commit**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: add slides 7-12 (Rosabel, Loreto, Rural Hackers, HackerDays, Pegadas, Víctor)"
```

---

## Task 5: Slides 13–18 (Emprendimiento + Cierre)

**Files:**
- Modify: `jueves-tech-marzo-2026/slides.html` — append slides 13–18

- [ ] **Step 1: Add slides 13–18**

```html
<!-- SLIDE 13: Cómo se emprende en el rural -->
<section class="slide content-slide">
    <h3>Emprendimiento rural</h3>
    <h2>Fuera de la ciudad también se puede</h2>
    <ul>
        <li>El coworking es la comunidad que te rodea</li>
        <li>El networking ocurre en la huerta y en el monte</li>
        <li>Las herramientas digitales eliminan la distancia</li>
        <li>El contexto rural atrae perfiles que no encuentras en la ciudad</li>
    </ul>
</section>

<!-- SLIDE 14: Construir redes -->
<section class="slide content-slide">
    <h3>Equipo y redes</h3>
    <h2>Construir en remoto</h2>
    <ul>
        <li>El equipo distribuido necesita rituales fuertes</li>
        <li>La comunidad local es parte del equipo</li>
        <li>Las redes se construyen haciendo cosas, no en eventos</li>
        <li>Proyectos abiertos atraen a las personas correctas</li>
    </ul>
</section>

<!-- SLIDE 15: Lo que el rural te enseña -->
<section class="slide content-slide">
    <h3>Lecciones</h3>
    <h2>Lo que el rural te enseña</h2>
    <ul>
        <li><span class="highlight">Recursos escasos</span> → creatividad obligada</li>
        <li><span class="highlight">Vecinos reales</span> → feedback honesto</li>
        <li><span class="highlight">Ritmos naturales</span> → sostenibilidad real</li>
        <li><span class="highlight">Comunidad</span> → el mejor sistema de soporte</li>
    </ul>
</section>

<!-- SLIDE 16: Statement final -->
<section class="slide statement-slide"
         style="background-image: url('../eslibre-2026/images/rural-hackers-hero.jpg')">
    <div class="text">
        <h2>El rural no es el problema.<br><strong>Es la oportunidad.</strong></h2>
    </div>
</section>

<!-- SLIDE 17: Contacto -->
<section class="slide content-slide centered">
    <h3>Sigamos la conversación</h3>
    <h2>Agustín Jamardo</h2>
    <ul style="text-align: left; margin-top: 16px;">
        <li><span class="highlight">ruralhackers.org</span></li>
        <li><span class="highlight">anceu.com</span></li>
        <li><span class="highlight">hackerdays.org</span></li>
    </ul>
</section>

<!-- SLIDE 18: Cierre -->
<section class="slide image-slide">
    <img src="init-page.jpg" alt="Jueves Tech — Rural Hackers">
</section>
```

- [ ] **Step 2: Navigate all 18 slides. Final checks:**
  - Slide 18 shows init-page.jpg like slide 1
  - Progress bar reaches 100% on slide 18
  - Slide counter shows "18 / 18"
  - Statement slides have dark overlay, text legible
  - No console errors

- [ ] **Step 3: Commit**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: add slides 13-18 (emprendimiento, cierre)"
```

---

## Task 6: Polish — logos visibility + image-slide exceptions

**Files:**
- Modify: `jueves-tech-marzo-2026/slides.html` — hide logos/number on image slides (portada/cierre)

- [ ] **Step 1: Add JS to toggle logos and slide-number visibility on image slides**

Inside the `<script>` block, modify the `show()` function to hide `.logos`, `.slide-number`, and `.nav-hint` when the current slide has class `image-slide`:

```javascript
function show(i) {
    if (i < 0) i = 0;
    if (i >= slides.length) i = slides.length - 1;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    current = i;
    progress.style.width = ((i + 1) / slides.length * 100) + '%';
    slideNumber.textContent = (i + 1) + ' / ' + slides.length;
    // Hide UI chrome on image slides
    const isImageSlide = slides[i].classList.contains('image-slide');
    document.querySelector('.logos').style.opacity = isImageSlide ? '0' : '1';
    document.querySelector('.slide-number').style.opacity = isImageSlide ? '0' : '1';
    document.querySelector('.nav-hint').style.opacity = isImageSlide ? '0' : '1';
    progress.style.opacity = isImageSlide ? '0' : '1';
}
```

- [ ] **Step 2: Verify slide 1 and 18 show only the image with no UI elements overlaid. Slide 2 should show logos and progress bar again.**

- [ ] **Step 3: Commit**

```bash
git add jueves-tech-marzo-2026/slides.html
git commit -m "feat: hide UI chrome on image slides (portada/cierre)"
```

---

## Task 7: Final review + index update

**Files:**
- Modify: `index.html` — add link to the new presentation

- [ ] **Step 1: Add the new presentation to root index.html**

In `index.html`, inside `.presentations`, add a new card after the existing ones:

```html
<a href="jueves-tech-marzo-2026/slides.html" class="card">
    <div class="tag">Jueves Tech · Marzo 2026</div>
    <h2>Emprendimiento en el rural</h2>
    <p>Rural Hackers, Anceu Coliving y el teletrabajo como motor del territorio. A través de las personas.</p>
</a>
```

- [ ] **Step 2: Do a full run-through of all 18 slides:**
  - Arrow keys forward and backward
  - Click on right third → avanza
  - Click on left third → retrocede
  - Touch swipe (DevTools mobile emulation)
  - Check all images load (no broken img icons)
  - Check logos appear on all slides except 1 and 18

- [ ] **Step 3: Final commit**

```bash
git add jueves-tech-marzo-2026/slides.html index.html
git commit -m "feat: jueves tech 2026 presentation — 18 slides sobre emprendimiento rural"
```

---

## Notes for person slides without photos

Slides 3 (Agustín), 7 (Rosabel), 8 (Loreto), 12 (Víctor) use `<div class="photo-placeholder">` with the person's initial. These are marked with `<!-- TODO: replace with photo -->` comments in the HTML so they're easy to find and update when photos are available.
