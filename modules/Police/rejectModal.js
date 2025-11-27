// modules/Police/rejectModal.js
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  build(targetId) {
    const modal = new ModalBuilder()
      .setCustomId(`rejectmodal_${targetId}`)
      .setTitle("❌ Rechazar Postulación");

    const input = new TextInputBuilder()
      .setCustomId("reject_reason")
      .setLabel("Motivo del rechazo")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Explica brevemente el motivo…")
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(input);
    modal.addComponents(row);

    return modal;
  }
};
