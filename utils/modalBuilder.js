const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  async send(interaction, step) {
    try {
      // ---------------------------
      // 1. Construcción del modal
      // ---------------------------
      const modal = new ModalBuilder()
        .setCustomId(step.id)
        .setTitle(step.title);

      step.fields.forEach((field) => {
        const input = new TextInputBuilder()
          .setCustomId(field.id)
          .setLabel(field.label)
          .setStyle(
            field.type === "long"
              ? TextInputStyle.Paragraph
              : TextInputStyle.Short
          )
          .setRequired(true);

        if (field.placeholder) input.setPlaceholder(field.placeholder);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );
      });

      // ---------------------------
      // 2. Mostrar modal (async)
      // ---------------------------
      await interaction.showModal(modal);

      // ---------------------------
      // 3. Enviar botones extra si existen
      // ---------------------------
      if (typeof step.extraButtons === "function") {
        setTimeout(async () => {
          try {
            await interaction.followUp({
              content: "📘 Puedes leer los casos completos aquí:",
              ephemeral: true,
              components: [step.extraButtons()]
            });
          } catch (e) {
            console.log("[ERROR] No fue posible enviar botones extra:", e);
          }
        }, 400); // 400ms es más seguro que 300
      }

    } catch (err) {
      console.log("[ERROR] modalBuilder.send:", err);
    }
  }
};
