const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  id: "cases_form",
  title: "FORM LSPD — CASOS RP",
  fields: [
    { id: "caso1", label: "Caso 1 — responde aquí", type: "long" },
    { id: "caso2", label: "Caso 2 — responde aquí", type: "long" },
    { id: "caso3", label: "Caso 3 — responde aquí", type: "long" },
    { id: "caso4", label: "Caso 4 — responde aquí", type: "long" },
    { id: "caso5", label: "Caso 5 — responde aquí", type: "long" }
  ],

  /* ============================================================
     BOTONES PARA VER LOS CASOS EN EMBEDS
  ============================================================ */
  extraButtons() {
    return new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("ver_caso1").setLabel("📘 Caso 1").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("ver_caso2").setLabel("📘 Caso 2").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("ver_caso3").setLabel("📘 Caso 3").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("ver_caso4").setLabel("📘 Caso 4").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("ver_caso5").setLabel("📘 Caso 5").setStyle(ButtonStyle.Secondary)
    );
  },

  /* ============================================================
     EMBEDS DE CADA CASO
  ============================================================ */
  getCaseEmbed(caseNumber) {
    const cases = {
      1: {
        title: "🟦 Caso 1: Tráfico sospechoso",
        description:
          "**Situación:** Durante un patrullaje detienes un vehículo por exceso de velocidad. El conductor evita mirarte, sus manos tiemblan y notas olor fuerte a marihuana. El pasajero intenta ocultar algo.\n\n" +
          "**Pregunta:** ¿Cómo procedes para garantizar tu seguridad e investigar la posible posesión ilegal sin escalar la situación?"
      },
      2: {
        title: "🟦 Caso 2: Robo a tienda en curso",
        description:
          "**Situación:** El ladrón escapó hace segundos. Las cámaras muestran a un sujeto con mochila negra entrando a un callejón cercano.\n\n" +
          "**Pregunta:** ¿Cómo organizas la búsqueda perimetral, obtención de información y coordinación con unidades?"
      },
      3: {
        title: "🟦 Caso 3: Alteración del orden público",
        description:
          "**Situación:** Dos ciudadanos discuten; uno empuja al otro y te dice que 'no tienes derecho a intervenir'.\n\n" +
          "**Pregunta:** ¿Cómo desescalas, identificas si hay agresión y decides advertencia/citación/arresto?"
      },
      4: {
        title: "🟦 Caso 4: Vehículo abandonado",
        description:
          "**Situación:** Vehículo en el borde de un puente, puerta abierta y un celular en el asiento.\n\n" +
          "**Pregunta:** ¿Qué protocolo sigues para verificar emergencia, intento de autolesión, robo o avería?"
      },
      5: {
        title: "🟦 Caso 5: Civil sospechoso",
        description:
          "**Situación:** Sujeto con capota lleva 20 minutos frente a una joyería mirando la vitrina.\n\n" +
          "**Pregunta:** ¿Cómo lo abordas legalmente sin caer en abuso de autoridad?"
      }
    };

    const c = cases[caseNumber];
    return new EmbedBuilder()
      .setTitle(c.title)
      .setDescription(c.description)
      .setColor("#2b90ff");
  },

  /* ============================================================
     GUARDADO DE RESPUESTAS
  ============================================================ */
  save(interaction, data) {
    data.casos =
      `**Caso 1:**\n${interaction.fields.getTextInputValue("caso1")}\n\n` +
      `**Caso 2:**\n${interaction.fields.getTextInputValue("caso2")}\n\n` +
      `**Caso 3:**\n${interaction.fields.getTextInputValue("caso3")}\n\n` +
      `**Caso 4:**\n${interaction.fields.getTextInputValue("caso4")}\n\n` +
      `**Caso 5:**\n${interaction.fields.getTextInputValue("caso5")}`;
  }
};
