export type UseCaseIndustry = {
  industry: string;
  description: string;
  problem?: string;
  solution?: string;
  benefits?: string[];
  image?: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type ServiceVariant = {
  name: string;
  description: string;
};

export type WhatYouNeedItem = {
  title: string;
  description?: string;
};

export type WhenYouNeedItRichItem = {
  title: string;
  body: string;
};

export type Service = {
  n: string;
  slug: string;
  verb: string;
  name: string;
  description: string;
  cardTagline?: string;
  includes: string[];
  useCases: string[];
  serviceImage?: string;
  heroTagline?: string;
  quote?: string;
  whatIs?: string[];
  whenYouNeedIt?: string[];
  useCasesByIndustry?: UseCaseIndustry[];
  howItWorks?: HowItWorksStep[];
  whatYouGet?: string[];
  whyWithUs?: string[];
  whatYouNeed?: WhatYouNeedItem[];
  variants?: ServiceVariant[];
  sectionVariantsTitle?: string;
  sectionWhatYouNeedTitle?: string;
  sectionWhatYouNeedSubtitle?: string;
  sectionHowItWorksLabel?: string;
  sectionHowItWorksTitle?: string;
  ctaTitle?: string;
  targetCompanies?: string[];
  statement?: string;
  ctaText?: string;
  sectionWhenFirst?: boolean;
  sectionWhatIsLabel?: string;
  sectionWhatIsTitle?: string;
  sectionWhenLabel?: string;
  sectionWhenTitle?: string;
  whenYouNeedItClosing?: string;
  whenYouNeedItRich?: WhenYouNeedItRichItem[];
};

export const SERVICES: Service[] = [
  {
    n: "01",
    slug: "chatbots",
    verb: "PERSONALIZAR",
    name: "Chatbots & Asistentes",
    description:
      "Desarrollo y adaptación de modelos de lenguaje especializados para empresas, entrenados sobre conocimiento, procesos y contexto operacional específico.",
    cardTagline: "Un modelo que habla el idioma de tu negocio.",
    serviceImage: "/s3.png",
    heroTagline: "Tu negocio, respondido automáticamente.",
    quote: "Tenemos mensajes por WhatsApp, mail e Instagram y nadie llega a responder todo.",
    whatIs: [
      "La mayoría de los chatbots responden con información genérica y se traban con cualquier pregunta específica. Esto es diferente: es un asistente entrenado sobre tus productos, tus precios, tus procesos y tu forma de atender — que responde como si fuera alguien de tu equipo.",
      "No compartís datos con terceros. No dependés de plataformas externas. El asistente es tuyo: lo entrenamos, lo ajustamos y corre en tu infraestructura.",
    ],
    whenYouNeedIt: [
      "Recibís más consultas de las que tu equipo puede responder a tiempo.",
      "Tus clientes preguntan siempre lo mismo y el equipo pierde horas en eso.",
      "Atendés por múltiples canales y las respuestas no son consistentes.",
      "Querés dar soporte 24/7 sin sumar personal.",
      "La privacidad es una restricción real: los datos no pueden salir de tu perímetro.",
    ],
    sectionHowItWorksLabel: "// cómo trabajamos",
    sectionHowItWorksTitle: "CÓMO TRABAJAMOS",
    howItWorks: [
      {
        title: "Primera reunión",
        description:
          "Entendemos tu contexto y definimos si tiene sentido técnico.",
      },
      {
        title: "Relevamiento",
        description:
          "Mapeamos tus documentos, procesos y fuentes de datos.",
      },
      {
        title: "Construcción",
        description:
          "Entrenamos, ajustamos y validamos el modelo con tu equipo.",
      },
      {
        title: "Entrega y soporte",
        description:
          "Desplegamos en tu infraestructura y acompañamos el arranque.",
      },
    ],
    whatYouGet: [
      "Atención al cliente 24/7 sin sumar personas al equipo.",
      "Respuestas consistentes basadas en tu información real, no en suposiciones.",
      "Tiempo de respuesta inmediato en todos los canales.",
      "Menos carga operativa para tu equipo, que puede enfocarse en casos complejos.",
    ],
    whyWithUs: [
      "Despliegue en tu infraestructura: los datos nunca salen de tu perímetro.",
      "No dependés de un proveedor externo para el conocimiento sensible.",
      "El modelo es tuyo: lo entrenamos, lo ajustamos y te lo entregamos.",
      "Equipo técnico dedicado, no una plataforma self-service.",
    ],
    whatYouNeed: [
      {
        title: "Base documental",
        description:
          "PDFs, Word, Excel, páginas internas, wikis, manuales técnicos, presentaciones. No hace falta que estén ordenados: priorizamos y procesamos juntos.",
      },
      {
        title: "Definición del alcance",
        description:
          "Qué preguntas tiene que poder responder el modelo. Qué NO debe responder. Quiénes van a usarlo y desde qué interfaces.",
      },
      {
        title: "Preferencia de despliegue",
        description:
          "Si tenés cloud propia (AWS, Azure, GCP), servidor on-premise, o ninguna de las dos. Lo resolvemos sin importar el punto de partida.",
      },
      {
        title: "Criterio de validación",
        description:
          "Un set de preguntas reales que usamos para verificar que el modelo responde correctamente antes del lanzamiento. Cuanto más específico, mejor.",
      },
    ],
    variants: [
      {
        name: "Knowledge Assistant Interno",
        description:
          "Asistente que responde preguntas sobre documentos, procesos y políticas internas de la empresa.",
      },
      {
        name: "Copilot para equipos",
        description:
          "Herramienta integrada al flujo de trabajo que sugiere, resume y redacta en base al conocimiento propietario.",
      },
      {
        name: "Chatbot de soporte especializado",
        description:
          "Sistema conversacional entrenado sobre productos, servicios y FAQs para atender clientes sin escalar al equipo.",
      },
      {
        name: "Automatización documental",
        description:
          "Procesamiento masivo de documentos —contratos, informes, formularios— con extracción y síntesis inteligente.",
      },
    ],
    statement: "Si tu negocio atiende clientes, esto es para vos.",
    ctaTitle: "¿CUÁNTAS CONSULTAS PERDÉS POR DÍA?",
    ctaText:
      "Contanos cómo atendés hoy a tus clientes y evaluamos juntos qué puede automatizar un asistente entrenado con tu información.",
    includes: [
      "Entrenamiento y fine-tuning de LLMs",
      "Asistentes empresariales inteligentes",
      "RAG y sistemas de conocimiento",
      "Automatización documental",
      "Copilots internos",
      "Procesamiento avanzado de lenguaje",
      "Sistemas de análisis textual",
    ],
    useCases: [
      "Knowledge assistants internos",
      "Automatización de soporte técnico",
      "Generación automática de reportes",
      "Análisis inteligente de contratos",
      "Asistentes AI para operaciones",
      "Automatización de workflows documentales",
      "AI para recruiting y RRHH",
      "Sistemas conversacionales empresariales",
    ],
  },
  {
    n: "02",
    slug: "automation",
    verb: "ORQUESTAR",
    name: "Agentes & Automatización",
    description:
      "Diseño de agentes autónomos capaces de ejecutar tareas reales dentro de empresas utilizando memoria, razonamiento multi-step e integración con sistemas internos.",
    cardTagline: "Workflows que se ejecutan solos, sin intervención humana.",
    serviceImage: "/s4.png",
    heroTagline: "Un empleado digital que no para, no olvida y no necesita que se lo repitan.",
    whatIs: [
      "Un agente de IA no es un chatbot que responde preguntas. Es un sistema autónomo que recibe una tarea, la descompone en pasos, toma decisiones en el camino, interactúa con herramientas externas y completa el trabajo —sin intervención humana en cada paso.",
      "Puede revisar tu bandeja de entrada y clasificar solicitudes. Puede abrir un ticket, buscar el historial del cliente en el CRM y redactar una respuesta personalizada. Puede monitorear condiciones en tiempo real y ejecutar acciones cuando se cumplen. Lo que antes requería que alguien lo coordinara, ahora se coordina solo.",
    ],
    whenYouNeedIt: [
      "Tenés procesos repetitivos que requieren tomar datos de un sistema, hacer algo con ellos y actualizar otro.",
      "Tus equipos pasan tiempo coordinando tareas entre herramientas: CRM, ERP, correo, Slack, planillas.",
      "El seguimiento post-venta o post-reunión depende de que alguien recuerde hacerlo.",
      "Tus procesos de onboarding, calificación de leads o gestión de tickets tienen pasos manuales que se pueden automatizar.",
      "Querés que ciertas acciones ocurran automáticamente cuando se cumplen condiciones definidas.",
      "Tenés un equipo de soporte o ventas haciendo tareas estructuradas y repetibles que consumen tiempo de alta calidad.",
    ],
    sectionHowItWorksLabel: "// cómo trabajamos",
    sectionHowItWorksTitle: "CÓMO TRABAJAMOS",
    howItWorks: [
      {
        title: "Primera reunión",
        description:
          "Mapeamos el proceso que más tiempo consume y evaluamos qué se puede automatizar.",
      },
      {
        title: "Diseño",
        description:
          "Definimos los pasos del agente, las herramientas que necesita y los puntos donde escala a un humano.",
      },
      {
        title: "Construcción",
        description:
          "Conectamos el agente a tus sistemas y validamos cada decisión con tu equipo.",
      },
      {
        title: "Entrega y monitoreo",
        description:
          "Desplegamos con trazabilidad completa y ajustamos en base a resultados reales.",
      },
    ],
    whatYouGet: [
      "Procesos que antes dependían de una persona, ahora corren solos.",
      "Tu equipo deja de hacer tareas estructuradas y se enfoca en lo que requiere criterio.",
      "Menos errores por coordinación manual entre herramientas.",
      "Escalabilidad sin sumar personas: el agente maneja más volumen sin más carga.",
    ],
    whyWithUs: [
      "Diseñamos el agente desde el proceso real, no desde la tecnología.",
      "Nos integramos con tus herramientas actuales: no necesitás cambiar tu stack.",
      "Definimos juntos los límites de autonomía: el agente actúa donde tiene sentido, escala donde no.",
      "Equipo técnico dedicado, no una plataforma self-service.",
    ],
    statement: "El trabajo fluye solo. Tu equipo interviene donde importa.",
    ctaText:
      "Describinos el proceso que más tiempo consume en tu equipo. Diseñamos el agente en la primera sesión.",
    includes: [
      "Agentes autónomos empresariales",
      "Automatización de workflows",
      "Multi-agent systems",
      "Integraciones con herramientas internas",
      "Sistemas con memoria contextual",
      "Orquestación operacional",
      "Automatización inteligente de procesos",
    ],
    useCases: [
      "Agentes de reclutamiento",
      "SDRs automatizados",
      "Scheduling agents",
      "Customer support AI",
      "Automatización de operaciones internas",
      "Coordinadores automáticos de workflows",
      "Agentes conectados a CRMs y ERPs",
      "Asistentes operacionales empresariales",
    ],
  },
  {
    n: "03",
    slug: "retention",
    verb: "ENTRENAR",
    name: "Retención & Churn",
    description:
      "Desarrollo de modelos predictivos personalizados entrenados sobre los datos específicos del cliente para resolver problemas analíticos, comerciales y operacionales.",
    includes: [
      "Modelos predictivos y clasificación",
      "Forecasting y predicción temporal",
      "Detección de anomalías",
      "Sistemas de recomendación",
      "Scoring y ranking inteligente",
      "Automatización de análisis de datos",
      "Modelos para toma de decisiones empresariales",
    ],
    useCases: [
      "Predicción de churn de clientes",
      "Forecast de ventas y demanda",
      "Detección de fraude",
      "Predicción de riesgo financiero",
      "Scoring de clientes y leads",
      "Clasificación automática de tickets",
      "Motores de recomendación personalizados",
      "Optimización operacional basada en datos",
    ],
    cardTagline: "Anticipá lo que va a pasar antes de que pase.",
    serviceImage: "/s1.png",
    heroTagline: "Dejá de descubrir los problemas cuando ya es tarde. Usamos tus datos para anticipar qué va a pasar en tu negocio — antes de que el mercado, tus clientes o tus costos te lo digan.",
    sectionWhenFirst: true,
    sectionWhenLabel: "// situaciones",
    sectionWhenTitle: "¿CUÁNDO LO NECESITÁS?",
    whenYouNeedItRich: [
      {
        title: "Cuando tenés datos pero no dirección",
        body: "Generás información todos los días — ventas, operaciones, clientes — pero al momento de planificar el próximo mes seguís usando el criterio del equipo o el año anterior.",
      },
      {
        title: "Cuando siempre llegás tarde",
        body: "Te enterás de los problemas cuando ya ocurrieron: un cliente que se fue, un quiebre de stock, un pico operativo que te agarró sin recursos. Reaccionás, pero nunca anticipás.",
      },
      {
        title: "Cuando estás buscando crecer sin perder el control",
        body: "Escalar sin visibilidad es arriesgado. Necesitás saber dónde va a estar la demanda, qué segmentos van a crecer y dónde aparecerán los cuellos de botella antes de que lleguen.",
      },
      {
        title: "Cuando las variables externas te juegan en contra",
        body: "Estacionalidad, tipo de cambio, comportamiento del mercado — factores que impactan tu operación y que hoy te agarran siempre sin plan de respuesta.",
      },
    ],
    whenYouNeedItClosing: "Si alguna de estas situaciones describe cómo opera tu equipo, el problema no es falta de datos — es que todavía no los estás usando para anticipar.",
    sectionWhatIsLabel: "// qué hacemos",
    sectionWhatIsTitle: "QUÉ HACEMOS",
    whatIs: [
      "No te explicamos el modelo. Te decimos qué va a pasar.",
      "Con los datos que ya generás — transacciones, comportamiento de clientes, operaciones — construimos un sistema que proyecta escenarios futuros con margen de confianza. Sabés qué va a pasar, cuándo y con qué probabilidad. Antes de que llegue.",
      "No es un reporte de lo que ya ocurrió. Es inteligencia aplicada al próximo movimiento: qué stockear, a quién retener, dónde poner presupuesto, cómo dimensionar el equipo.",
    ],
    sectionHowItWorksLabel: "// cómo trabajamos",
    sectionHowItWorksTitle: "CÓMO TRABAJAMOS",
    howItWorks: [
      {
        title: "Datos",
        description:
          "Integramos tus datos históricos: transacciones, comportamiento de clientes, operaciones, canales de venta. No necesitás que estén ordenados antes de arrancar.",
      },
      {
        title: "Modelo",
        description:
          "Entrenamos un modelo que aprende los patrones específicos de tu negocio — no uno genérico de industria. Lo que funciona para una retail no funciona igual para una clínica.",
      },
      {
        title: "Resultado",
        description:
          "El sistema proyecta escenarios futuros con margen de confianza: qué va a pasar, cuándo y con qué probabilidad. Sin jerga técnica, listo para que tu equipo lo use.",
      },
      {
        title: "Decisión",
        description:
          "Tomás decisiones con anticipación: qué stockear, a quién retener, dónde poner presupuesto, cómo dimensionar el equipo. Antes de que el problema aparezca.",
      },
    ],
    whatYouNeed: [
      {
        title: "Historial de ventas o transacciones",
        description:
          "Idealmente 12 meses o más. Excel, CSV o exportado de tu ERP. No necesitás limpiarlo antes.",
      },
      {
        title: "Datos de clientes",
        description:
          "Cualquier registro de comportamiento, compras o interacciones. Cuanto más, mejor — pero empezamos con lo que hay.",
      },
      {
        title: "Datos operativos relevantes",
        description:
          "Inventario, logística, agenda, consumo energético — lo que sea que impacte en tu operación.",
      },
      {
        title: "No necesitás tenerlo todo ordenado",
        description:
          "En la primera reunión evaluamos qué tenés y qué se puede predecir con eso. Sin compromisos.",
      },
    ],
    variants: [
      {
        name: "Predicción de demanda",
        description:
          "Proyección de volumen de ventas por producto, canal o región para optimizar compras y logística.",
      },
      {
        name: "Predicción de churn",
        description:
          "Identificación temprana de clientes en riesgo de abandono para activar retención a tiempo.",
      },
      {
        name: "Segmentación predictiva",
        description:
          "Agrupamiento de clientes según su comportamiento futuro esperado, no solo el histórico.",
      },
      {
        name: "Detección de tendencias",
        description:
          "Análisis de señales internas y externas para anticipar cambios de mercado antes de que sean evidentes.",
      },
    ],
    ctaText: "Contanos con qué datos contás y te mostramos qué podés predecir antes de tomar ningún compromiso.",
  },
  {
    n: "04",
    slug: "data-analytics",
    verb: "DISEÑAR",
    name: "Data & Analytics",
    description:
      "Diseño y entrenamiento de redes neuronales avanzadas para resolver problemas complejos relacionados con voz, visión computacional, datos multimodales y automatización inteligente.",
    cardTagline: "Extraé valor de imágenes, video y audio en tiempo real.",
    serviceImage: "/s2.png",
    heroTagline: "Todos tus datos, en un solo lugar, listos para decidir.",
    quote: "La información está repartida en demasiadas herramientas.",
    whatIs: [
      "Tu negocio genera datos todos los días — en el CRM, en el ERP, en las planillas, en los formularios, en las herramientas de soporte. El problema no es que no tenés información: es que está fragmentada y nadie la ve junta.",
      "Conectamos tus fuentes, las unificamos y construimos dashboards y sistemas de alerta que tu equipo realmente usa. Sin exportar a Excel. Sin esperar el reporte del lunes. Sin tomar decisiones con datos de hace tres días.",
    ],
    whenYouNeedIt: [
      "Tus datos viven en cinco herramientas distintas y ninguna habla con la otra.",
      "Tu equipo arma reportes a mano cada semana y consumen horas que podrían evitarse.",
      "Tomás decisiones con el dato de ayer — o de la semana pasada.",
      "No tenés visibilidad en tiempo real sobre ventas, operaciones o clientes.",
      "Querés detectar desvíos o anomalías antes de que se conviertan en un problema.",
      "Tenés fuentes de datos no estructurados — imágenes, audio, documentos — que hoy no aprovechás.",
    ],
    sectionHowItWorksLabel: "// cómo trabajamos",
    sectionHowItWorksTitle: "CÓMO TRABAJAMOS",
    howItWorks: [
      {
        title: "Primera reunión",
        description:
          "Mapeamos tus fuentes de datos y entendemos qué decisiones necesitás tomar con ellos.",
      },
      {
        title: "Integración",
        description:
          "Conectamos tus sistemas — CRM, ERP, bases de datos, APIs, archivos — en una capa unificada.",
      },
      {
        title: "Construcción",
        description:
          "Desarrollamos los dashboards, alertas y modelos que tu equipo va a usar en el día a día.",
      },
      {
        title: "Entrega y evolución",
        description:
          "Desplegamos, capacitamos al equipo y ajustamos según cómo cambian tus necesidades.",
      },
    ],
    whatYouGet: [
      "Un solo lugar donde ver lo que pasa en tu negocio en tiempo real.",
      "Alertas automáticas cuando algo se desvía de lo esperado.",
      "Reportes que se generan solos, sin intervención manual.",
      "Decisiones basadas en el dato completo, no en partes de él.",
    ],
    whyWithUs: [
      "Nos adaptamos a tu stack actual: no necesitás cambiar tus herramientas.",
      "Construimos para que tu equipo lo pueda operar solo, no para que dependas de nosotros.",
      "Combinamos ingeniería de datos con IA cuando el caso lo justifica.",
      "Equipo técnico dedicado, no una plataforma self-service.",
    ],
    statement: "Si tu equipo toma decisiones sin ver el dato completo, el problema no es falta de información — es que todavía no está conectada.",
    ctaText:
      "Contanos qué herramientas usás hoy y qué decisiones necesitás tomar. En una sesión definimos qué se puede conectar y qué podés ver.",
    includes: [
      "Entrenamiento de modelos de voz y audio",
      "Computer vision y análisis de imágenes",
      "Procesamiento y análisis de video",
      "Reconocimiento facial y detección de objetos",
      "Sistemas multimodales",
      "Procesamiento de señales",
      "Inferencia AI en tiempo real",
    ],
    useCases: [
      "Análisis de llamadas y voice analytics",
      "Speech-to-text personalizado",
      "Detección de emociones en voz",
      "Reconocimiento facial",
      "OCR inteligente",
      "Monitoreo industrial mediante cámaras",
      "Detección de comportamiento en video",
      "Automatización visual para retail e industria",
    ],
  },
];

export const SERVICE_MAP: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
