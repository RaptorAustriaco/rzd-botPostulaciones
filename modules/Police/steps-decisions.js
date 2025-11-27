// modules/police/steps-decisions.js
module.exports = {
  id: "decisions_form",
  title: "FORM LSPD — Deicisiones",
  fields: [
    {
      id: "dec_civil_insulta",
      label: "¿Que haces si un civil te insulta ?",
      type: "long"
    },
    {
      id: "dec_comp_error",
      label: "¿Si tu compañero se equivoca , Que haces ?",
      type: "long"
    },
    {
      id: "dec_fuerza_prog",
      label: "Explica qué es el uso de fuerza progresiva",
      type: "long"
    },
    {
      id: "dec_abuso_poder",
      label: "Superior corrupto, Que haces ?”",
      type: "long"
    }
  ],

  save(interaction, data) {
    data.decisiones =
      `**1. Civil que insulta o provoca**\n` +
      `${interaction.fields.getTextInputValue("dec_civil_insulta")}\n\n` +

      `**2. Compañero que comete un error grave ante civiles**\n` +
      `${interaction.fields.getTextInputValue("dec_comp_error")}\n\n` +

      `**3. Uso de fuerza progresiva**\n` +
      `${interaction.fields.getTextInputValue("dec_fuerza_prog")}\n\n` +

      `**4. Superior abusando de su poder**\n` +
      `${interaction.fields.getTextInputValue("dec_abuso_poder")}`;
  }
};
