const tabs = Array.from(document.querySelectorAll('[role="tab"][data-gallery]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab) {
  const panelId = `gallery-panel-${tab.dataset.gallery}`;

  for (const item of tabs) {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  }

  for (const panel of panels) {
    panel.hidden = panel.id !== panelId;
  }
}

for (const tab of tabs) {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const current = tabs.indexOf(tab);
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;

    activateTab(tabs[next]);
    tabs[next].focus();
  });
}

const showcase = document.querySelector('.productShowcase');
const showcaseButtons = Array.from(document.querySelectorAll('[data-showcase]'));
const showcaseImages = {
  backdrop: showcase.querySelector('[data-showcase-image="backdrop"]'),
  main: showcase.querySelector('[data-showcase-image="main"]'),
  note: showcase.querySelector('[data-showcase-image="note"]'),
  secondary: showcase.querySelector('[data-showcase-image="secondary"]'),
};

const showcaseContent = {
  brasil: {
    backdrop: ['materials/aula-republica-jk-brasilia.webp', ''],
    main: ['materials/aula-colonia-chegada.webp', 'Slide sobre a chegada portuguesa ao Brasil'],
    note: ['materials/stickynote-republica-vargas.webp', 'Stickynote sobre o Segundo Governo Vargas'],
    secondary: ['materials/exercicios-republica-abertura.webp', 'Página da lista de exercícios de Brasil República'],
    mainTitle: 'Brasil Colônia',
    secondaryLabel: 'EXERCÍCIOS',
    secondaryTitle: 'Prática organizada',
  },
  geral: {
    backdrop: ['materials/aula-antiga-mesopotamia-hamurabi.webp', ''],
    main: ['materials/aula-antiga-egito-narmer.webp', 'Slide de Egito Antigo sobre a Paleta de Narmer'],
    note: ['materials/stickynote-antiga-egito.webp', 'Stickynote sobre Egito Antigo'],
    secondary: ['materials/aula-antiga-grecia-cidadania.webp', 'Slide de Grécia Antiga sobre cidadania ateniense'],
    mainTitle: 'Egito Antigo',
    secondaryLabel: 'AULA EM SLIDES',
    secondaryTitle: 'Grécia Antiga',
  },
};

function activateShowcase(area) {
  const content = showcaseContent[area];
  showcase.classList.toggle('showcase-geral', area === 'geral');
  showcase.classList.toggle('showcase-brasil', area === 'brasil');
  showcase.setAttribute('aria-label', `Amostras reais de História ${area === 'geral' ? 'Geral' : 'do Brasil'}`);
  for (const [key, image] of Object.entries(showcaseImages)) {
    image.src = content[key][0];
    image.alt = content[key][1];
  }
  showcase.querySelector('.showcaseMain figcaption strong').textContent = content.mainTitle;
  showcase.querySelector('.showcaseExercise, .showcaseSecondary').classList.toggle('showcaseExercise', area === 'brasil');
  const secondary = showcase.querySelector('[data-showcase-image="secondary"]').closest('figure');
  secondary.classList.toggle('showcaseSecondary', area === 'geral');
  secondary.querySelector('figcaption small').textContent = content.secondaryLabel;
  secondary.querySelector('figcaption strong').textContent = content.secondaryTitle;
  for (const button of showcaseButtons) {
    const active = button.dataset.showcase === area;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}

for (const button of showcaseButtons) {
  button.addEventListener('click', () => activateShowcase(button.dataset.showcase));
}

const areaButtons = Array.from(document.querySelectorAll('[data-area]'));
const originalPanels = Object.fromEntries(panels.map(panel => [panel.id.slice('gallery-panel-'.length), panel.innerHTML]));
const generalGallery = {
  aulas: {
    title: 'Apresentações prontas para projetar e editar',
    description: 'Telas reais das aulas de Egito Antigo, Mesopotâmia e Grécia. As demais épocas ganharão amostras conforme os materiais forem preparados.',
    samples: [
      ['aula-antiga-egito-narmer.webp', 'Egito Antigo', 'Aula: Paleta de Narmer'],
      ['aula-antiga-mesopotamia-hamurabi.webp', 'Mesopotâmia', 'Aula: Código de Hamurabi'],
      ['aula-antiga-grecia-cidadania.webp', 'Grécia', 'Aula: cidadania ateniense'],
    ],
  },
  stickynotes: {
    title: 'Sínteses visuais para revisar sem perder contexto',
    description: 'Páginas reais dos stickynotes de Egito Antigo e Grécia, com os conceitos centrais organizados para revisão.',
    samples: [
      ['stickynote-antiga-egito.webp', 'Egito Antigo', 'Stickynote de revisão'],
      ['stickynote-antiga-grecia.webp', 'Grécia', 'Stickynote de revisão'],
    ],
  },
  exercicios: {
    title: 'Listas organizadas para praticar e consolidar',
    description: 'As prévias das listas de História Geral serão adicionadas a esta área.',
    samples: [],
  },
};

function generalCard([filename, title, detail]) {
  const source = `materials/${filename}`;
  return `<a class="materialSampleCard landscape" href="${source}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar amostra: ${title}"><span class="materialImageFrame"><img alt="História Antiga: ${title}" loading="lazy" src="${source}"></span><span class="materialSampleCaption"><small>História Antiga</small><strong>${title}</strong><span>${detail}</span></span><span class="materialZoom" aria-hidden="true">AMPLIAR ↗</span></a>`;
}

function activateArea(area) {
  for (const button of areaButtons) {
    const active = button.dataset.area === area;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const [key, panel] of Object.entries(Object.fromEntries(panels.map(item => [item.id.slice('gallery-panel-'.length), item])))) {
    const content = generalGallery[key];
    panel.innerHTML = area === 'brasil' ? originalPanels[key] : `<div class="galleryPanelIntro"><div><span class="realMaterialSeal">${content.samples.length ? 'IMAGENS REAIS DO MATERIAL' : 'AMOSTRAS EM PREPARAÇÃO'}</span><h3>${content.title}</h3></div><p>${content.description}</p></div>${content.samples.length ? `<div class="materialSamplesGrid">${content.samples.map(generalCard).join('')}</div>` : '<p class="samplesPending">As primeiras imagens das listas de História Geral aparecerão aqui.</p>'}`;
  }
  document.querySelector('[data-gallery="aulas"] small').textContent = area === 'geral' ? 'História Antiga' : '3 períodos';
  document.querySelector('[data-gallery="exercicios"] small').textContent = area === 'geral' ? 'amostras em breve' : 'questões reais';
}

for (const button of areaButtons) {
  button.addEventListener('click', () => activateArea(button.dataset.area));
}

document.querySelector('.generalSampleLink').addEventListener('click', () => {
  activateArea('geral');
  activateTab(tabs[0]);
});
