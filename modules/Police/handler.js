const stepsOOC = require("./steps-ooc.js");
const stepsIC_A = require("./steps-ic-a.js");
const stepsIC_B = require("./steps-ic-b.js");
const stepsMotivation = require("./steps-motivation.js");
const stepsCases = require("./steps-cases.js");
const stepsDecisions = require("./steps-decisions.js");
const stepsPsych = require("./steps-psych.js");

const sendToStaff = require("../../utils/sendToStaff.js");
const modalBuilder = require("../../utils/modalBuilder.js");

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const userData = new Map();

/* ============================================================
   FUNCIÓN PARA CREAR EL BOTÓN "SIGUIENTE"
============================================================ */
function next(customId, label) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(customId)
      .setLabel(label)
      .setStyle(ButtonStyle.Primary)
  );
}

/* ============================================================
   INICIO POSTULACIÓN
============================================================ */
module.exports = {

  async start(interaction) {
    console.log("[LOG] Mostrando primer modal: OOC");

    try {
      modalBuilder.send(interaction, stepsOOC);
    } catch (err) {
      console.log("Error mostrando modal inicial:", err);
    }
  },

  /* ============================================================
     MANEJO DE BOTONES (NEXT)
  ============================================================ */
async handleButton(interaction) {
  console.log("[LOG] Botón presionado:", interaction.customId);

  try {

    switch (interaction.customId) {
      case "next_ic_a":
        return modalBuilder.send(interaction, stepsIC_A);

      case "next_ic_b":
        return modalBuilder.send(interaction, stepsIC_B);

      case "next_motivation":
        return modalBuilder.send(interaction, stepsMotivation);

      case "next_cases":
        return modalBuilder.send(interaction, stepsCases);

      case "next_decisions":
        return modalBuilder.send(interaction, stepsDecisions);

      case "next_psych":
        return modalBuilder.send(interaction, stepsPsych);
    }

    /* 🔵 BOTONES DE VER CASOS --------------------- */
    if (interaction.customId === "ver_caso1") {
      return interaction.reply({
        embeds: [stepsCases.getCaseEmbed(1)],
        ephemeral: true
      });
    }

    if (interaction.customId === "ver_caso2") {
      return interaction.reply({
        embeds: [stepsCases.getCaseEmbed(2)],
        ephemeral: true
      });
    }

    if (interaction.customId === "ver_caso3") {
      return interaction.reply({
        embeds: [stepsCases.getCaseEmbed(3)],
        ephemeral: true
      });
    }

    if (interaction.customId === "ver_caso4") {
      return interaction.reply({
        embeds: [stepsCases.getCaseEmbed(4)],
        ephemeral: true
      });
    }

    if (interaction.customId === "ver_caso5") {
      return interaction.reply({
        embeds: [stepsCases.getCaseEmbed(5)],
        ephemeral: true
      });
    }

  } catch (err) {
    console.log("Error en handleButton:", err);
  }
},

  /* ============================================================
     MANEJO DE MODALES
  ============================================================ */
  async handleModal(interaction) {
    const userId = interaction.user.id;

    if (!userData.has(userId)) {
      userData.set(userId, {});
    }

    const data = userData.get(userId);
    const modalId = interaction.customId;

    console.log("[LOG] Modal recibido:", modalId);

    /* ---------------- OOC ---------------- */
    if (modalId === stepsOOC.id) {
      stepsOOC.save(interaction, data);

      return interaction.reply({
        content: "📄 Datos OOC guardados. Continúa:",
        ephemeral: true,
        components: [next("next_ic_a", "➡️ Continuar a IC (1/2)")]
      });
    }

    /* ---------------- IC (1/2) ---------------- */
    if (modalId === stepsIC_A.id) {
      stepsIC_A.save(interaction, data);

      return interaction.reply({
        content: "📄 Datos IC (1/2) guardados. Continúa:",
        ephemeral: true,
        components: [next("next_ic_b", "➡️ Continuar a IC (2/2)")]
      });
    }

    /* ---------------- IC (2/2) ---------------- */
    if (modalId === stepsIC_B.id) {
      stepsIC_B.save(interaction, data);

      return interaction.reply({
        content: "📄 Datos IC (2/2) guardados. Continúa:",
        ephemeral: true,
        components: [next("next_motivation", "➡️ Continuar a Motivación")]
      });
    }

    /* ---------------- MOTIVACIÓN ---------------- */
    if (modalId === stepsMotivation.id) {
      stepsMotivation.save(interaction, data);

      return interaction.reply({
        content: "📄 Motivación guardada. Continúa:",
        ephemeral: true,
        components: [next("next_cases", "➡️ Continuar a Casos RP")]
      });
    }

    /* ---------------- CASOS RP ---------------- */
    if (modalId === stepsCases.id) {
      stepsCases.save(interaction, data);

      return interaction.reply({
        content: "📄 Casos RP guardados. Continúa:",
        ephemeral: true,
        components: [next("next_decisions", "➡️ Continuar a Toma de Decisiones")]
      });
    }

    /* ---------------- DECISIONES ---------------- */
    if (modalId === stepsDecisions.id) {
      stepsDecisions.save(interaction, data);

      return interaction.reply({
        content: "📄 Decisiones guardadas. Continúa:",
        ephemeral: true,
        components: [next("next_psych", "➡️ Continuar a Test Psicológico")]
      });
    }

    /* ---------------- PSICO ---------------- */
    if (modalId === stepsPsych.id) {
      stepsPsych.save(interaction, data);

      await interaction.reply({
        content: "📨 Tu postulación fue enviada al STAFF.",
        ephemeral: true
      });

      await sendToStaff(interaction.user, data);

      console.log("[LOG] Postulación enviada al staff.");

      userData.delete(userId);
    }
  }
};


