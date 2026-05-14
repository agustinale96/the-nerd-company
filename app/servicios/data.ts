export type UseCaseIndustry = {
  industry: string;
  description: string;
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

export type Service = {
  n: string;
  slug: string;
  verb: string;
  name: string;
  description: string;
  cardTagline?: string;
  includes: string[];
  useCases: string[];
  // New fields for redesigned pages
  serviceImage?: string;
  heroTagline?: string;
  whatIs?: string[];
  whenYouNeedIt?: string[];
  useCasesByIndustry?: UseCaseIndustry[];
  howItWorks?: HowItWorksStep[];
  whatYouNeed?: WhatYouNeedItem[];
  variants?: ServiceVariant[];
  sectionVariantsTitle?: string;
  sectionWhatYouNeedTitle?: string;
  sectionWhatYouNeedSubtitle?: string;
  targetCompanies?: string[];
  statement?: string;
  ctaText?: string;
};

export const SERVICES: Service[] = [
  {
    n: "01",
    slug: "machine-learning",
    verb: "ENTRENAR",
    name: "Predicción de Tendencias y Comportamiento",
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
    heroTagline: "Tu negocio reacciona. El de tu competencia ya anticipó.",
    whatIs: [
      "Es un sistema que analiza tus datos históricos para identificar patrones y proyectar lo que va a ocurrir: cómo va a evolucionar la demanda, dónde aparecerán los cuellos de botella, qué riesgos se aproximan y qué oportunidades vale la pena anticipar.",
      "No es intuición ni experiencia. Es tecnología aplicada a tu contexto para que tomes decisiones antes de que los problemas aparezcan.",
    ],
    whenYouNeedIt: [
      "Tu forecast de ventas se basa en el año anterior o en el criterio del equipo comercial.",
      "Perdés clientes y te enterás cuando ya se fueron.",
      "Tenés roturas de stock o sobrestock de forma recurrente sin entender por qué.",
      "Lanzás campañas sin saber qué segmento va a responder.",
      "Necesitás planificar recursos y no sabés dónde va a estar la demanda el mes que viene.",
      "Tu capacidad operativa se sobredimensiona o subdimensiona porque no tenés visibilidad de lo que viene.",
      "Variables externas — clima, tipo de cambio, estacionalidad — impactan tu operación sin aviso y sin plan.",
    ],
    useCasesByIndustry: [
      {
        industry: "Retail y consumo masivo",
        description:
          "Una cadena de tiendas anticipa qué productos van a tener mayor demanda por zona y temporada, y ajusta sus compras antes de que el mercado lo exija.",
        image: "/s1.png",
      },
      {
        industry: "Servicios financieros y seguros",
        description:
          "Una fintech identifica qué clientes tienen mayor probabilidad de abandonar el servicio en los próximos 30 días y activa retención antes de perderlos.",
        image: "/s1.png",
      },
      {
        industry: "Salud y clínicas privadas",
        description:
          "Una red de centros médicos proyecta el volumen de consultas por especialidad para optimizar la agenda de profesionales y reducir tiempos de espera.",
        image: "/s1.png",
      },
      {
        industry: "Logística y transporte",
        description:
          "Una empresa de distribución anticipa picos de demanda por zona y período para optimizar rutas, asignación de flota y dotación operativa antes de que la presión llegue.",
        image: "/s1.png",
      },
      {
        industry: "Energía e industria",
        description:
          "Una planta industrial proyecta el consumo energético y la probabilidad de falla en equipos críticos, reduciendo paradas no planificadas y costos de mantenimiento correctivo.",
        image: "/s1.png",
      },
    ],
    howItWorks: [
      {
        title: "Datos",
        description:
          "Integramos tus datos históricos: transacciones, comportamiento de clientes, operaciones, canales de venta.",
      },
      {
        title: "Modelo",
        description:
          "Entrenamos un modelo que aprende los patrones específicos de tu negocio, no uno genérico de industria.",
      },
      {
        title: "Resultado",
        description:
          "El sistema proyecta escenarios futuros con margen de confianza: qué va a pasar, cuándo y con qué probabilidad.",
      },
      {
        title: "Impacto",
        description:
          "Tomás decisiones con anticipación: qué stockear, a quién retener, dónde poner presupuesto, cómo dimensionar el equipo.",
      },
    ],
    whatYouNeed: [
      {
        title: "Historial de ventas o transacciones",
        description:
          "Idealmente 12 meses o más. Puede ser un Excel, CSV o exportado directo de tu ERP o sistema de gestión. No necesitás limpiarlo antes.",
      },
      {
        title: "Datos de clientes",
        description:
          "Frecuencia de compra, canales utilizados, productos o categorías consumidas. Incluso un listado básico sirve como punto de partida.",
      },
      {
        title: "Datos operativos relevantes",
        description:
          "Inventario, historial de precios, campañas anteriores, estacionalidad. Cuanto más contexto tengamos, mejor el modelo.",
      },
      {
        title: "No necesitás tenerlo todo ordenado",
        description:
          "Evaluamos lo que tenés y definimos desde dónde arrancar. Cualquier formato es válido para la primera reunión.",
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
    statement: "De data estructurada a un sistema de predicciones confiable.",
    ctaText: "Contanos qué querés anticipar. Te mostramos qué podés predecir con los datos que ya tenés.",
  },
  {
    n: "02",
    slug: "deep-learning",
    verb: "DISEÑAR",
    name: "Procesamiento de Imágenes y Audio",
    description:
      "Diseño y entrenamiento de redes neuronales avanzadas para resolver problemas complejos relacionados con voz, visión computacional, datos multimodales y automatización inteligente.",
    cardTagline: "Extraé valor de imágenes, video y audio en tiempo real.",
    serviceImage: "/s2.png",
    heroTagline: "Lo que tus sistemas no podían ver ni oír, ahora sí pueden.",
    whatIs: [
      "Es tecnología que enseña a los sistemas a interpretar información visual y sonora con la misma precisión —y velocidad— con la que un especialista humano lo haría, pero sin límites de escala ni atención.",
      "Una cámara en una línea de producción que detecta defectos al instante. Una grabación de llamada que mide el tono emocional del cliente. Un documento escaneado que se convierte en datos estructurados. Tres aplicaciones, un mismo principio: transformar contenido que antes era ruido en información procesable.",
    ],
    whenYouNeedIt: [
      "Tenés imágenes, fotos o videos de productos, procesos o clientes que nadie analiza porque no hay escala humana para hacerlo.",
      "Grabás llamadas de ventas o soporte pero nunca las procesás sistemáticamente.",
      "Tus documentos físicos o escaneados requieren carga manual en sistemas digitales.",
      "Querés detectar defectos visuales en producción sin depender de inspección humana.",
      "Necesitás analizar sentimiento o tono emocional en conversaciones de clientes a escala.",
      "Tenés cámaras de seguridad o monitoreo que no generan alertas inteligentes.",
      "Tus operarios clasifican visualmente productos o materiales de forma repetitiva.",
    ],
    useCasesByIndustry: [
      {
        industry: "Retail",
        description:
          "Una cadena detecta en tiempo real si los productos están bien posicionados en góndola, si hay quiebres de stock y si la señalética está en condiciones, usando sólo las cámaras existentes del local.",
        image: "/s2.png",
      },
      {
        industry: "Manufactura",
        description:
          "Una planta identifica defectos de pintura, grietas o piezas mal ensambladas en la línea de producción, sin detener el flujo ni depender de inspectores manuales.",
        image: "/s2.png",
      },
      {
        industry: "Salud",
        description:
          "Un proveedor de telemedicina analiza automáticamente grabaciones de consultas para medir adherencia a protocolos clínicos y detectar señales de riesgo en el tono de voz del paciente.",
        image: "/s2.png",
      },
      {
        industry: "Seguros",
        description:
          "Una aseguradora procesa fotos de siniestros con visión computacional para estimar el daño en minutos y priorizar la asignación de peritos.",
        image: "/s2.png",
      },
      {
        industry: "Logística",
        description:
          "Un operador de depósito lee automáticamente etiquetas, códigos QR y documentos de transporte para registrar ingresos y egresos sin escaneo manual.",
        image: "/s2.png",
      },
    ],
    howItWorks: [
      {
        title: "Fuente",
        description:
          "Conectamos a tu fuente: cámaras IP, sistemas de grabación, formularios de carga, buckets de imágenes o archivos en cualquier formato.",
      },
      {
        title: "Preprocesamiento",
        description:
          "Normalizamos el contenido —resolución, ruido, formato— para que el modelo trabaje con señal limpia, no con artefactos.",
      },
      {
        title: "Modelo",
        description:
          "Entrenamos o ajustamos la red neuronal sobre tus casos específicos: tus productos, tus defectos, tus tipos de documentos, tus voces.",
      },
      {
        title: "Resultado",
        description:
          "El sistema analiza en tiempo real o por lotes y devuelve información estructurada: etiquetas, alertas, scores, texto extraído.",
      },
    ],
    whatYouNeed: [
      {
        title: "Imágenes o video (.JPG, .PNG, .TIFF, .MP4, .MOV)",
        description:
          "Fotos de productos, capturas de cámaras, video de procesos o seguridad. No necesitás que estén etiquetados de antemano; eso lo hacemos juntos.",
      },
      {
        title: "Audio o grabaciones (.MP3, .WAV, .OGG, .M4A, .FLAC)",
        description:
          "Grabaciones de llamadas, audio de reuniones, señal de micrófono. Cualquier formato de audio común es válido.",
      },
      {
        title: "Documentos escaneados (.PDF, .TIFF, .JPG)",
        description:
          "Formularios, facturas, contratos, remitos o cualquier papel que necesités procesar en escala.",
      },
      {
        title: "Volumen orientativo",
        description:
          "Para modelos entrenados a medida, más ejemplos equivale a mejor rendimiento —pero podemos arrancar con muestras pequeñas y crecer en iteraciones.",
      },
    ],
    variants: [
      {
        name: "Computer Vision",
        description:
          "Detección de objetos, clasificación visual, control de calidad, análisis de góndola, reconocimiento facial.",
      },
      {
        name: "Audio Intelligence",
        description:
          "Speech-to-text, detección de emociones en voz, análisis de llamadas, transcripción masiva y categorización.",
      },
      {
        name: "OCR e Inteligencia Documental",
        description:
          "Extracción estructurada de texto en documentos escaneados, formularios, facturas y contratos.",
      },
      {
        name: "Video Analytics",
        description:
          "Detección de comportamientos, conteo de personas, análisis de movimiento y alertas en tiempo real.",
      },
    ],
    statement: "De píxeles y ondas a decisiones concretas.",
    ctaText:
      "Mandanos una muestra de tus imágenes, audios o videos. Definimos en una sesión qué podemos extraer de ellos.",
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
  {
    n: "03",
    slug: "llm-custom",
    verb: "PERSONALIZAR",
    name: "IA Entrenada con tus Datos",
    description:
      "Desarrollo y adaptación de modelos de lenguaje especializados para empresas, entrenados sobre conocimiento, procesos y contexto operacional específico.",
    cardTagline: "Un modelo que habla el idioma de tu negocio.",
    serviceImage: "/s3.png",
    heroTagline: "Un modelo de IA que sabe exactamente lo que sabés vos.",
    whatIs: [
      "La mayoría de las herramientas de IA responden con conocimiento genérico. Esto es diferente: es un modelo entrenado sobre el contenido específico de tu empresa —tus documentos, tus procesos, tu forma de trabajar— que genera respuestas precisas dentro de tu contexto y sólo dentro de él.",
      "No compartís datos con terceros. No dependés de un proveedor externo para el conocimiento sensible. El modelo es tuyo: lo entrenamos, lo ajustamos y lo desplegamos en tu infraestructura.",
    ],
    whenYouNeedIt: [
      "Tus empleados buscan información interna y consumen demasiado tiempo navegando documentos, wikis o correos.",
      "El soporte al cliente escala por volumen y siempre responde lo mismo, pero el equipo no da abasto.",
      "Tenés manuales, SOPs y políticas internas que nadie consulta porque no son accesibles.",
      "Querés que la IA responda sobre tus productos y procesos —no sobre la industria en general.",
      "Generás reportes recurrentes que requieren contexto interno que un modelo genérico no tiene.",
      "La privacidad es una restricción real: los datos de tu empresa no pueden salir de tu perímetro.",
    ],
    useCasesByIndustry: [
      {
        industry: "Servicios profesionales",
        description:
          "Un estudio contable construye un asistente que responde sobre normativa local, impuestos y procedimientos internos, entrenado sobre su propia base documental actualizada.",
        image: "/s3.png",
      },
      {
        industry: "Manufactura",
        description:
          "Una planta industrial crea un copilot técnico que responde sobre mantenimiento de equipos, procedimientos de seguridad y hojas de datos, directamente desde los manuales propietarios.",
        image: "/s3.png",
      },
      {
        industry: "Salud y farmacia",
        description:
          "Una cadena de farmacias entrena un asistente para su equipo comercial que responde sobre interacciones medicamentosas, protocolos de dispensación y normativa vigente.",
        image: "/s3.png",
      },
      {
        industry: "Recursos humanos",
        description:
          "Una empresa automatiza el onboarding de nuevos empleados con un asistente que responde sobre políticas, beneficios, procesos internos y cultura organizacional.",
        image: "/s3.png",
      },
      {
        industry: "Finanzas y seguros",
        description:
          "Una aseguradora construye un copilot para sus productores que responde en tiempo real sobre coberturas, exclusiones, condiciones de pólizas y procesos de siniestros.",
        image: "/s3.png",
      },
    ],
    howItWorks: [
      {
        title: "Fuente documental",
        description:
          "Relevamos y procesamos tu base de conocimiento: manuales, PDFs, wikis, correos, CRM, base de soporte.",
      },
      {
        title: "Indexación semántica",
        description:
          "Convertimos ese conocimiento en una estructura que el modelo puede consultar por significado, no por palabras clave.",
      },
      {
        title: "Entrenamiento y ajuste",
        description:
          "Según el caso, aplicamos fine-tuning sobre tu dominio o construimos un sistema RAG que conecta el modelo a tu fuente de verdad.",
      },
      {
        title: "Despliegue privado",
        description:
          "El sistema corre en tu infraestructura —cloud privada o on-premise— sin que ningún dato salga de tu perímetro.",
      },
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
    statement: "Tu conocimiento institucional, disponible al instante. Solo para vos.",
    ctaText:
      "Contanos qué documentos o procesos querés que la IA comprenda. Evaluamos la viabilidad técnica sin costo.",
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
    n: "04",
    slug: "agentes-ia",
    verb: "ORQUESTAR",
    name: "Automatización de Procesos con Agentes",
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
    useCasesByIndustry: [
      {
        industry: "Ventas y growth",
        description:
          "Un agente monitorea fuentes públicas en busca de leads que cumplen el perfil objetivo, los enriquece con datos de contacto, redacta un primer mensaje personalizado y los encola en el CRM para revisión del SDR.",
        image: "/s4.png",
      },
      {
        industry: "Recursos humanos",
        description:
          "Un agente lee CVs que llegan por correo, los evalúa contra los criterios del puesto, filtra candidatos, agenda entrevistas en el calendario del recruiter y notifica a los postulantes en cada etapa.",
        image: "/s4.png",
      },
      {
        industry: "Customer success",
        description:
          "Un agente analiza señales de uso del producto por cliente, detecta los que están en riesgo de churn y dispara una secuencia de reengagement personalizada, escalando al equipo sólo cuando el caso lo requiere.",
        image: "/s4.png",
      },
      {
        industry: "Operaciones internas",
        description:
          "Un agente procesa facturas entrantes, verifica que coincidan con las órdenes de compra, registra discrepancias, notifica a los responsables y actualiza el sistema contable sin intervención manual.",
        image: "/s4.png",
      },
      {
        industry: "Soporte técnico",
        description:
          "Un agente atiende el primer nivel de soporte: lee el ticket, busca en la base de conocimiento, elabora una respuesta y la envía. Si no puede resolverlo, escala con contexto completo al agente humano correspondiente.",
        image: "/s4.png",
      },
    ],
    howItWorks: [
      {
        title: "Definición del proceso",
        description:
          "Mapeamos el proceso que vamos a automatizar: sus pasos, condiciones de éxito, variantes posibles y los sistemas que toca.",
      },
      {
        title: "Arquitectura del agente",
        description:
          "Definimos si el agente actúa solo o en red con otros agentes especializados, qué herramientas necesita y cómo se integra con tus sistemas internos.",
      },
      {
        title: "Integración de herramientas",
        description:
          "Conectamos el agente a tus APIs, CRM, ERP, correo, calendarios, bases de datos o cualquier herramienta que el proceso requiera.",
      },
      {
        title: "Memoria y contexto",
        description:
          "Configuramos qué debe recordar el agente entre sesiones, cómo gestiona el historial de interacciones y cómo adapta su comportamiento al contexto acumulado.",
      },
      {
        title: "Lógica de decisión",
        description:
          "Definimos los criterios con los que el agente toma decisiones autónomas y los puntos exactos donde escala a un humano.",
      },
      {
        title: "Monitoreo y mejora",
        description:
          "Desplegamos con trazabilidad completa de cada acción, métricas de desempeño y capacidad de ajustar el comportamiento en base a resultados reales.",
      },
    ],
    whatYouNeed: [
      {
        title: "Descripción del proceso actual",
        description:
          "El flujo paso a paso: qué lo dispara, qué acciones ocurren, qué sistemas se tocan y cuál es el resultado esperado.",
      },
      {
        title: "Acceso a las herramientas involucradas",
        description:
          "APIs o credenciales de los sistemas que el agente necesita usar: CRM, correo, calendario, ERP, planillas.",
      },
      {
        title: "Ejemplos reales del proceso",
        description:
          "Casos concretos de cómo se ejecuta hoy, incluyendo variantes, excepciones y los errores más frecuentes.",
      },
      {
        title: "Criterio de supervisión",
        description:
          "Qué acciones el agente puede ejecutar de forma autónoma y cuáles deben pasar por revisión humana antes de confirmarse.",
      },
    ],
    variants: [
      {
        name: "Agentes de ventas",
        description:
          "SDR automatizado que prospecta, califica y contacta leads con contexto y personalización.",
      },
      {
        name: "Agentes de soporte",
        description:
          "Primer nivel de atención que resuelve casos comunes y escala los complejos con contexto completo.",
      },
      {
        name: "Agentes operativos",
        description:
          "Automatización de procesos internos: onboarding, facturación, coordinación entre sistemas.",
      },
      {
        name: "Sistemas multi-agente",
        description:
          "Redes de agentes especializados que se coordinan para ejecutar procesos complejos de extremo a extremo.",
      },
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
    n: "05",
    slug: "end-to-end",
    verb: "CONSTRUIR",
    name: "Transformación Digital Integral con IA",
    description:
      "Diseño y desarrollo completo de plataformas de inteligencia artificial desde la arquitectura inicial hasta el deployment productivo y monitoreo continuo.",
    cardTagline: "De cero a producción, con todo integrado.",
    serviceImage: "/s5.png",
    heroTagline: "No implementamos herramientas. Rediseñamos cómo opera tu empresa.",
    whatIs: [
      "La transformación digital real no ocurre herramienta por herramienta. Ocurre cuando el modelo operativo de la empresa se rediseña con IA como capa central: infraestructura, datos, automatización y equipos funcionando en un nuevo paradigma.",
      "Trabajamos como el área de IA interna que tu empresa todavía no tiene: desde el diagnóstico estratégico hasta el sistema en producción, pasando por la arquitectura de datos, la selección de tecnologías, el desarrollo y la transferencia de conocimiento al equipo.",
    ],
    whenYouNeedIt: [
      "Querés implementar IA pero no tenés claro por dónde empezar ni cómo priorizar.",
      "Tus iniciativas de IA anteriores quedaron como pilotos que nunca llegaron a producción.",
      "Necesitás un partner que comprenda tanto el negocio como el sistema.",
      "Querés construir capacidades internas de IA pero no podés contratar el equipo técnico todavía.",
      "Tenés múltiples sistemas desconectados y necesitás una arquitectura unificada.",
      "El volumen de datos que generás no se está usando para nada estratégico.",
    ],
    useCasesByIndustry: [
      {
        industry: "Retail y consumo masivo",
        description:
          "Una cadena rediseña su operación con predicción de demanda, automatización del reabastecimiento, personalización de ofertas y monitoreo inteligente de góndola, integrado en una plataforma unificada.",
        image: "/s5.png",
      },
      {
        industry: "Servicios financieros",
        description:
          "Una fintech construye su pila de IA desde la arquitectura de datos hasta los modelos de scoring, detección de fraude y automatización de servicio al cliente, con infraestructura propia.",
        image: "/s5.png",
      },
      {
        industry: "Salud",
        description:
          "Una red de clínicas implementa IA en la gestión de agendas, predicción de ausentismo, clasificación de urgencias y análisis de imágenes diagnósticas, integrada con el sistema de historias clínicas.",
        image: "/s5.png",
      },
      {
        industry: "Manufactura",
        description:
          "Una empresa industrial implementa visión computacional en la línea de producción, mantenimiento predictivo y coordinación operacional con agentes, con infraestructura on-premise.",
        image: "/s5.png",
      },
      {
        industry: "Educación",
        description:
          "Una institución construye una plataforma de personalización del aprendizaje con IA, modelos de predicción de abandono y sistemas de soporte automatizados para el área académica y administrativa.",
        image: "/s5.png",
      },
    ],
    howItWorks: [
      {
        title: "Diagnóstico",
        description:
          "Auditamos el estado actual de datos, sistemas y procesos para identificar los mayores focos de valor y los bloqueos críticos. Entregamos un roadmap priorizado.",
      },
      {
        title: "Arquitectura",
        description:
          "Diseñamos la arquitectura completa: infraestructura de datos, modelos necesarios, integraciones, stack tecnológico y plan de despliegue.",
      },
      {
        title: "Desarrollo iterativo",
        description:
          "Construimos por módulos con entregas parciales funcionales desde las primeras semanas. Sin waterfall. Sin esperar meses para ver resultados.",
      },
      {
        title: "Integración",
        description:
          "Conectamos cada módulo con los sistemas existentes: ERP, CRM, BI, operaciones, gestión documental.",
      },
      {
        title: "Despliegue",
        description:
          "Deployamos en la infraestructura elegida —cloud privada, híbrida u on-premise— con monitoreo, versionado y alertas desde el día uno.",
      },
      {
        title: "Transferencia",
        description:
          "Capacitamos al equipo interno, documentamos la arquitectura y entregamos los sistemas con soporte de transición.",
      },
    ],
    sectionVariantsTitle: "CÓMO ES EL PROCESO DE TRABAJO",
    sectionWhatYouNeedTitle: "QUÉ TIPO DE EMPRESAS",
    sectionWhatYouNeedSubtitle: "LO NECESITAN",
    variants: [
      {
        name: "Diagnóstico y roadmap",
        description:
          "Análisis de madurez en datos e IA, identificación de casos de alto impacto, arquitectura preliminar y plan de implementación priorizado.",
      },
      {
        name: "Desarrollo y construcción",
        description:
          "Ingeniería de datos, entrenamiento de modelos, desarrollo de agentes, backends AI, integraciones y dashboards.",
      },
      {
        name: "Despliegue e infraestructura",
        description:
          "Configuración y gestión del entorno productivo: cloud privada, híbrida u on-premise, con CI/CD, monitoreo y alertas.",
      },
      {
        name: "Soporte y evolución",
        description:
          "Acompañamiento post-lanzamiento, optimización de modelos en producción y expansión del sistema a nuevos casos de uso.",
      },
    ],
    targetCompanies: [
      "Empresas que ya generan datos pero no los usan estratégicamente: facturación, clientes, operaciones, logística.",
      "Organizaciones que compiten en mercados donde la velocidad de decisión es ventaja real.",
      "Compañías con múltiples sistemas desconectados y procesos que se coordinan manualmente.",
      "Equipos de dirección que entienden el impacto estratégico de la IA pero no tienen el equipo técnico para ejecutarlo.",
      "Empresas que intentaron proyectos de IA antes y no llegaron a producción por falta de foco técnico o estratégico.",
      "Organizaciones que necesitan construir capacidades propias de IA —sin dependencia de vendors— a mediano plazo.",
    ],
    statement: "De empresa con datos a empresa que decide con IA.",
    ctaText:
      "Contanos en qué estado está tu operación hoy. Definimos juntos el primer paso.",
    includes: [
      "Arquitectura completa de soluciones AI",
      "Ingeniería y procesamiento de datos",
      "Backend AI y APIs",
      "Integraciones empresariales",
      "Dashboards y visualización",
      "Infraestructura cloud y on-premise",
      "Deployment y monitoreo continuo",
    ],
    useCases: [
      "Plataformas enterprise AI",
      "Sistemas completos de automatización",
      "Infraestructura AI privada",
      "Voice intelligence platforms",
      "Industrial AI systems",
      "Plataformas de análisis inteligente",
      "Sistemas híbridos cloud/on-premise",
      "Soluciones AI custom para empresas",
    ],
  },
];

export const SERVICE_MAP: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
