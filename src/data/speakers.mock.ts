export interface SpeakerMock {
  id: string;
  nombre: string;
  titulo: string;
  pais: string;
  tema: string;
  bio: string[];
  temas: string[];
  redes: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  img: string;
  imgHero: string;
  video: string | null;
  videoConferencia: string;
}

export const speakersMock: SpeakerMock[] = [
  {
    id: 'ana-garcia',
    nombre: 'Ana García',
    titulo: 'CEO & Innovation Leader',
    pais: 'México',
    tema: 'Innovation',
    bio: [
      'Ana García no llegó a los escenarios por accidente. Creció en una familia de emprendedores en Guadalajara, donde aprendió desde pequeña que las ideas sin acción son solo sueños. A los 24 años lanzó su primera empresa con $500 dólares y mucha determinación. Fracasó. Lo intentó de nuevo. Y esta vez, cambió todo.',
      'Hoy, con más de 15 años de trayectoria, Ana es reconocida como una de las 50 líderes más influyentes de Latinoamérica según Forbes. Ha trabajado con empresas como Google, Cemex y Mercado Libre, ayudándolas a reinventarse desde adentro.',
      'Pero lo que la distingue no son los premios ni los stages donde ha hablado frente a miles de personas. Es su capacidad de hacer que cada persona en la sala sienta que el cambio es posible. Que la innovación no es exclusiva de Silicon Valley. Que puede nacer aquí, ahora y con lo que tenemos.',
      'Cuando Ana habla, la gente no toma notas. Actúa.',
    ],
    temas: [
      'Innovación disruptiva en tiempos de cambio',
      'Liderazgo femenino en tecnología',
      'Transformación digital empresarial',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
  {
    id: 'carlos-mendez',
    nombre: 'Carlos Mendez',
    titulo: 'Leadership Coach & Speaker',
    pais: 'Colombia',
    tema: 'Leadership',
    bio: [
      'Carlos Mendez creció en Medellín en los años más difíciles de la ciudad. Vio de cerca cómo la falta de liderazgo destruye comunidades, y decidió que su vida iba a dedicarse a construir lo contrario. A los 19 años ya facilitaba talleres de liderazgo juvenil en barrios donde nadie más entraba.',
      'Después vinieron los títulos — Harvard, INSEAD, un doctorado en neurociencia aplicada al comportamiento organizacional — pero Carlos nunca perdió la calle. Su metodología mezcla lo que aprendió en las aulas con lo que vivió en las esquinas: que liderar no es mandar, es servir.',
      'Ha entrenado a más de 10,000 líderes en 20 países. CEOs de multinacionales, alcaldes, directores de hospitales, entrenadores deportivos. Todos coinciden en lo mismo: después de trabajar con Carlos, no puedes volver a liderar igual.',
      'Su frase más repetida en redes: "El líder que no escucha, solo hace ruido." Más de 2 millones de personas la han compartido.',
    ],
    temas: [
      'Liderazgo consciente y neurociencia',
      'Construcción de equipos de alto impacto',
      'Resiliencia organizacional',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
  {
    id: 'sofia-reyes',
    nombre: 'Sofia Reyes',
    titulo: 'AI Strategist & Futurist',
    pais: 'Argentina',
    tema: 'AI & Future',
    bio: [
      'Sofia Reyes escribió su primer algoritmo a los 14 años en un cyber café de Buenos Aires. No tenía computadora en casa, pero tenía una obsesión: entender cómo las máquinas podían pensar. Esa obsesión la llevó a estudiar ciencias de la computación con beca completa en el MIT.',
      'A los 28 años ya era asesora de tres gobiernos latinoamericanos en estrategia de inteligencia artificial. A los 32, el World Economic Forum la nombró Young Global Leader. Pero Sofia no habla de tecnología como algo frío o lejano. Habla de personas.',
      'Su conferencia más famosa, "La IA no te va a reemplazar, pero alguien que la use sí", ha sido vista más de 8 millones de veces. No porque sea alarmista, sino porque ofrece un camino claro: adaptarse no es rendirse, es evolucionar.',
      'Hoy divide su tiempo entre Buenos Aires y San Francisco, asesora a startups de IA ética y escribe su segundo libro. Pero si le preguntas qué la motiva, la respuesta sigue siendo la misma: "Que la tecnología sirva para incluir, no para dividir."',
    ],
    temas: [
      'Inteligencia Artificial y el futuro del trabajo',
      'Ética en IA y tecnología responsable',
      'Cómo preparar tu empresa para 2030',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
  {
    id: 'luis-torres',
    nombre: 'Luis Torres',
    titulo: 'Digital Marketing Expert',
    pais: 'Chile',
    tema: 'Marketing',
    bio: [
      'Luis Torres empezó vendiendo cosas en Mercado Libre a los 16 años desde su cuarto en Santiago. No tenía idea de marketing. Tenía hambre. Y esa hambre lo llevó a obsesionarse con una sola pregunta: ¿por qué la gente compra lo que compra?',
      'Esa pregunta se convirtió en una carrera. Antes de los 30, Luis había construido marcas con millones de seguidores y generado más de $500 millones en ventas digitales para sus clientes. Trabajó con Nike Latam, Rappi, Falabella y docenas de startups que pasaron de cero a millones gracias a sus estrategias.',
      'Pero lo que hace especial a Luis no es el dinero que genera. Es cómo lo enseña. Sus conferencias son masterclasses en tiempo real: abre su laptop, muestra campañas reales, números reales, errores reales. Sin humo. Sin teoría vacía.',
      'Su comunidad en redes supera los 3 millones de seguidores. Su frase: "El mejor marketing es el que no parece marketing." La ironía es que todo el mundo la comparte como contenido de marketing.',
    ],
    temas: [
      'Marketing de alto impacto en redes sociales',
      'Construcción de marca personal',
      'Estrategias de ventas digitales',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
  {
    id: 'maria-chen',
    nombre: 'Maria Chen',
    titulo: 'Serial Entrepreneur',
    pais: 'Perú',
    tema: 'Entrepreneurship',
    bio: [
      'Maria Chen nació en Lima, hija de inmigrantes chinos que tenían un pequeño restaurante en Surquillo. Creció entre woks y calculadoras, aprendiendo dos cosas que definen su carrera: cocinar bajo presión y que cada centavo cuenta.',
      'A los 22 fundó su primera startup desde un coworking prestado. Fracasó en 8 meses. La segunda duró un año. La tercera fue adquirida por una empresa de Silicon Valley por $12 millones. La cuarta, una plataforma de fintech para emprendedores latinos, fue comprada por Google en 2023.',
      'Maria no romantiza el emprendimiento. En sus conferencias dice cosas que otros speakers evitan: "Emprender duele. Te va a costar amigos, sueño y a veces la salud mental. Pero si lo haces por las razones correctas, no hay nada que se le compare."',
      'Hoy es mentora de más de 500 emprendedores en Latinoamérica, inversora ángel y madre de dos hijos. Cuando le preguntan cómo equilibra todo, sonríe y dice: "No equilibro nada. Priorizo todo el tiempo. Y a veces me equivoco. Y eso también está bien."',
    ],
    temas: [
      'Cómo construir y vender una startup',
      'Mentalidad emprendedora en tiempos difíciles',
      'Fundraising y atracción de inversión',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
  {
    id: 'david-kim',
    nombre: 'David Kim',
    titulo: 'Creative Director & Designer',
    pais: 'España',
    tema: 'Design',
    bio: [
      'David Kim llegó a Barcelona desde Seúl a los 18 años con una maleta y un cuaderno lleno de dibujos. No hablaba español. No conocía a nadie. Pero sabía que el diseño era un lenguaje universal, y tenía razón.',
      'En menos de una década, David pasó de ser becario en un estudio pequeño del Raval a dirigir campañas creativas para Nike, Apple y Netflix. Su trabajo ha ganado premios en Cannes Lions, D&AD y los Webby Awards. Pero los premios, dice él, son solo "consecuencias bonitas del proceso."',
      'Lo que hace diferente a David es su filosofía: el diseño no es decoración, es decisión. Cada color, cada tipografía, cada pixel es una elección que puede incluir o excluir, inspirar o aburrir, vender o espantar. Y esa responsabilidad, cree David, es lo que hace al diseño una de las profesiones más poderosas del mundo.',
      'Sus conferencias son experiencias visuales. No usa bullets ni templates genéricos. Cada presentación es una pieza de diseño en sí misma. Cuando David sube al escenario, la audiencia no solo escucha. Ve.',
    ],
    temas: [
      'Diseño que mueve personas y mercados',
      'Creatividad bajo presión',
      'El futuro del diseño con IA',
    ],
    redes: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop',
    imgHero: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&h=1080&fit=crop',
    video: null,
    videoConferencia: `${import.meta.env.BASE_URL}videos/speaker-stage.mp4`,

  },
];
