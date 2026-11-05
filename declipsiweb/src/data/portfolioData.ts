export type Locale = 'en' | 'de' | 'ru';

export type ProjectCategoryKey = 'all' | 'motion3d' | 'ai' | 'reels' | 'landings';

export interface RabbitHoleItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  quote: string;
  shapeType: 'polyhedron' | 'smartphone' | 'stylus' | 'aicore' | 'magnet' | 'browser';
  accentColor: string;
  yOffset: number;
  details: string;
}

export interface HeartPillar {
  id: string;
  stepLabel: string;
  title: string;
  artifactName: string;
  artifactType: 'target-brain' | 'orbit-camera' | 'ai-prism';
  description: string;
  proofMetric: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  role: string;
  description: string;
  highlightTag: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  caption: string;
}

export interface ProjectCase {
  id: string;
  number: string;
  codeTitle: string;
  title: string;
  subtitle: string;
  description: string;
  categoryKeys: ProjectCategoryKey[];
  categories?: string[]; // backward-compatible label list
  image: string;
  metrics: {
    ctr: string;
    retention3s: string;
    outcome: string;
  };
  tools: string[];
  hookFormula: string;
  pipelineSteps: string[];
  deliverables: string;
}

export interface CompetencyItem {
  id: string;
  number: string;
  title: string;
  description: string;
  keywords: string;
}

export interface LanguageProficiency {
  code: string;
  name: string;
  level: string;
}

export interface PortfolioLocaleContent {
  metaTitle: string;
  nav: {
    brandName: string;
    mind: string;
    works: string;
    resume: string;
    tiktok: string;
    lightMode: string;
    darkMode: string;
    lightAria: string;
    darkAria: string;
    cta: string;
    mobileThemePrefix: string;
  };
  hero: {
    statusOpen: string;
    location: string;
    specialty: string;
    headlinePart1: string;
    headlineItalic: string;
    headlinePart2: string;
    subtitle: string;
    subtitleAside: string;
    ctaWorks: string;
    ctaContact: string;
    ctaDive: string;
    knotLabel: string;
    knotPulseBtn: string;
    knotThreadArrow: string;
    miniNodes: {
      cube: string;
      keyframe: string;
      ai: string;
    };
    metrics: {
      m1Val: string;
      m1Label: string;
      m2Val: string;
      m2Label: string;
      m3Val: string;
      m3Label: string;
      m4Val: string;
      m4Label: string;
    };
  };
  story: {
    threadLabel: string;
    threadHint: string;
    tab1: string;
    tab2: string;
    tab3: string;
    nodePrefix: string;
    activeNodeLabel: string;
    scrollBelowHint: string;
    scene1: {
      kicker: string;
      headlineBold: string;
      headlineNormal: string;
      subheadItalic: string;
    };
    scene2: {
      kicker: string;
      headlinePart1: string;
      headlineItalic: string;
      accentPrefix: string;
    };
    scene3: {
      kicker: string;
      headlinePart1: string;
      headlineItalic: string;
    };
  };
  loop: {
    kicker: string;
    headlinePart1: string;
    headlineItalic: string;
    cycleBtn: string;
    leadIn: string;
    ctaWorks: string;
  };
  works: {
    kicker: string;
    headlinePart1: string;
    headlineItalic: string;
    filterAria: string;
    categories: Record<ProjectCategoryKey, string>;
    reelActive: string;
    reelHover: string;
    hookFormulaLabel: string;
    outcomeLabel: string;
    caseDetailsBtn: string;
    tiktokKicker: string;
    tiktokTitle: string;
    tiktokDesc: string;
    tiktokCta: string;
    moreRabbitHolesBtn: string;
    modal: {
      closeAria: string;
      ctrLabel: string;
      retentionLabel: string;
      effectLabel: string;
      stagesTitle: string;
      deliverablesPrefix: string;
      wantSimilarBtn: string;
    };
  };
  resume: {
    kicker: string;
    headlinePart1: string;
    headlineItalic: string;
    previewBtn: string;
    downloadBtn: string;
    downloadedBtn: string;
    summaryKicker: string;
    summaryTitle: string;
    summaryBody: string;
    summaryLocation: string;
    educationLabel: string;
    educationTitle: string;
    educationBody: string;
    languagesLabel: string;
    competencyPrefix: string;
    cvModal: {
      roleLine: string;
      locationLine: string;
      historyTitle: string;
      downloadTxtBtn: string;
      printPdfBtn: string;
      closeAria: string;
    };
  };
  footer: {
    dragBadge: string;
    bubbleIdle: string;
    bubblePulled: string;
    pullBtn: string;
    kicker: string;
    headlinePart1: string;
    headlineItalic: string;
    line1: string;
    line2: string;
    line3: string;
    line4Bold: string;
    emailHint: string;
    emailCopied: string;
    briefBtn: string;
    locationText: string;
    funFact: string;
  };
  brief: {
    kicker: string;
    title: string;
    closeAria: string;
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    typeLabel: string;
    typeOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successBodyPart1: string;
    successBodyPart2: string;
    successBodyPart3: string;
    openMailClientBtn: string;
    doneBtn: string;
    errors: {
      name: string;
      contact: string;
      message: string;
    };
  };
  rabbitHoles: RabbitHoleItem[];
  heartPillars: HeartPillar[];
  timelineMilestones: TimelineMilestone[];
  processLoopSteps: ProcessStep[];
  projects: ProjectCase[];
  competencies: CompetencyItem[];
  languages: LanguageProficiency[];
}

export const CATEGORY_KEYS: ProjectCategoryKey[] = [
  'all',
  'motion3d',
  'ai',
  'reels',
  'landings',
];

export const PORTFOLIO_I18N: Record<Locale, PortfolioLocaleContent> = {
  // ===========================================================================
  // ENGLISH (DEFAULT PRIMARY LANGUAGE)
  // ===========================================================================
  en: {
    metaTitle: 'Diana Palii — Anatomy of a Creative Motion Designer',
    nav: {
      brandName: 'Diana Palii',
      mind: 'mind',
      works: 'work',
      resume: 'resume',
      tiktok: 'tiktok',
      lightMode: 'sketchbook light',
      darkMode: 'cinema dark',
      lightAria: 'Switch to light sketchbook theme',
      darkAria: 'Switch to dark cinema showreel theme',
      cta: 'discuss project',
      mobileThemePrefix: 'Theme',
    },
    hero: {
      statusOpen: 'Open for projects',
      location: 'Germany (DE / EU / Remote)',
      specialty: 'Visual Ads & Motion',
      headlinePart1: 'the anatomy of a ',
      headlineItalic: 'creative',
      headlinePart2: 'motion designer.',
      subtitle: 'An almost accurate map of everything going on inside my head.',
      subtitleAside: '(or simply put — welcome to my portfolio :)',
      ctaWorks: '[view selected work]',
      ctaContact: '[write to me]',
      ctaDive: 'dive into my head',
      knotLabel: 'Fig. 01 — Tangled knot of ideas',
      knotPulseBtn: 'send pulse',
      knotThreadArrow: 'story thread →',
      miniNodes: {
        cube: '3D Object: tactile volume, shaders & lighting that hook the eye in 0.5 sec.',
        keyframe: 'Keyframe: smooth velocity curves (cubic-bezier) & Alight Motion rhythm.',
        ai: 'AI Spark: generative pipeline with Flow + Claude + Gemini + Argon (5× faster).',
      },
      metrics: {
        m1Val: '3 sec',
        m1Label: 'attention hook window before a viewer swipes in TikTok & Reels',
        m2Val: '5× faster',
        m2Label: 'concept generation pipeline (Flow · Claude · Gemini · Argon)',
        m3Val: '5 years',
        m3Label: 'commercial sales background & real buyer psychology',
        m4Val: '360° cycle',
        m4Label: '2D/3D motion + custom illustration + promo landing (Tilda/Readymag)',
      },
    },
    story: {
      threadLabel: 'THE STORY THREAD',
      threadHint: 'Scroll down — camera glides right along the thread',
      tab1: '01. Rabbit Holes',
      tab2: '02. What Stole My Heart',
      tab3: '03. Timeline 2019–2026',
      nodePrefix: 'node',
      activeNodeLabel: 'Active 3D node:',
      scrollBelowHint: 'Keep scrolling to enter "The Process Loop" and case studies ↓',
      scene1: {
        kicker: 'Scene 01 · My Rabbit Holes',
        headlineBold: 'I work at the intersection of formats.',
        headlineNormal: 'A one-person orchestra in visual ads?',
        subheadItalic: 'A polite way of saying I love diving headfirst into creative rabbit holes.',
      },
      scene2: {
        kicker: 'Scene 02 · What Stole My Heart',
        headlinePart1: 'but three things are my ',
        headlineItalic: 'core foundation.',
        accentPrefix: '3D accent:',
      },
      scene3: {
        kicker: 'Scene 03 · Timeline on the Thread',
        headlinePart1: 'somehow I always gravitate toward... ',
        headlineItalic: 'results & conversion.',
      },
    },
    loop: {
      kicker: 'Vertical Scroll Transition · My Process Loop (The Loop)',
      headlinePart1: 'apparently, I just don’t know how to design ',
      headlineItalic: '“just to check a box”.',
      cycleBtn: 'step through the loop',
      leadIn: 'Enough autobiography. Let’s see what this actually produces.',
      ctaWorks: '[explore projects ↓]',
    },
    works: {
      kicker: '07 · Selected Work',
      headlinePart1: 'projects where visuals ',
      headlineItalic: 'drive real CTR.',
      filterAria: 'Filter projects by category',
      categories: {
        all: 'All',
        motion3d: 'Motion & 3D',
        ai: 'AI Creatives',
        reels: 'Reels / TikTok',
        landings: 'Promo Landings',
      },
      reelActive: 'REEL PREVIEW · 60 FPS',
      reelHover: 'HOVER / CLICK PREVIEW',
      hookFormulaLabel: 'Hook formula:',
      outcomeLabel: 'Impact:',
      caseDetailsBtn: 'case breakdown',
      tiktokKicker: 'TikTok Influencer · First-Person Visual Storytelling',
      tiktokTitle: 'I don’t just study algorithms in theory — I run my own TikTok blog.',
      tiktokDesc:
        'I test retention hooks, sound triggers, AI transitions, and editing pacing on a live audience every week. That gives brands native creative direction that never feels like a skippable banner.',
      tiktokCta: 'order a Reels / TikTok ad pack',
      moreRabbitHolesBtn: 'More rabbit holes (Full Resume & Stack) →',
      modal: {
        closeAria: 'Close case study',
        ctrLabel: 'Click-Through Rate',
        retentionLabel: 'Retention',
        effectLabel: 'Business Outcome',
        stagesTitle: 'Production Pipeline:',
        deliverablesPrefix: 'Deliverables:',
        wantSimilarBtn: 'request a similar project',
      },
    },
    resume: {
      kicker: '08 · Full Resume / Anatomy of Skills (For Recruiters & Clients)',
      headlinePart1: 'experience structure & ',
      headlineItalic: 'creative stack.',
      previewBtn: 'Open printable CV view',
      downloadBtn: 'Download CV (PDF / TXT)',
      downloadedBtn: 'CV Downloaded!',
      summaryKicker: 'About Me · Executive Summary',
      summaryTitle:
        'Creative Visual Advertising Specialist, 2D/3D Motion Designer & Generative Art Creator.',
      summaryBody:
        'I build full-cycle commercial visuals: from concept, storyboarding, and custom digital illustration to 2D/3D animation and high-converting promo landings. By combining 5 years of real-world sales experience with a modern AI pipeline, every frame is engineered for retention and conversion.',
      summaryLocation: 'Germany',
      educationLabel: 'Education',
      educationTitle: 'Entrepreneurship, Trade & Exchange Operations',
      educationBody:
        'Qualification: Sales Representative. Built a rock-solid foundation in product unit economics, buyer psychology, and value framing.',
      languagesLabel: 'Languages',
      competencyPrefix: 'Competency',
      cvModal: {
        roleLine: 'Junior Creative & Motion Designer · AI Visual Specialist · TikTok Influencer',
        locationLine: 'Germany · dianapaliij@gmail.com · Open for projects & roles',
        historyTitle: 'Experience & Milestones',
        downloadTxtBtn: 'Download CV file (.txt)',
        printPdfBtn: 'Print / Save as PDF',
        closeAria: 'Close resume preview',
      },
    },
    footer: {
      dragBadge: 'drag / pull sticker',
      bubbleIdle: '“Pull my sticker with your mouse or tap the spring button below!”',
      bubblePulled: '“Hey, careful with the layers! Better drop me an email :)”',
      pullBtn: 'bounce sticker on spring',
      kicker: '09 · End of the Thread (“Who made all this?”)',
      headlinePart1: 'who made this? ',
      headlineItalic: 'oh, hi. I’m Diana.',
      line1: 'still hunting for the perfect frame.',
      line2: 'still testing new neural networks.',
      line3: 'still knowing how to sell an idea in 3 seconds.',
      line4Bold: 'let’s create visuals the internet won’t scroll past.',
      emailHint: 'Direct email (click to copy in 1 click)',
      emailCopied: 'Email dianapaliij@gmail.com copied to clipboard!',
      briefBtn: 'fill out mini-brief',
      locationText: 'Location: Germany',
      funFact:
        '“5 years selling products face-to-face, now selling ideas through pixels, 3D, and neural networks”.',
    },
    brief: {
      kicker: 'Contact Diana · dianapaliij@gmail.com',
      title: 'Discuss a Project',
      closeAria: 'Close project brief modal',
      nameLabel: 'Your Name *',
      namePlaceholder: 'e.g., Anna / Brand Manager',
      contactLabel: 'Email or @telegram for reply *',
      contactPlaceholder: 'name@company.com or @username',
      typeLabel: 'Project Format',
      typeOptions: [
        'Motion & 3D Creatives (TikTok / Reels)',
        'AI Creatives & Generative Visuals (Flow / Gemini / Argon)',
        'Promo Landing Page (Tilda / Readymag)',
        'Digital Illustration & Ad Banners',
        'Full-Cycle Campaign / Full-Time Role',
      ],
      messageLabel: 'Project Goals & Scope *',
      messagePlaceholder: 'What product are we promoting, and what deliverables do you need?',
      submitBtn: 'Send Inquiry to Diana',
      successTitle: 'Your brief is ready to send!',
      successBodyPart1: 'Thank you,',
      successBodyPart2: 'Your inquiry regarding',
      successBodyPart3: 'is ready. Diana will get back to you at',
      openMailClientBtn: 'Open in Email Client',
      doneBtn: 'Done',
      errors: {
        name: 'Please enter your name (at least 2 characters).',
        contact: 'Please enter a valid Email, @telegram handle, or phone number.',
        message: 'Please briefly describe your project (at least 10 characters).',
      },
    },
    rabbitHoles: [
      {
        id: 'rh-3d',
        index: '01',
        title: '3D Objects & Models',
        subtitle: 'Polyhedron / polygon mesh',
        quote: '“I spin, sculpt, and render volume so tactile you want to touch the screen.”',
        shapeType: 'polyhedron',
        accentColor: '#FF4D2D',
        yOffset: -24,
        details: 'Tactile shading, studio rim light, parallax, and 3D primitives integrated into motion ads.',
      },
      {
        id: 'rh-alight',
        index: '02',
        title: 'Alight Motion & Vector',
        subtitle: 'TikTok / Reels timeline & curves',
        quote: '“Masks, layers, velocity graphs, and transitions — this is where rhythm is born.”',
        shapeType: 'smartphone',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Custom cubic-bezier easing curves, beat-matched cuts, vector & frame-by-frame 2D animation.',
      },
      {
        id: 'rh-illustration',
        index: '03',
        title: 'Digital Illustration',
        subtitle: 'Stylus, vector & palette',
        quote: '“I draw any custom asset, banner, or character from scratch when stock assets feel lifeless.”',
        shapeType: 'stylus',
        accentColor: '#FF4D2D',
        yOffset: -20,
        details: 'Original characters, storyboards, bold composition, and signature brand color accents.',
      },
      {
        id: 'rh-ai',
        index: '04',
        title: 'Flow, Claude, Gemini, Argon',
        subtitle: 'Glowing AI core & pipeline',
        quote: '“Prompting as an art form: accelerating concept, texture, and backdrop generation by 5×.”',
        shapeType: 'aicore',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Consistent character generation, seamless textures, environments, and high-converting scripts.',
      },
      {
        id: 'rh-psychology',
        index: '05',
        title: 'Ad Psychology & CTR',
        subtitle: 'Attention magnet & CTR meter',
        quote: '“You have exactly 3 seconds before a viewer swipes away. I know how to win them.”',
        shapeType: 'magnet',
        accentColor: '#FF4D2D',
        yOffset: -22,
        details: '5 years of live commercial sales translated into visual hooks that overcome buyer objections.',
      },
      {
        id: 'rh-web',
        index: '06',
        title: 'Tilda & Readymag',
        subtitle: 'Conversion landing builder',
        quote: '“Why send paid traffic nowhere when I can build a high-converting promo site right away?”',
        shapeType: 'browser',
        accentColor: '#C6FF00',
        yOffset: 20,
        details: 'Unified visual funnel: from the very first frame in Reels/TikTok to the lead form on the landing page.',
      },
    ],
    heartPillars: [
      {
        id: 'pillar-sales',
        stepLabel: '01 · Foundation',
        title: 'First — Sales & Psychology',
        artifactName: 'Brain / Target',
        artifactType: 'target-brain',
        description:
          '“5 years in real commercial sales taught me the main rule: ‘pretty design’ alone doesn’t pay the bills. I understand customer pain points, attention triggers, and objection handling.”',
        proofMetric: '5 Years in B2C/B2B Negotiations · Focus on ROMI & CTR',
      },
      {
        id: 'pillar-motion',
        stepLabel: '02 · Dynamics',
        title: 'Second — Motion, 3D & Visuals',
        artifactName: 'Orbital Camera',
        artifactType: 'orbit-camera',
        description:
          '“From storyboarding, 2D illustration, and 3D objects to fast-paced animation for TikTok, Reels, and Shorts. I run my own TikTok blog, so I feel platform trends at my fingertips.”',
        proofMetric: '2D/3D Motion · Personal TikTok Blog · Native Pacing',
      },
      {
        id: 'pillar-ai',
        stepLabel: '03 · Synthesis',
        title: 'And Now — AI & Full Cycle',
        artifactName: 'Glowing Prism',
        artifactType: 'ai-prism',
        description:
          '“Half artist. Half ‘what if we crossbreed this with a neural network?’. I deliver turnkey ad campaigns: from generating AI assets to building high-CTR landing pages.”',
        proofMetric: 'Flow · Claude · Gemini · Argon · Tilda & Readymag',
      },
    ],
    timelineMilestones: [
      {
        id: 'tm-2019',
        period: '2019 — 2024',
        title: 'School of Real-World Sales',
        role: 'Sales Specialist / Commercial Representative',
        description:
          '5 years of live negotiations, product presentations, and closing deals. Learned buyer psychology from the inside out — now the secret weapon behind my ad creatives.',
        highlightTag: 'Buyer Psychology',
      },
      {
        id: 'tm-2023',
        period: '2023',
        title: 'Leap into Motion & Digital Art',
        role: 'Entering Design & Animation',
        description:
          'Combined offer framing with digital illustration, 2D animation in Alight Motion, and 3D model integration.',
        highlightTag: 'Alight Motion & 3D',
      },
      {
        id: 'tm-2024',
        period: '2024 — 2025',
        title: 'Full-Cycle Production & Web',
        role: 'From Video Hook to Lead',
        description:
          'Started owning the entire visual funnel for brands: custom asset illustration → motion ad production → conversion landing pages (Tilda, Readymag).',
        highlightTag: 'Full-Cycle & Web',
      },
      {
        id: 'tm-2026',
        period: '2026 — Present',
        title: 'AI Acceleration, 3D & TikTok',
        role: 'Junior Creative & Motion Designer / AI Visual Specialist',
        description:
          'Integrated Flow, Claude, Gemini, and Argon into my daily pipeline. Based in Germany, growing my personal TikTok and crafting visuals that hold attention and win clicks.',
        highlightTag: 'AI Pipeline · Germany',
      },
    ],
    processLoopSteps: [
      {
        id: 'loop-1',
        stepNumber: '01',
        title: 'Decode Audience Trigger',
        caption: 'Analyze pain points, objections & scroll patterns for the first 3 seconds',
      },
      {
        id: 'loop-2',
        stepNumber: '02',
        title: 'Generate Concept (AI + 3D/2D)',
        caption: 'Storyboarding, asset generation in Flow / Gemini / Argon & custom illustration',
      },
      {
        id: 'loop-3',
        stepNumber: '03',
        title: 'Animate the Visual Hook',
        caption: 'Layers, masks, velocity curves & 3D objects in Alight Motion',
      },
      {
        id: 'loop-4',
        stepNumber: '04',
        title: 'Package into a Promo Landing',
        caption: 'Build a Tilda / Readymag landing page that seamlessly continues the video hook',
      },
      {
        id: 'loop-5',
        stepNumber: '05',
        title: 'Repeat & Scale',
        caption: 'A/B test creative bundles, measure CTR & 3s hold rate up to the final lead',
      },
    ],
    projects: [
      {
        id: 'case-01',
        number: '01',
        codeTitle: '01 / Motion · 3D · TikTok Ads',
        title: 'Dynamic 3D & Vector Ad Creative Bundle',
        subtitle: 'Performance motion design for e-commerce & digital products',
        description:
          'Full production cycle: from scripting and the first 3-second hook to vector and 3D animation. Tactile 3D primitives and sharp velocity curves stop the scroll in TikTok and Reels feeds.',
        categoryKeys: ['motion3d', 'reels'],
        image: '/src/assets/images/case_motion_3d_ads_1793833483290.jpg',
        metrics: {
          ctr: '3.8% CTR',
          retention3s: '74% Hold Rate (3s)',
          outcome: '-38% Cost Per Click (CPC) in A/B tests',
        },
        tools: ['Alight Motion', '3D Models & Shaders', 'Vector Rigging', 'Sound Design'],
        hookFormula:
          'Tactile 3D trigger (0–1.5s) → Velocity curve camera shift → Clear value offer.',
        pipelineSteps: [
          'Audience pain-point breakdown and visual anchor selection for the first 3 seconds',
          '3D scene assembly and multi-layer alpha channel rendering',
          'Dynamic compositing in Alight Motion: masks, graph editor velocity curves & kinetic type',
        ],
        deliverables: 'Pack of 6 vertical 9:16 video ads + 4:5 and 1:1 resizes',
      },
      {
        id: 'case-02',
        number: '02',
        codeTitle: '02 / AI Visuals · Concept Art',
        title: 'Generative Brand Production (Flow + Gemini + Argon)',
        subtitle: 'AI Art Direction, custom textures & hybrid layer animation',
        description:
          'Creation of bespoke environments, textures, and characters followed by manual paint-over and layer animation in Alight Motion. 5× faster concepting with full artistic control.',
        categoryKeys: ['ai', 'motion3d', 'reels'],
        image: '/src/assets/images/case_ai_visuals_art_1793833485735.jpg',
        metrics: {
          ctr: '4.2% CTR',
          retention3s: '81% Hold Rate (3s)',
          outcome: '5× faster visual production speed',
        },
        tools: ['Flow', 'Gemini', 'Claude', 'Argon', 'Alight Motion', 'Digital Paint'],
        hookFormula:
          'Surreal visual paradox (AI + manual composite) → Multi-plane parallax → Brand packshot.',
        pipelineSteps: [
          'Matrix prompt engineering in Claude & Gemini for consistent lighting and lens aesthetics',
          'Scene generation in Flow & Argon separated into foreground, midground, and background planes',
          'Manual stylus retouching and multi-layer parallax animation in Alight Motion',
        ],
        deliverables: '12 generative key visuals + 4 animated storytelling reels',
      },
      {
        id: 'case-03',
        number: '03',
        codeTitle: '03 / Web Design · Conversion',
        title: 'High-Converting Campaign Promo Landing (Readymag / Tilda)',
        subtitle: 'Unified funnel: from video ad hook to lead submission',
        description:
          'Architecture built around real sales triggers, custom graphics, and frictionless lead capture. Zero visual disconnect between the TikTok/Reels ad and the destination page.',
        categoryKeys: ['landings'],
        image: '/src/assets/images/case_web_conversion_1793833487211.jpg',
        metrics: {
          ctr: '6.4% Lead CR',
          retention3s: '2m 15s Avg. Dwell',
          outcome: '+62% conversion lift vs. previous landing page',
        },
        tools: ['Readymag', 'Tilda Zero Block', 'Custom Graphics', 'Sales Copywriting'],
        hookFormula:
          'Mirror the video hook above the fold → Resolve top 3 buyer objections → 1-step form.',
        pipelineSteps: [
          'Marketing wireframe structured on 5 years of commercial sales insights',
          'Bespoke illustrations and 3D accents tailored to the editorial grid',
          'Scroll micro-interactions and mobile-first optimization for TikTok/Reels traffic',
        ],
        deliverables: 'Turnkey responsive promo website + form & analytics integration',
      },
      {
        id: 'case-04',
        number: '04',
        codeTitle: '04 / Digital Illustration & Hooks',
        title: 'Ad Banner Series & Animated Social Stories',
        subtitle: 'Bespoke illustration, color psychology, composition & retention',
        description:
          'Custom digital illustration, color contrast, and visual storytelling. When generic stock photos trigger banner blindness, bold bespoke art breaks through the feed instantly.',
        categoryKeys: ['reels', 'ai'],
        image: '/src/assets/images/case_digital_illustration_1793833487314.jpg',
        metrics: {
          ctr: '3.5% CTR',
          retention3s: '69% Story Completion',
          outcome: '0% stock clichés · 100% brand recall',
        },
        tools: ['Digital Illustration', 'Alight Motion', 'Color Theory', 'Storyboarding'],
        hookFormula:
          'High-contrast focal accent (#FF4D2D) → Character gaze/line guiding to offer → Clear CTA.',
        pipelineSteps: [
          'Sketching and high-contrast color scripting aligned with brand identity',
          'Clean vector and raster rendering of hero characters and props',
          'Frame-by-frame and layered motion accents for Stories and Reels formats',
        ],
        deliverables: 'Suite of 15 static and animated social ad creatives',
      },
    ],
    competencies: [
      {
        id: 'comp-motion',
        number: '01',
        title: 'Ad Motion & 3D',
        description:
          'Dynamic creatives for TikTok, Reels, Shorts; working with 3D objects and models; vector and frame-by-frame 2D animation, masks, layers, and transitions in Alight Motion.',
        keywords: 'TikTok · Reels · Shorts · 3D Models · Alight Motion · 2D Vector',
      },
      {
        id: 'comp-illust',
        number: '02',
        title: 'Digital Illustration',
        description:
          'Drawing custom assets, banners, and visual hooks from scratch with strong composition and color theory. Distinct brand visuals without stock templates.',
        keywords: 'Custom Assets · Visual Hooks · Storyboarding · Color & Composition',
      },
      {
        id: 'comp-ai',
        number: '03',
        title: 'AI Tools & Prompting',
        description:
          'Generating and refining commercial visuals, textures, and scripts (Flow, Claude, Gemini, Argon). 5× faster creative production.',
        keywords: 'Flow · Claude · Gemini · Argon · Prompt Engineering',
      },
      {
        id: 'comp-web',
        number: '04',
        title: 'Conversion Web Design',
        description:
          'Building high-converting landing pages and promo sites (Tilda, Readymag & equivalents). Designing the full user journey from ad click to lead.',
        keywords: 'Tilda · Readymag · Promo Landings · Mobile-First UX',
      },
      {
        id: 'comp-sales',
        number: '05',
        title: 'Advertising Psychology',
        description:
          '5 years of real sales experience, audience triggers, strong offers, attention retention, and CTR growth. Knowing how visuals drive commercial decisions.',
        keywords: '5 Years Sales · Attention Triggers · High CTR · Offer Framing',
      },
    ],
    languages: [
      { code: 'UA', name: 'Ukrainian', level: 'Native' },
      { code: 'RU', name: 'Russian', level: 'Fluent' },
      { code: 'DE', name: 'German', level: 'A2' },
      { code: 'EN', name: 'English', level: 'A2' },
    ],
  },

  // ===========================================================================
  // GERMAN (DEUTSCH)
  // ===========================================================================
  de: {
    metaTitle: 'Diana Palii — Anatomie einer kreativen Motion-Designerin',
    nav: {
      brandName: 'Diana Palii',
      mind: 'kopf',
      works: 'projekte',
      resume: 'lebenslauf',
      tiktok: 'tiktok',
      lightMode: 'skizzenbuch hell',
      darkMode: 'showreel dunkel',
      lightAria: 'Zum hellen Skizzenbuch-Modus wechseln',
      darkAria: 'Zum dunklen Showreel-Modus wechseln',
      cta: 'projekt anfragen',
      mobileThemePrefix: 'Design',
    },
    hero: {
      statusOpen: 'Offen für Projekte',
      location: 'Deutschland (DE / EU / Remote)',
      specialty: 'Visual Ads & Motion',
      headlinePart1: 'die anatomie einer ',
      headlineItalic: 'kreativen',
      headlinePart2: 'motion-designerin.',
      subtitle: 'Eine fast exakte Karte von allem, was in meinem Kopf vorgeht.',
      subtitleAside: '(oder einfacher gesagt — willkommen in meinem Portfolio :)',
      ctaWorks: '[projekte ansehen]',
      ctaContact: '[schreib mir]',
      ctaDive: 'in meinen kopf eintauchen',
      knotLabel: 'Abb. 01 — Ideenknäuel im Kopf',
      knotPulseBtn: 'impuls senden',
      knotThreadArrow: 'roter faden →',
      miniNodes: {
        cube: '3D-Objekt: greifbares Volumen, Shader & Licht, die den Blick in 0,5 Sek. fesseln.',
        keyframe: 'Keyframe: präzise Geschwindigkeitskurven (Cubic-Bezier) & Alight Motion Rhythmus.',
        ai: 'KI-Funke: generative Pipeline mit Flow + Claude + Gemini + Argon (5× schneller).',
      },
      metrics: {
        m1Val: '3 Sek.',
        m1Label: 'Aufmerksamkeits-Hook vor dem Weiterwischen bei TikTok & Reels',
        m2Val: '5× schneller',
        m2Label: 'Konzept- & Asset-Generierung (Flow · Claude · Gemini · Argon)',
        m3Val: '5 Jahre',
        m3Label: 'Erfahrung im echten Vertrieb & Verkaufspsychologie',
        m4Val: '360° Zyklus',
        m4Label: '2D/3D Motion + Illustration + Promo-Landingpage (Tilda/Readymag)',
      },
    },
    story: {
      threadLabel: 'DER ROTE FADEN',
      threadHint: 'Nach unten scrollen — die Kamera gleitet nach rechts entlang des Fadens',
      tab1: '01. Kaninchenbauten',
      tab2: '02. Mein Fundament',
      tab3: '03. Zeitstrahl 2019–2026',
      nodePrefix: 'knoten',
      activeNodeLabel: 'Aktiver 3D-Knoten:',
      scrollBelowHint: 'Weiter scrollen für „Prozess-Schleife“ und Case Studies ↓',
      scene1: {
        kicker: 'Szene 01 · Meine Kaninchenbauten',
        headlineBold: 'Ich arbeite an der Schnittstelle der Formate.',
        headlineNormal: 'Ein-Frau-Orchester in der visuellen Werbung?',
        subheadItalic: 'Eine schöne Art zu sagen, dass ich es liebe, kopfüber in kreative Kaninchenbauten einzutauchen.',
      },
      scene2: {
        kicker: 'Szene 02 · Was mein Herz erobert hat',
        headlinePart1: 'aber drei Dinge sind mein ',
        headlineItalic: 'wichtigstes Fundament.',
        accentPrefix: '3D-Akzent:',
      },
      scene3: {
        kicker: 'Szene 03 · Zeitstrahl am Faden',
        headlinePart1: 'irgendwie lande ich immer bei... ',
        headlineItalic: 'Ergebnis & Conversion.',
      },
    },
    loop: {
      kicker: 'Übergang zum vertikalen Scroll · Meine Prozess-Schleife (The Loop)',
      headlinePart1: 'offenbar kann ich einfach kein Design ',
      headlineItalic: '„nur für die Statistik“ machen.',
      cycleBtn: 'takt weiterdrehen',
      leadIn: 'Genug Autobiografie. Schauen wir uns an, was dabei herauskommt.',
      ctaWorks: '[projekte ansehen ↓]',
    },
    works: {
      kicker: '07 · Ausgewählte Arbeiten (Selected Work)',
      headlinePart1: 'Projekte, bei denen Visuals ',
      headlineItalic: 'für hohe CTR sorgen.',
      filterAria: 'Projekte nach Kategorie filtern',
      categories: {
        all: 'Alle',
        motion3d: 'Motion & 3D',
        ai: 'KI-Creatives',
        reels: 'Reels / TikTok',
        landings: 'Promo-Landings',
      },
      reelActive: 'REEL VORSCHAU · 60 FPS',
      reelHover: 'HOVER / KLICK VORSCHAU',
      hookFormulaLabel: 'Hook-Formel:',
      outcomeLabel: 'Ergebnis:',
      caseDetailsBtn: 'case-analyse',
      tiktokKicker: 'TikTok Influencer · Visuelles Storytelling aus erster Hand',
      tiktokTitle: 'Ich kenne Algorithmen nicht nur aus der Theorie — ich führe meinen eigenen TikTok-Blog.',
      tiktokDesc:
        'Ich teste Retention-Hooks, Sound-Trigger, KI-Übergänge und Schnittrhythmen live an einer echten Community. Das gibt Marken einen nativen Look, der nicht wie ein langweiliges Werbebanner wirkt.',
      tiktokCta: 'Reels / TikTok Paket anfragen',
      moreRabbitHolesBtn: 'Mehr Kaninchenbauten (Vollständiger Lebenslauf & Stack) →',
      modal: {
        closeAria: 'Case-Analyse schließen',
        ctrLabel: 'Klickrate (CTR)',
        retentionLabel: 'Haltequote',
        effectLabel: 'Effekt',
        stagesTitle: 'Produktionsschritte:',
        deliverablesPrefix: 'Lieferumfang:',
        wantSimilarBtn: 'ähnliches Projekt anfragen',
      },
    },
    resume: {
      kicker: '08 · Vollständiger Lebenslauf / Kompetenz-Anatomie (Für Recruiter & Kunden)',
      headlinePart1: 'Erfahrungsstruktur & ',
      headlineItalic: 'Tool-Stack.',
      previewBtn: 'Druckversion des CV öffnen',
      downloadBtn: 'CV herunterladen (PDF / TXT)',
      downloadedBtn: 'CV gespeichert!',
      summaryKicker: 'Über mich · Kurzprofil',
      summaryTitle:
        'Kreative Spezialistin für visuelle Werbung, 2D/3D Motion Design und Generative Art.',
      summaryBody:
        'Ich erstelle Full-Cycle-Content: von der Idee, dem Storyboard und der Illustration bis zur Animation und dem Aufbau konvertierender Promo-Landingpages. Durch die Kombination aus 5 Jahren Vertriebserfahrung und moderner KI-Pipeline arbeitet jedes Bild für Retention und Conversion.',
      summaryLocation: 'Deutschland',
      educationLabel: 'Ausbildung',
      educationTitle: 'Unternehmertum, Handel und Börsenwesen',
      educationBody:
        'Qualifikation: Handelsvertreterin. Solides Fundament in Produktökonomie, Verkaufspsychologie und überzeugender Angebotskommunikation.',
      languagesLabel: 'Sprachen',
      competencyPrefix: 'Kompetenz',
      cvModal: {
        roleLine: 'Junior Creative & Motion Designer · AI Visual Specialist · TikTok Influencer',
        locationLine: 'Deutschland · dianapaliij@gmail.com · Offen für Projekte & Festanstellung',
        historyTitle: 'Berufserfahrung & Meilensteine',
        downloadTxtBtn: 'Lebenslauf herunterladen (.txt)',
        printPdfBtn: 'Drucken / Als PDF speichern',
        closeAria: 'Lebenslauf schließen',
      },
    },
    footer: {
      dragBadge: 'drag / Sticker ziehen',
      bubbleIdle: '„Zieh meinen Sticker mit der Maus oder klick auf den Feder-Button!“',
      bubblePulled: '„Hey, vorsichtig mit den Ebenen! Schreib mir lieber eine E-Mail :)“',
      pullBtn: 'Sticker an der Feder ziehen',
      kicker: '09 · Finale („Wer hat sich das alles ausgedacht?“)',
      headlinePart1: 'wer hat das gemacht? ',
      headlineItalic: 'oh, hallo. ich bin Diana.',
      line1: 'immer noch auf der Suche nach dem perfekten Frame.',
      line2: 'immer noch beim Testen neuer neuronaler Netze.',
      line3: 'weiß immer noch, wie man eine Idee in 3 Sekunden verkauft.',
      line4Bold: 'lass uns Visuals schaffen, an denen das Internet garantiert nicht vorbeiscrollt.',
      emailHint: 'Direkte E-Mail (klicken zum Kopieren mit 1 Klick)',
      emailCopied: 'E-Mail dianapaliij@gmail.com in die Zwischenablage kopiert!',
      briefBtn: 'Mini-Briefing ausfüllen',
      locationText: 'Standort: Deutschland',
      funFact:
        '„5 Jahre lang Produkte live verkauft — heute verkaufe ich Ideen durch Pixel, 3D und KI“.',
    },
    brief: {
      kicker: 'Kontakt zu Diana · dianapaliij@gmail.com',
      title: 'Projekt besprechen',
      closeAria: 'Projekt-Formular schließen',
      nameLabel: 'Ihr Name *',
      namePlaceholder: 'z. B. Anna / Brand Managerin',
      contactLabel: 'E-Mail oder @telegram für die Antwort *',
      contactPlaceholder: 'name@firma.de oder @username',
      typeLabel: 'Projektformat',
      typeOptions: [
        'Motion & 3D Creatives (TikTok / Reels)',
        'KI-Creatives & Generative Visuals (Flow / Gemini / Argon)',
        'Promo-Landingpage (Tilda / Readymag)',
        'Digitale Illustration & Werbebanner',
        'Full-Cycle Kampagne / Jobangebot',
      ],
      messageLabel: 'Kurzbeschreibung & Ziele *',
      messagePlaceholder: 'Welches Produkt bewerben wir und welche Formate werden benötigt?',
      submitBtn: 'Anfrage an Diana senden',
      successTitle: 'Ihre Anfrage ist versandbereit!',
      successBodyPart1: 'Vielen Dank,',
      successBodyPart2: 'Ihre Anfrage zum Thema',
      successBodyPart3: 'wurde erfasst. Diana meldet sich unter',
      openMailClientBtn: 'Im E-Mail-Programm öffnen',
      doneBtn: 'Fertig',
      errors: {
        name: 'Bitte geben Sie Ihren Namen an (mind. 2 Zeichen).',
        contact: 'Bitte geben Sie eine gültige E-Mail, @telegram oder Telefonnummer an.',
        message: 'Bitte beschreiben Sie Ihr Projekt kurz (mind. 10 Zeichen).',
      },
    },
    rabbitHoles: [
      {
        id: 'rh-3d',
        index: '01',
        title: '3D-Objekte & Modelle',
        subtitle: 'Polyeder / Polygonnetz',
        quote: '„Ich drehe, forme und rendere Volumen so plastisch, dass man den Bildschirm berühren möchte.“',
        shapeType: 'polyhedron',
        accentColor: '#FF4D2D',
        yOffset: -24,
        details: 'Taktiles Shading, weiches Studiolicht, Parallaxe und 3D-Primitive für Performance-Ads.',
      },
      {
        id: 'rh-alight',
        index: '02',
        title: 'Alight Motion & Vektor',
        subtitle: 'TikTok / Reels Timeline & Kurven',
        quote: '„Masken, Ebenen, Geschwindigkeitskurven und Übergänge — hier entsteht Dynamik.“',
        shapeType: 'smartphone',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Präzise Easing-Kurven (Cubic-Bezier), rhythmischer Schnitt & 2D-Vektoranimation.',
      },
      {
        id: 'rh-illustration',
        index: '03',
        title: 'Digitale Illustration',
        subtitle: 'Stylus, Vektor & Palette',
        quote: '„Ich zeichne jedes Asset, Banner oder Charakter komplett neu, wenn Stockfotos langweilen.“',
        shapeType: 'stylus',
        accentColor: '#FF4D2D',
        yOffset: -20,
        details: 'Eigene Charaktere, Storyboards, starke Komposition und markante Farbwelten.',
      },
      {
        id: 'rh-ai',
        index: '04',
        title: 'Flow, Claude, Gemini, Argon',
        subtitle: 'Leuchtender KI-Kern & Pipeline',
        quote: '„Prompting als Kunstform: ich beschleunige Konzept-, Textur- und Hintergrund-Generierung um das 5-fache.“',
        shapeType: 'aicore',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Konsistente Charaktergenerierung, nahtlose Texturen, Welten und verkaufsstarke Skripte.',
      },
      {
        id: 'rh-psychology',
        index: '05',
        title: 'Werbepsychologie',
        subtitle: 'Aufmerksamkeits-Magnet & CTR',
        quote: '„Du hast genau 3 Sekunden, bevor der Zuschauer weiterscrollt. Ich weiß, wie man sie gewinnt.“',
        shapeType: 'magnet',
        accentColor: '#FF4D2D',
        yOffset: -22,
        details: '5 Jahre echter Vertrieb übersetzt in visuelle Hooks, die Einwände sofort lösen.',
      },
      {
        id: 'rh-web',
        index: '06',
        title: 'Tilda & Readymag',
        subtitle: 'Conversion-Landingpage-Baukasten',
        quote: '„Warum Traffic ins Leere schicken, wenn ich direkt eine konvertierende Promo-Seite bauen kann?“',
        shapeType: 'browser',
        accentColor: '#C6FF00',
        yOffset: 20,
        details: 'Nahtlose visuelle Kette: vom ersten Frame in Reels/TikTok bis zum Formular auf der Landingpage.',
      },
    ],
    heartPillars: [
      {
        id: 'pillar-sales',
        stepLabel: '01 · Fundament',
        title: 'Zuerst — Vertrieb & Psychologie',
        artifactName: 'Gehirn / Zielscheibe',
        artifactType: 'target-brain',
        description:
          '„5 Jahre im echten kommerziellen Vertrieb haben mich das Wichtigste gelehrt: nur ‚schönes Design‘ bezahlt keine Rechnungen. Ich verstehe Kundenbedürfnisse, Aufmerksamkeitstrigger und Einwandbehandlung.“',
        proofMetric: '5 Jahre B2C/B2B Verhandlungen · Fokus auf ROMI & CTR',
      },
      {
        id: 'pillar-motion',
        stepLabel: '02 · Dynamik',
        title: 'Dann — Motion, 3D & Visuals',
        artifactName: 'Kamera im Orbit',
        artifactType: 'orbit-camera',
        description:
          '„Vom Storyboard über 2D-Illustration und 3D-Objekte bis zu dynamischer Animation für TikTok, Reels und Shorts. Ich führe meinen eigenen TikTok-Blog und spüre Trends sofort.“',
        proofMetric: '2D/3D Motion · Eigener TikTok-Blog · Trendgespür',
      },
      {
        id: 'pillar-ai',
        stepLabel: '03 · Synthese',
        title: 'Und jetzt — KI & Full-Cycle',
        artifactName: 'Leuchtendes Prisma',
        artifactType: 'ai-prism',
        description:
          '„Halb Künstlerin. Halb ‚was wäre, wenn wir das mit einem neuronalen Netz kreuzen?‘. Ich erstelle schlüsselfertige Werbung: von KI-Assets bis zu Landingpages mit hoher CTR.“',
        proofMetric: 'Flow · Claude · Gemini · Argon · Tilda & Readymag',
      },
    ],
    timelineMilestones: [
      {
        id: 'tm-2019',
        period: '2019 — 2024',
        title: 'Schule des echten Vertriebs',
        role: 'Vertriebsspezialistin / Handelsvertreterin',
        description:
          '5 Jahre Live-Verhandlungen, Produktpräsentationen und Abschlüsse. Käuferpsychologie von innen gelernt — heute die Geheimwaffe meiner Werbe-Creatives.',
        highlightTag: 'Käuferpsychologie',
      },
      {
        id: 'tm-2023',
        period: '2023',
        title: 'Sprung in Motion & Digital Art',
        role: 'Einstieg in Design & Animation',
        description:
          'Verbindung von starken Angeboten mit digitaler Illustration, 2D-Animation in Alight Motion und der Arbeit mit 3D-Modellen.',
        highlightTag: 'Alight Motion & 3D',
      },
      {
        id: 'tm-2024',
        period: '2024 — 2025',
        title: 'Full-Cycle-Produktion & Web',
        role: 'Vom Video bis zum Lead',
        description:
          'Übernahme der gesamten Kette für Marken: Asset-Illustration → Creative-Animation → konvertierende Landingpages (Tilda, Readymag).',
        highlightTag: 'Full-Cycle & Web',
      },
      {
        id: 'tm-2026',
        period: '2026 — Heute',
        title: 'KI-Beschleunigung, 3D & TikTok',
        role: 'Junior Creative & Motion Designer / AI Visual Specialist',
        description:
          'Flow, Claude, Gemini und Argon in die tägliche Pipeline integriert. Ich lebe in Deutschland, baue mein TikTok aus und gestalte Creatives, die Blicke fesseln und Klicks bringen.',
        highlightTag: 'KI-Pipeline · Deutschland',
      },
    ],
    processLoopSteps: [
      {
        id: 'loop-1',
        stepNumber: '01',
        title: 'Zielgruppen-Trigger verstehen',
        caption: 'Schmerzpunkte, Einwände & Scroll-Muster für die ersten 3 Sekunden analysieren',
      },
      {
        id: 'loop-2',
        stepNumber: '02',
        title: 'Konzept generieren (KI + 3D/2D)',
        caption: 'Storyboard, Asset-Generierung in Flow / Gemini / Argon & eigene Illustration',
      },
      {
        id: 'loop-3',
        stepNumber: '03',
        title: 'Packenden Hook animieren',
        caption: 'Ebenen, Masken, Geschwindigkeitskurven & 3D-Objekte in Alight Motion',
      },
      {
        id: 'loop-4',
        stepNumber: '04',
        title: 'In Promo-Landingpage verpacken',
        caption: 'Aufbau einer Tilda / Readymag Seite, die den Look des Videos nahtlos fortsetzt',
      },
      {
        id: 'loop-5',
        stepNumber: '05',
        title: 'Wiederholen & Skalieren',
        caption: 'A/B-Testing der Creative-Kombinationen, Messung von CTR & Retention bis zum Lead',
      },
    ],
    projects: [
      {
        id: 'case-01',
        number: '01',
        codeTitle: '01 / Motion · 3D · TikTok Ads',
        title: 'Dynamisches Video-Creative-Paket mit 3D-Objekten',
        subtitle: 'Performance-Motion für E-Commerce und digitale Produkte',
        description:
          'Kompletter Zyklus: vom Skript und dem 3-Sekunden-Hook bis zur Vektor- und 3D-Animation. Taktile 3D-Primitive und präzise Geschwindigkeitskurven stoppen den Scroll im Feed.',
        categoryKeys: ['motion3d', 'reels'],
        image: '/src/assets/images/case_motion_3d_ads_1793833483290.jpg',
        metrics: {
          ctr: '3.8% CTR',
          retention3s: '74% Hold Rate (3s)',
          outcome: '-38% Klickpreis (CPC) in Kampagnentests',
        },
        tools: ['Alight Motion', '3D Models & Shaders', 'Vector Rigging', 'Sound Design'],
        hookFormula:
          'Taktiler 3D-Trigger (0–1,5s) → Perspektivwechsel per Kurve → Klares Angebot.',
        pipelineSteps: [
          'Analyse der Zielgruppen-Schmerzpunkte und Wahl des visuellen Ankers für die ersten 3 Sekunden',
          'Aufbau der 3D-Komposition und Export von Render-Layern mit Alphakanal',
          'Dynamik in Alight Motion: Masken, Kurven-Editor und kinetische Typografie',
        ],
        deliverables: 'Serie aus 6 vertikalen 9:16 Video-Ads + 4:5 und 1:1 Resizes',
      },
      {
        id: 'case-02',
        number: '02',
        codeTitle: '02 / AI Visuals · Concept Art',
        title: 'Generative Markenproduktion (Flow + Gemini + Argon)',
        subtitle: 'KI-Art-Direction, individuelle Texturen & hybride Animation',
        description:
          'Erstellung einzigartiger Hintergründe, Texturen und Charaktere mit anschließender manueller Veredelung und Animation in Alight Motion. 5× schnellere Konzeptphase.',
        categoryKeys: ['ai', 'motion3d', 'reels'],
        image: '/src/assets/images/case_ai_visuals_art_1793833485735.jpg',
        metrics: {
          ctr: '4.2% CTR',
          retention3s: '81% Hold Rate (3s)',
          outcome: '5× schnellere Visual-Produktion',
        },
        tools: ['Flow', 'Gemini', 'Claude', 'Argon', 'Alight Motion', 'Digital Paint'],
        hookFormula:
          'Surreales visuelles Paradoxon (KI + Compositing) → Sanfte Ebenen-Parallaxe → Packshot.',
        pipelineSteps: [
          'Entwicklung strukturierter Prompts in Claude & Gemini für einheitliche Licht- und Optik-Ästhetik',
          'Generierung der Basisszenen in Flow & Argon getrennt nach Vorder-, Mittel- und Hintergrund',
          'Manuelle Retusche mit dem Stylus und Parallaxe-Animation der Ebenen in Alight Motion',
        ],
        deliverables: '12 generative Key-Visuals + 4 animierte Storytelling-Reels',
      },
      {
        id: 'case-03',
        number: '03',
        codeTitle: '03 / Web Design · Conversion',
        title: 'Konvertierende Promo-Landingpage (Readymag / Tilda)',
        subtitle: 'Einheitlicher Funnel: vom Werbe-Hook bis zur Anfrage',
        description:
          'Strukturdesign auf Basis von Verkaufstriggern, individueller Grafik und hoher Conversion-Rate. Kein Bruch zwischen dem Werbevideo und der Zielseite.',
        categoryKeys: ['landings'],
        image: '/src/assets/images/case_web_conversion_1793833487211.jpg',
        metrics: {
          ctr: '6.4% Lead-CR',
          retention3s: '2m 15s Verweildauer',
          outcome: '+62% mehr Conversions gegenüber der alten Seite',
        },
        tools: ['Readymag', 'Tilda Zero Block', 'Custom Graphics', 'Sales Copywriting'],
        hookFormula:
          'Wiederholung des Video-Hooks im Hero → Lösung der 3 Haupteinwände → Einfaches Formular.',
        pipelineSteps: [
          'Marketing-Prototyping auf Basis von 5 Jahren echter Verkaufserfahrung',
          'Erstellung individueller Illustrationen und 3D-Akzente passend zum Seitenraster',
          'Umsetzung mit Scroll-Mikroanimationen und Mobile-First-Optimierung für TikTok/Reels-Traffic',
        ],
        deliverables: 'Schlüsselfertige responsive Promo-Website + Formular- & Analyse-Integration',
      },
      {
        id: 'case-04',
        number: '04',
        codeTitle: '04 / Digital Illustration & Hooks',
        title: 'Werbebanner-Serie & animierte Social-Stories',
        subtitle: 'Autoren-Illustration, Farbpsychologie, Komposition & Retention',
        description:
          'Illustration, Farbkomposition und Aufmerksamkeitssteuerung. Wenn Stockfotos Bannerblindheit auslösen, durchbricht individuelle Grafik sofort den Feed.',
        categoryKeys: ['reels', 'ai'],
        image: '/src/assets/images/case_digital_illustration_1793833487314.jpg',
        metrics: {
          ctr: '3.5% CTR',
          retention3s: '69% Story-Abschlussrate',
          outcome: '0% Stock-Klischees · 100% Wiedererkennung',
        },
        tools: ['Digital Illustration', 'Alight Motion', 'Color Theory', 'Storyboarding'],
        hookFormula:
          'Kontrastreicher Farbakzent (#FF4D2D) → Dynamische Blickführung zum Angebot → Call-to-Action.',
        pipelineSteps: [
          'Skizzierung und kontrastreiches Farbkonzept passend zum Marken-Guideline',
          'Reinzeichnung von Vektor- und Raster-Objekten sowie Charakteren',
          'Einzelbild- und Ebenen-Akzentuierung für Stories- und Reels-Formate',
        ],
        deliverables: 'Paket aus 15 statischen und animierten Social-Media-Creatives',
      },
    ],
    competencies: [
      {
        id: 'comp-motion',
        number: '01',
        title: 'Werbe-Motion & 3D',
        description:
          'Dynamische Creatives für TikTok, Reels, Shorts; Arbeit mit 3D-Objekten und Modellen; Vektor- und Einzelbild-2D-Animation, Masken, Ebenen und Übergänge in Alight Motion.',
        keywords: 'TikTok · Reels · Shorts · 3D Models · Alight Motion · 2D Vector',
      },
      {
        id: 'comp-illust',
        number: '02',
        title: 'Digitale Illustration',
        description:
          'Zeichnen von individuellen Assets, Bannern und visuellen Hooks mit starker Komposition und Farbwirkung ohne Stock-Vorlagen.',
        keywords: 'Custom Assets · Visual Hooks · Storyboarding · Color & Composition',
      },
      {
        id: 'comp-ai',
        number: '03',
        title: 'KI-Tools & Prompting',
        description:
          'Generierung und Veredelung kommerzieller Visuals, Texturen und Skripte (Flow, Claude, Gemini, Argon). Vielfache Produktionsbeschleunigung.',
        keywords: 'Flow · Claude · Gemini · Argon · Prompt Engineering',
      },
      {
        id: 'comp-web',
        number: '04',
        title: 'Webdesign & Landings',
        description:
          'Aufbau konvertierender Landingpages und Promo-Websites (Tilda, Readymag u. Ä.). Gestaltung der Nutzerreise vom Werbeklick bis zum Lead.',
        keywords: 'Tilda · Readymag · Promo Landings · Mobile-First UX',
      },
      {
        id: 'comp-sales',
        number: '05',
        title: 'Werbepsychologie',
        description:
          '5 Jahre Vertriebserfahrung, Zielgruppen-Trigger, starke Angebote, Aufmerksamkeitsbindung und CTR-Steigerung.',
        keywords: '5 Years Sales · Attention Triggers · High CTR · Offer Framing',
      },
    ],
    languages: [
      { code: 'UA', name: 'Ukrainisch', level: 'Muttersprache' },
      { code: 'RU', name: 'Russisch', level: 'Fließend' },
      { code: 'DE', name: 'Deutsch', level: 'A2' },
      { code: 'EN', name: 'Englisch', level: 'A2' },
    ],
  },

  // ===========================================================================
  // RUSSIAN (РУССКИЙ)
  // ===========================================================================
  ru: {
    metaTitle: 'Диана Палий — Анатомия Креативного Моушн-Дизайнера',
    nav: {
      brandName: 'Диана Палий',
      mind: 'голова',
      works: 'работы',
      resume: 'резюме',
      tiktok: 'тикток',
      lightMode: 'светлый скетчбук',
      darkMode: 'темный шоурил',
      lightAria: 'Включить светлый режим скетчбука',
      darkAria: 'Включить темный режим кинозала',
      cta: 'обсудить проект',
      mobileThemePrefix: 'Тема',
    },
    hero: {
      statusOpen: 'Открыта к проектам',
      location: 'Германия (DE / EU / Remote)',
      specialty: 'Visual Ads & Motion',
      headlinePart1: 'анатомия ',
      headlineItalic: 'креативного',
      headlinePart2: 'моушн-дизайнера.',
      subtitle: 'Почти точная карта всего, что творится у меня в голове.',
      subtitleAside: '(или проще говоря — добро пожаловать в мое портфолио :)',
      ctaWorks: '[смотреть работы]',
      ctaContact: '[написать мне]',
      ctaDive: 'нырнуть в голову',
      knotLabel: 'Рис. 01 — Клубок идей в голове',
      knotPulseBtn: 'пустить импульс',
      knotThreadArrow: 'нить истории →',
      miniNodes: {
        cube: '3D-объект: тактильный объем, шейдеры и рендер, притягивающий взгляд за 0.5 сек.',
        keyframe: 'Ключевой кадр: плавные кривые скорости (cubic-bezier) и ритм Alight Motion.',
        ai: 'Искра AI: генеративный пайплайн Flow + Claude + Gemini + Argon (×5 к скорости).',
      },
      metrics: {
        m1Val: '3 сек',
        m1Label: 'удержание внимания до свайпа в TikTok и Reels',
        m2Val: '5× быстрее',
        m2Label: 'генерация концептов (Flow · Claude · Gemini · Argon)',
        m3Val: '5 лет',
        m3Label: 'бэкграунд в коммерческих продажах и психологии ЦА',
        m4Val: '360° цикл',
        m4Label: '2D/3D моушн + иллюстрация + промо-лендинг (Tilda/Readymag)',
      },
    },
    story: {
      threadLabel: 'НИТЬ ИСТОРИИ',
      threadHint: 'Скролльте вниз — камера плавно скользит вдоль нити вправо',
      tab1: '01. Кроличьи норы',
      tab2: '02. Что украло сердце',
      tab3: '03. Таймлайн 2019–2026',
      nodePrefix: 'узел',
      activeNodeLabel: 'Активный 3D-узел:',
      scrollBelowHint: 'Прокрутите ниже для перехода к «Петле процесса» и кейсам ↓',
      scene1: {
        kicker: 'Сцена 01 · Мои кроличьи норы',
        headlineBold: 'я работаю на стыке форматов.',
        headlineNormal: 'человек-оркестр в мире визуала?',
        subheadItalic: 'красивый способ сказать, что я обожаю нырять в кроличьи норы с головой.',
      },
      scene2: {
        kicker: 'Сцена 02 · Что украло мое сердце',
        headlinePart1: 'но три вещи — мой ',
        headlineItalic: 'главный фундамент.',
        accentPrefix: '3D-акцент:',
      },
      scene3: {
        kicker: 'Сцена 03 · Таймлайн на нити',
        headlinePart1: 'каким-то образом я всегда прихожу к... ',
        headlineItalic: 'результату и конверсии.',
      },
    },
    loop: {
      kicker: 'Переход в вертикальный скролл · Петля моего процесса (The Loop)',
      headlinePart1: 'кажется, я просто не умею делать дизайн ',
      headlineItalic: '«для галочки».',
      cycleBtn: 'прокрутить такт петли',
      leadIn: 'Хватит автобиографии. Давайте посмотрим, что из этого получается.',
      ctaWorks: '[смотреть проекты ↓]',
    },
    works: {
      kicker: '07 · Избранные работы (Selected Work)',
      headlinePart1: 'проекты, где визуал ',
      headlineItalic: 'работает на CTR.',
      filterAria: 'Фильтр проектов по категориям',
      categories: {
        all: 'Все',
        motion3d: 'Motion & 3D',
        ai: 'AI-Креативы',
        reels: 'Reels / TikTok',
        landings: 'Промо-лендинги',
      },
      reelActive: 'REEL PREVIEW · 60 FPS',
      reelHover: 'HOVER / CLICK PREVIEW',
      hookFormulaLabel: 'Формула хука:',
      outcomeLabel: 'Результат:',
      caseDetailsBtn: 'разбор кейса',
      tiktokKicker: 'TikTok Influencer · Визуальный сторителлинг от первого лица',
      tiktokTitle: 'Понимаю алгоритмы не в теории — веду собственный TikTok-блог.',
      tiktokDesc:
        'Тестирую форматы удержания, звуковые триггеры, нейросетевые переходы и ритм монтажа на живой аудитории. Это дает брендам нативную подачу, которая не выглядит как скучный рекламный баннер.',
      tiktokCta: 'заказать связку Reels / TikTok',
      moreRabbitHolesBtn: 'Больше кроличьих нор (Полное резюме и стек) →',
      modal: {
        closeAria: 'Закрыть разбор кейса',
        ctrLabel: 'Кликабельность',
        retentionLabel: 'Удержание',
        effectLabel: 'Эффект',
        stagesTitle: 'Этапы продакшена:',
        deliverablesPrefix: 'Формат сдачи:',
        wantSimilarBtn: 'хочу похожий проект',
      },
    },
    resume: {
      kicker: '08 · Полное резюме / Анатомия навыков (Для рекрутеров и клиентов)',
      headlinePart1: 'структура опыта и ',
      headlineItalic: 'инструментов.',
      previewBtn: 'Открыть печатную версию CV',
      downloadBtn: 'Скачать CV в PDF / TXT',
      downloadedBtn: 'CV сохранено!',
      summaryKicker: 'О себе · Краткое саммари',
      summaryTitle:
        'Креативный специалист по визуальной рекламе, моушн-дизайну, 3D-объектам и генеративному арту.',
      summaryBody:
        'Создаю контент полного цикла: от идеи, раскадровки и иллюстрации до анимации и верстки промо-лендингов. Объединяю 5-летний опыт коммерческих продаж с современным AI-пайплайном, чтобы каждый кадр работал на удержание и конверсию.',
      summaryLocation: 'Германия',
      educationLabel: 'Образование',
      educationTitle: 'Предпринимательство, торговля и биржевая деятельность',
      educationBody:
        'Квалификация: Торговый представитель. Фундамент понимания экономики продукта, психологии сделок и аргументации ценности.',
      languagesLabel: 'Языки',
      competencyPrefix: 'Компетенция',
      cvModal: {
        roleLine: 'Junior Creative & Motion Designer · AI Visual Specialist · TikTok Influencer',
        locationLine: 'Германия · dianapaliij@gmail.com · Готова к проектам и сотрудничеству',
        historyTitle: 'Хронология опыта',
        downloadTxtBtn: 'Скачать файл резюме (.txt)',
        printPdfBtn: 'Печать / Сохранить как PDF',
        closeAria: 'Закрыть резюме',
      },
    },
    footer: {
      dragBadge: 'drag / потяни стикер',
      bubbleIdle: '«Потяни меня за стикер мышкой или нажми кнопку пружинки ниже!»',
      bubblePulled: '«Эй, аккуратнее со слоями! Лучше напиши мне на почту :)»',
      pullBtn: 'дёрнуть стикер на пружинке',
      kicker: '09 · Финал истории («Кто всё это придумал?»)',
      headlinePart1: 'кто это сделал? ',
      headlineItalic: 'о, привет. я Диана.',
      line1: 'всё еще в поиске идеального кадра.',
      line2: 'всё еще тестирую новые нейросети.',
      line3: 'всё еще знаю, как продать идею за 3 секунды.',
      line4Bold: 'давайте создадим визуал, который интернет точно не пролистнет.',
      emailHint: 'Прямая почта (нажмите, чтобы скопировать в 1 клик)',
      emailCopied: 'Почта dianapaliij@gmail.com скопирована в буфер обмена!',
      briefBtn: 'заполнить мини-бриф',
      locationText: 'Локация: Германия',
      funFact:
        '«5 лет продавала товары вживую, а теперь продаю идеи через пиксели, 3D и нейросети».',
    },
    brief: {
      kicker: 'Связаться с Дианой · dianapaliij@gmail.com',
      title: 'Обсудить проект',
      closeAria: 'Закрыть окно заявки',
      nameLabel: 'Ваше имя *',
      namePlaceholder: 'Например, Анна / Бренд-менеджер',
      contactLabel: 'Email или @telegram для ответа *',
      contactPlaceholder: 'name@company.com или @username',
      typeLabel: 'Формат задачи',
      typeOptions: [
        'Motion & 3D Креативы (TikTok / Reels)',
        'AI-Креативы (Flow / Gemini / Argon)',
        'Промо-лендинг (Tilda / Readymag)',
        'Цифровая иллюстрация и баннеры',
        'Полный цикл / Предложение о работе',
      ],
      messageLabel: 'Коротко о проекте и целях *',
      messagePlaceholder: 'Какой продукт продвигаем, сколько креативов или какой лендинг нужен?',
      submitBtn: 'Отправить задачу Диане',
      successTitle: 'Заявка готова к отправке!',
      successBodyPart1: 'Спасибо,',
      successBodyPart2: 'Ваша задача по направлению',
      successBodyPart3: 'зафиксирована. Диана ответит вам по контакту',
      openMailClientBtn: 'Открыть в почтовом клиенте',
      doneBtn: 'Готово',
      errors: {
        name: 'Пожалуйста, укажите ваше имя (минимум 2 символа).',
        contact: 'Укажите корректный Email, @telegram или телефон для связи.',
        message: 'Кратко опишите задачу (минимум 10 символов).',
      },
    },
    rabbitHoles: [
      {
        id: 'rh-3d',
        index: '01',
        title: '3D-объекты и модели',
        subtitle: 'Многогранник / сетка полигонов',
        quote: '«Кручу, верчу, рендерю объем так, чтобы хотелось потрогать экран».',
        shapeType: 'polyhedron',
        accentColor: '#FF4D2D',
        yOffset: -24,
        details: 'Тактильный шейдинг, мягкий студийный свет, параллакс и интеграция 3D-примитивов в рекламный моушн.',
      },
      {
        id: 'rh-alight',
        index: '02',
        title: 'Alight Motion & Вектор',
        subtitle: 'Таймлайн TikTok / Reels & кривые',
        quote: '«Маски, слои, кривые графиков и переходы — здесь рождается динамика».',
        shapeType: 'smartphone',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Идеальные изинги (cubic-bezier), ритмичный монтаж под бит, векторная и покадровая 2D-анимация.',
      },
      {
        id: 'rh-illustration',
        index: '03',
        title: 'Цифровая иллюстрация',
        subtitle: 'Стилус, вектор и палитра',
        quote: '«Отрисую любой ассет, баннер или персонажа с нуля, если стоки нагоняют тоску».',
        shapeType: 'stylus',
        accentColor: '#FF4D2D',
        yOffset: -20,
        details: 'Авторские персонажи, раскадровки, композиция и фирменные цветовые акценты для брендов.',
      },
      {
        id: 'rh-ai',
        index: '04',
        title: 'Flow, Claude, Gemini, Argon',
        subtitle: 'Светящееся AI-ядро и пайплайн',
        quote: '«Промптинг как искусство: ускоряю генерацию концептов, текстур и фонов в 5 раз».',
        shapeType: 'aicore',
        accentColor: '#C6FF00',
        yOffset: 24,
        details: 'Генерация консистентных персонажей, бесшовных текстур, окружения и триггерных сценариев.',
      },
      {
        id: 'rh-psychology',
        index: '05',
        title: 'Рекламная психология',
        subtitle: 'Магнит внимания & счетчик CTR',
        quote: '«У вас есть ровно 3 секунды, чтобы зритель не свайпнул. Я знаю, как их выиграть».',
        shapeType: 'magnet',
        accentColor: '#FF4D2D',
        yOffset: -22,
        details: '5 лет живых продаж трансформировались в точные визуальные хуки, закрывающие боли и возражения ЦА.',
      },
      {
        id: 'rh-web',
        index: '06',
        title: 'Tilda & Readymag',
        subtitle: 'Конструктор конверсионного лендинга',
        quote: '«Зачем вести трафик в никуда, если я могу сразу собрать конверсионный промо-сайт?»',
        shapeType: 'browser',
        accentColor: '#C6FF00',
        yOffset: 20,
        details: 'Единая визуальная связка: от первого кадра в Reels/TikTok до формы заявки на промо-странице.',
      },
    ],
    heartPillars: [
      {
        id: 'pillar-sales',
        stepLabel: '01 · Фундамент',
        title: 'Сначала — Продажи и Психология',
        artifactName: 'Мозг / Мишень',
        artifactType: 'target-brain',
        description:
          '«5 лет в реальных коммерческих продажах научили меня главному: просто "красивый дизайн" не оплачивает счета. Я понимаю боли клиентов, триггеры внимания и работу с возражениями».',
        proofMetric: '5 лет в B2C/B2B переговорах · Фокус на ROMI и CTR',
      },
      {
        id: 'pillar-motion',
        stepLabel: '02 · Динамика',
        title: 'Затем — Моушн, 3D и Визуал',
        artifactName: 'Камера в орбитах',
        artifactType: 'orbit-camera',
        description:
          '«От раскадровки, 2D-иллюстрации и 3D-объектов до динамичной анимации для TikTok, Reels и Shorts. Я веду визуальный сторителлинг и свой собственный TikTok-блог, поэтому чувствую тренды кончиками пальцев».',
        proofMetric: '2D/3D Motion · Личный TikTok-блог · Чувство ритма',
      },
      {
        id: 'pillar-ai',
        stepLabel: '03 · Синтез',
        title: 'И теперь — AI и Полный цикл',
        artifactName: 'Светящаяся призма',
        artifactType: 'ai-prism',
        description:
          '«Наполовину художник. Наполовину "а что, если скрестить это с нейросетью?". Создаю рекламу под ключ: от генерации AI-ассетов до верстки посадочных страниц с высоким CTR».',
        proofMetric: 'Flow · Claude · Gemini · Argon · Tilda & Readymag',
      },
    ],
    timelineMilestones: [
      {
        id: 'tm-2019',
        period: '2019 — 2024',
        title: 'Школа реальных продаж',
        role: 'Специалист по продажам / Торговый представитель',
        description:
          '5 лет живых переговоров, презентаций продуктов и закрытия сделок. Изучила психологию покупателя изнутри — это стало секретным оружием моих рекламных креативов.',
        highlightTag: 'Психология покупателя',
      },
      {
        id: 'tm-2023',
        period: '2023',
        title: 'Прыжок в моушн и цифровую графику',
        role: 'Начало пути в дизайне и анимации',
        description:
          'Соединила понимание офферов с цифровой иллюстрацией, 2D-анимацией в Alight Motion и работой с 3D-моделями.',
        highlightTag: 'Alight Motion & 3D',
      },
      {
        id: 'tm-2024',
        period: '2024 — 2025',
        title: 'Продакшен полного цикла & Веб',
        role: 'От ролика до лида',
        description:
          'Начала закрывать всю цепочку для брендов: отрисовка ассетов → анимация креативов → сборка конверсионных лендингов (Tilda, Readymag).',
        highlightTag: 'Full-Cycle & Web',
      },
      {
        id: 'tm-2026',
        period: '2026 — Настоящее время',
        title: 'AI-ускорение, 3D и TikTok',
        role: 'Junior Creative & Motion Designer / AI Visual Specialist',
        description:
          'Интегрировала Flow, Claude, Gemini и Argon в ежедневный пайплайн. Живу в Германии, развиваю личный TikTok и делаю креативы, которые удерживают взгляд и приносят клики.',
        highlightTag: 'AI Pipeline · Германия',
      },
    ],
    processLoopSteps: [
      {
        id: 'loop-1',
        stepNumber: '01',
        title: 'Понять триггер ЦА',
        caption: 'Анализ болей, возражений и паттернов скролла за первые 3 секунды',
      },
      {
        id: 'loop-2',
        stepNumber: '02',
        title: 'Сгенерировать концепт (AI + 3D/2D)',
        caption: 'Раскадровка, генерация ассетов во Flow / Gemini / Argon и ручная отрисовка',
      },
      {
        id: 'loop-3',
        stepNumber: '03',
        title: 'Анимировать цепляющий хук',
        caption: 'Слои, маски, кривые скорости и 3D-объекты в Alight Motion',
      },
      {
        id: 'loop-4',
        stepNumber: '04',
        title: 'Упаковать в конверсионный лендинг',
        caption: 'Сборка промо-страницы на Tilda / Readymag, продолжающей визуал ролика',
      },
      {
        id: 'loop-5',
        stepNumber: '05',
        title: 'Повторить и масштабировать',
        caption: 'Тестирование A/B связок, замер CTR и удержания до целевого лида',
      },
    ],
    projects: [
      {
        id: 'case-01',
        number: '01',
        codeTitle: '01 / Motion · 3D · TikTok Ads',
        title: 'Динамичная связка видеокреативов с 3D-объектами',
        subtitle: 'Performance-моушн для e-commerce и digital-продуктов',
        description:
          'Полный цикл: от сценария и хука первых 3 секунд до векторной и 3D-анимации. Тактильные 3D-примитивы и выверенные кривые скорости удерживают взгляд в ленте TikTok и Reels.',
        categoryKeys: ['motion3d', 'reels'],
        categories: ['Motion & 3D', 'Reels / TikTok'],
        image: '/src/assets/images/case_motion_3d_ads_1793833483290.jpg',
        metrics: {
          ctr: '3.8% CTR',
          retention3s: '74% Hold Rate (3s)',
          outcome: '-38% стоимость клика (CPC) в тестах',
        },
        tools: ['Alight Motion', '3D Models & Shaders', 'Vector Rigging', 'Sound Design'],
        hookFormula:
          'Тактильный 3D-триггер (0–1.5с) → Смена ракурса по кривой скорости → Оффер с наглядной демонстрацией.',
        pipelineSteps: [
          'Декомпозиция болей аудитории и выбор визуального якоря для первых 3 секунд',
          'Построение 3D-композиции и экспорт рендер-слоев с альфа-каналом',
          'Сборка динамики в Alight Motion: маски, граф-редактор кривых и кинетическая типографика',
        ],
        deliverables: 'Серия из 6 вертикальных 9:16 видеокреативов + ресайзы 4:5 и 1:1',
      },
      {
        id: 'case-02',
        number: '02',
        codeTitle: '02 / AI Visuals · Concept Art',
        title: 'Генеративный продакшен для бренда (Flow + Gemini + Argon)',
        subtitle: 'AI Art Direction, кастомные текстуры и гибридная анимация',
        description:
          'Создание уникальных фонов, текстур и персонажей с последующей ручной доработкой и анимацией в Alight Motion. Ускорение концепт-фазы в 5 раз без потери художественного контроля.',
        categoryKeys: ['ai', 'motion3d', 'reels'],
        categories: ['AI-Креативы', 'Motion & 3D', 'Reels / TikTok'],
        image: '/src/assets/images/case_ai_visuals_art_1793833485735.jpg',
        metrics: {
          ctr: '4.2% CTR',
          retention3s: '81% Hold Rate (3s)',
          outcome: '5× ускорение продакшена визуалов',
        },
        tools: ['Flow', 'Gemini', 'Claude', 'Argon', 'Alight Motion', 'Digital Paint'],
        hookFormula:
          'Сюрреалистичный визуальный парадокс (AI + ручной композ) → Плавный параллакс по слоям → Бренд-пэкшот.',
        pipelineSteps: [
          'Разработка матричных промптов в Claude и Gemini для единой стилистики света и оптики',
          'Генерация базовых сцен во Flow и Argon с разделением на передний, средний и задний планы',
          'Ручная ретушь, дорисовка деталей стилусом и параллакс-анимация слоев в Alight Motion',
        ],
        deliverables: '12 генеративных ключевых визуалов + 4 анимированных сторителлинг-ролика',
      },
      {
        id: 'case-03',
        number: '03',
        codeTitle: '03 / Web Design · Conversion',
        title: 'Промо-лендинг под рекламную кампанию (Readymag / Tilda)',
        subtitle: 'Единая воронка: от рекламного хука до целевой заявки',
        description:
          'Проектирование структуры на основе триггеров продаж, кастомная графика и высокая конверсия в заявку. Никакого разрыва между тем, что пользователь увидел в рекламе, и страницей, куда он попал.',
        categoryKeys: ['landings'],
        categories: ['Промо-лендинги'],
        image: '/src/assets/images/case_web_conversion_1793833487211.jpg',
        metrics: {
          ctr: '6.4% CR в лид',
          retention3s: '2м 15с время на сайте',
          outcome: '+62% рост конверсии относительно старого сайта',
        },
        tools: ['Readymag', 'Tilda Zero Block', 'Custom Graphics', 'Sales Copywriting'],
        hookFormula:
          'Повторение главного оффера из видео на первом экране → Снятие 3 главных возражений → Простая форма.',
        pipelineSteps: [
          'Маркетинговое прототипирование структуры на базе 5-летнего опыта реальных продаж',
          'Отрисовка кастомных иллюстраций и 3D-акцентов специально под сетку лендинга',
          'Верстка с микро-анимациями при скролле и адаптация под мобильный трафик из TikTok/Reels',
        ],
        deliverables: 'Адаптивный промо-сайт под ключ + интеграция форм и аналитики',
      },
      {
        id: 'case-04',
        number: '04',
        codeTitle: '04 / Digital Illustration & Hooks',
        title: 'Серия рекламных баннеров и анимированных сторис',
        subtitle: 'Авторская иллюстрация, работа с цветом, композицией и удержанием внимания',
        description:
          'Иллюстрация, работа с цветом, композицией и удержанием внимания. Когда стоковые фото вызывают баннерную слепоту, кастомная графика и смелая типографика пробивают ленту с первого взгляда.',
        categoryKeys: ['reels', 'ai'],
        categories: ['Reels / TikTok', 'AI-Креативы'],
        image: '/src/assets/images/case_digital_illustration_1793833487314.jpg',
        metrics: {
          ctr: '3.5% CTR',
          retention3s: '69% досматриваемость сторис',
          outcome: '0% стоковых клише · 100% узнаваемость',
        },
        tools: ['Digital Illustration', 'Alight Motion', 'Color Theory', 'Storyboarding'],
        hookFormula:
          'Контрастное цветовое пятно (#FF4D2D) → Динамическая стрелка/взгляд персонажа на оффер → Призыв к действию.',
        pipelineSteps: [
          'Эскизирование и поиск контрастной цветовой схемы под гайдлайн бренда',
          'Чистовая векторная и растровая отрисовка ключевых объектов и персонажей',
          'Покадровая и слоевая акцентировка деталей для форматов Stories и Reels',
        ],
        deliverables: 'Пакет из 15 статичных и анимированных креативов для соцсетей',
      },
    ],
    competencies: [
      {
        id: 'comp-motion',
        number: '01',
        title: 'Рекламный моушн и 3D',
        description:
          'Динамичные креативы для TikTok, Reels, Shorts; работа с 3D-объектами и моделями; векторная и покадровая 2D-анимация, маски, слои и переходы в Alight Motion.',
        keywords: 'TikTok · Reels · Shorts · 3D Models · Alight Motion · 2D Vector',
      },
      {
        id: 'comp-illust',
        number: '02',
        title: 'Цифровая иллюстрация',
        description:
          'Отрисовка ассетов, баннеров, визуальных хуков, композиция и цвет. Создание уникального визуального языка без стоковых шаблонов.',
        keywords: 'Custom Assets · Visual Hooks · Storyboarding · Color & Composition',
      },
      {
        id: 'comp-ai',
        number: '03',
        title: 'AI-инструменты и промптинг',
        description:
          'Генерация и доработка коммерческих визуалов, текстур и сценариев (Flow, Claude, Gemini, Argon). Кратное ускорение продакшена.',
        keywords: 'Flow · Claude · Gemini · Argon · Prompt Engineering',
      },
      {
        id: 'comp-web',
        number: '04',
        title: 'Веб-дизайн',
        description:
          'Сборка конверсионных лендингов и промо-сайтов (Tilda, Readymag и аналоги). Проектирование пути пользователя от рекламного клика до заявки.',
        keywords: 'Tilda · Readymag · Promo Landings · Mobile-First UX',
      },
      {
        id: 'comp-sales',
        number: '05',
        title: 'Рекламная психология',
        description:
          '5-летний опыт продаж, триггеры ЦА, сильные офферы, удержание внимания и рост CTR. Понимание того, как визуал влияет на коммерческое решение.',
        keywords: '5 Years Sales · Attention Triggers · High CTR · Offer Framing',
      },
    ],
    languages: [
      { code: 'UA', name: 'Украинский', level: 'Родной' },
      { code: 'RU', name: 'Русский', level: 'Свободно' },
      { code: 'DE', name: 'Немецкий', level: 'A2' },
      { code: 'EN', name: 'Английский', level: 'A2' },
    ],
  },
};

// Default exports for backward compatibility with existing tests
export const PROJECTS = PORTFOLIO_I18N.ru.projects;
export const RABBIT_HOLES = PORTFOLIO_I18N.en.rabbitHoles;
export const HEART_PILLARS = PORTFOLIO_I18N.en.heartPillars;
export const TIMELINE_MILESTONES = PORTFOLIO_I18N.en.timelineMilestones;
export const PROCESS_LOOP_STEPS = PORTFOLIO_I18N.en.processLoopSteps;
export const RESUME_COMPETENCIES = PORTFOLIO_I18N.en.competencies;
export const RESUME_LANGUAGES = PORTFOLIO_I18N.en.languages;
