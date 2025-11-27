module.exports = {
  id: "ic_form_b",
  title: "FORM LSPD — DATOS IC (2/2)",
  fields: [
    { id: "ic_estudios", label: "Estudios del personaje", type: "long" },
    { id: "ic_historia", label: "Historia del personaje", type: "long" }
  ],

  save(interaction, data) {
    data.ic_parte2 =
      `**Estudios:** ${interaction.fields.getTextInputValue("ic_estudios")}\n\n` +
      `**Historia:** ${interaction.fields.getTextInputValue("ic_historia")}`;
  }
};
