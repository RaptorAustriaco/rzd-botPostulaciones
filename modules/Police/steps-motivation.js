module.exports = {
  id: "mot_form",
  title: "FORM LSPD— MOTIVACIÓN",
  fields: [
    { id: "mot_razon", label: "¿Por qué deseas unirte al cuerpo policial?", type: "long" },
    { id: "mot_habilidades", label: "¿Qué habilidades puedes aportar?", type: "long" }
  ],

  save(interaction, data) {
    data.motivacion =
      `**Razón:** ${interaction.fields.getTextInputValue("mot_razon")}\n\n` +
      `**Habilidades:** ${interaction.fields.getTextInputValue("mot_habilidades")}`;
  }
};
