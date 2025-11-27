module.exports = {
  id: "ic_form_a",
  title: "FORM LSPD — DATOS IC (1/2)",
  fields: [
    { id: "ic_nombre", label: "Nombre del personaje", type: "short" },
    { id: "ic_dni", label: "DNI del personaje", type: "short" },
    { id: "ic_nacio", label: "Nacionalidad", type: "short" },
    { id: "ic_tel", label: "Teléfono", type: "short" }
  ],

  save(interaction, data) {
    data.ic_parte1 =
      `**Nombre:** ${interaction.fields.getTextInputValue("ic_nombre")}\n` +
      `**DNI:** ${interaction.fields.getTextInputValue("ic_dni")}\n` +
      `**Nacionalidad:** ${interaction.fields.getTextInputValue("ic_nacio")}\n` +
      `**Teléfono:** ${interaction.fields.getTextInputValue("ic_tel")}`;
  }
};
