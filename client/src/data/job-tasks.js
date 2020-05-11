import { formatDate, getMinutes } from "../utils/utils";

export default [
  {
    id: 1304302,
    title: "Encuesta sobre el servicio de Cafetería",
    description:
      "Esta encuesta contiene una serie de preguntas relacionadas al servicio de Cafetería, esto nos permitirá conocer qué aspectos podemos mejorar para así ofrecer servicios de calidad.",
    steps: [
      "Leer detenidamente cada pregunta.",
      "Leer cada una de las posibles respuestas.",
      "Responder objetivamente."
    ],
    tips: [
      "Atencion al Cliente: Se refiere a la atención que los empleados brindan a sus clientes al momento de sus consultas, pedidos o reclamos.",
      "Espacio Físico: Se refiere al lugar donde se presta el servicio.",

      "Calidad de los Productos: Se refiere a qué tan bueno es el producto ofrecido.",
      "Variedad de Productos: Se refiere a la cantidad de productos diferentes que se ofrecen."
    ],
    questions: {
      inputs: [
        {
          id: 1,
          question: "¿Qué piensas de la Atención al Cliente en la Cafetería?",
          feature: "attention",
          answers: ["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]
        },
        {
          id: 2,
          question: "¿Qué piensas del Espacio Físico en la Cafetería?",
          feature: "physical",
          answers: ["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]
        },
        {
          id: 3,
          question:
            "¿Qué piensas de la Calidad de los Productos en la Cafetería?",
          feature: "quality",
          answers: ["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]
        },
        {
          id: 4,
          question: "¿Qué piensas de la Variedad de Productos en la Cafetería?",
          feature: "variety",
          answers: ["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]
        }
      ],
      output: {
        id: 100,
        question: "¿En general cómo clasificarías el servicio?",
        feature: "answer",
        answers: ["Bueno", "Malo"]
      }
    },
    timesCompleted: 16,
    totalQuestions: 5,
    totalTime: getMinutes(300000),
    averageTime: getMinutes(300000),
    available: true,
    createdAt: formatDate(1579515639785, "/")
  },
  {
    id: 1305302,
    title: "Encuesta sobre el servicio de Biblioteca",
    description:
      "Esta encuesta contiene una serie de preguntas relacionadas al servicio de Biblioteca, esto nos permitirá conocer qué aspectos podemos mejorar para así ofrecer servicios de calidad.",
    steps: [
      "Leer detenidamente cada pregunta.",
      "Leer cada una de las posibles respuestas.",
      "Responder objetivamente."
    ],
    tips: [
      "Atencion al Cliente: Se refiere a la atención que los empleados brindan a sus clientes al momento de sus consultas, pedidos o reclamos.",
      "Espacio Físico: Se refiere al lugar donde se presta el servicio.",

      "Calidad de los Productos: Se refiere a qué tan bueno es el producto ofrecido.",
      "Variedad de Productos: Se refiere a la cantidad de productos diferentes que se ofrecen."
    ],
    questions: {
      inputs: [
        {
          id: 5,
          question: "¿Qué piensas de la Atención al Cliente en la Biblioteca?",
          feature: "attention",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 6,
          question: "¿Qué piensas del Espacio Físico en la Biblioteca?",
          feature: "physical",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 7,
          question:
            "¿Qué piensas de la Calidad de los Productos en la Biblioteca?",
          feature: "quality",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 8,
          question:
            "¿Qué piensas de la Variedad de Productos en la Biblioteca?",
          feature: "variety",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        }
      ],
      output: {
        id: 100,
        question: "¿En general cómo clasificarías el servicio?",
        feature: "answer",
        answers: ["Bueno", "Malo"]
      }
    },
    timesCompleted: 9,
    totalQuestions: 5,
    totalTime: getMinutes(360000),
    averageTime: getMinutes(360000),
    available: true,
    createdAt: formatDate(1579728639785, "/")
  },
  {
    id: 1323302,
    title: "Encuesta sobre el servicio de Limpieza",
    description:
      "Esta encuesta contiene una serie de preguntas relacionadas al servicio de Limpieza, esto nos permitirá conocer qué aspectos podemos mejorar para así ofrecer servicios de calidad.",
    steps: [
      "Leer detenidamente cada pregunta.",
      "Leer cada una de las posibles respuestas.",
      "Responder objetivamente."
    ],
    tips: [
      "Atencion al Cliente: Se refiere a la atención que los empleados brindan a sus clientes al momento de sus consultas, pedidos o reclamos.",
      "Espacio Físico: Se refiere al lugar donde se presta el servicio.",

      "Calidad de los Productos: Se refiere a qué tan bueno es el producto ofrecido.",
      "Variedad de Productos: Se refiere a la cantidad de productos diferentes que se ofrecen."
    ],
    questions: {
      inputs: [
        {
          id: 9,
          question: "¿Qué piensas de la Atención al Cliente en la Limpieza?",
          feature: "attention",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 10,
          question: "¿Qué piensas del Espacio Físico en la Limpieza?",
          feature: "physical",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 11,
          question:
            "¿Qué piensas de la Calidad de los Productos en la Limpieza?",
          feature: "quality",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 12,
          question: "¿Qué piensas de la Variedad de Productos en la Limpieza?",
          feature: "variety",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        }
      ],
      output: {
        id: 100,
        question: "¿En general cómo clasificarías el servicio?",
        feature: "answer",
        answers: ["Bueno", "Malo"]
      }
    },
    timesCompleted: 27,
    totalQuestions: 5,
    totalTime: getMinutes(240000),
    averageTime: getMinutes(240000),
    available: true,
    createdAt: formatDate(1579606397850, "/")
  },
  {
    id: 1223512,
    title: "Encuesta sobre el servicio de Vigilancia",
    description:
      "Esta encuesta contiene una serie de preguntas relacionadas al servicio de Vigilancia, esto nos permitirá conocer qué aspectos podemos mejorar para así ofrecer servicios de calidad.",
    steps: [
      "Leer detenidamente cada pregunta.",
      "Leer cada una de las posibles respuestas.",
      "Responder objetivamente."
    ],
    tips: [
      "Atencion al Cliente: Se refiere a la atención que los empleados brindan a sus clientes al momento de sus consultas, pedidos o reclamos.",
      "Espacio Físico: Se refiere al lugar donde se presta el servicio.",

      "Calidad de los Productos: Se refiere a qué tan bueno es el producto ofrecido.",
      "Variedad de Productos: Se refiere a la cantidad de productos diferentes que se ofrecen."
    ],
    questions: {
      inputs: [
        {
          id: 13,
          question: "¿Qué piensas de la Atención al Cliente en la Vigilancia?",
          feature: "attention",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 14,
          question: "¿Qué piensas del Espacio Físico en la Vigilancia?",
          feature: "physical",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 15,
          question:
            "¿Qué piensas de la Calidad de los Productos en la Vigilancia?",
          feature: "quality",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        },
        {
          id: 16,
          question:
            "¿Qué piensas de la Variedad de productos en la Vigilancia?",
          feature: "variety",
          answers: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"]
        }
      ],
      output: {
        id: 100,
        question: "¿En general cómo clasificarías el servicio?",
        feature: "answer",
        answers: ["Bueno", "Malo"]
      }
    },
    timesCompleted: 10,
    totalQuestions: 5,
    totalTime: getMinutes(160000),
    averageTime: getMinutes(160000),
    available: true,
    createdAt: formatDate(1579504397850, "/")
  }
];
