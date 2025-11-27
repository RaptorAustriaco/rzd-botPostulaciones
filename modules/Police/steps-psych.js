module.exports = {
  id: "psych_form",
  title: "FORM LSPD — TEST APTITUD (IC)",
  fields: [
    {
      id: "psico_no_aceptado",
      label: "Si no te aceptan, ¿qué harías?",
      type: "long"
    },
    {
      id: "psico_equipo",
      label: "Trabajo en equipo (1–10), ¿tu nivel?",
      type: "short"
    },
    {
      id: "psico_orden_injusta",
      label: "¿si un superior te da una orden injusta?",
      type: "long"
    }
  ],

  save(interaction, data) {
    data.psico =
      `**Si no eres aceptado:**\n` +
      `${interaction.fields.getTextInputValue("psico_no_aceptado")}\n\n` +
      `**Capacidad para trabajar en equipo (1–10):** ` +
      `${interaction.fields.getTextInputValue("psico_equipo")}\n\n` +
      `**Reacción ante una orden injusta de un superior:**\n` +
      `${interaction.fields.getTextInputValue("psico_orden_injusta")}`;
  }
};

