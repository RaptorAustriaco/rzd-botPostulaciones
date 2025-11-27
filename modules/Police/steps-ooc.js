module.exports = {
  id: "ooc_form",
  title: "FORM LSPD — OOC",
  fields: [
    { id: "ooc_fecha", label: "Fecha de nacimiento (Edad)", type: "short" },
    { id: "ooc_discord", label: "Usuario Discord + ID", type: "short" },
    { id: "ooc_experiencia", label: "¿Has sido policía en otros servidores?", type: "long" }
  ],

  save(interaction, data) {
    data.ooc = 
      `**Fecha:** ${interaction.fields.getTextInputValue("ooc_fecha")}\n` +
      `**Discord:** ${interaction.fields.getTextInputValue("ooc_discord")}\n` +
      `**Experiencia:** ${interaction.fields.getTextInputValue("ooc_experiencia")}`;
  }
};
