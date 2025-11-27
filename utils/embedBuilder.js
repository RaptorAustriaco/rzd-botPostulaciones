// utils/embedBuilder.js
const { EmbedBuilder } = require("discord.js");

module.exports = {
  build(user, data) {
    return new EmbedBuilder()
      .setColor("Blue")
      .setTitle("📄 Nueva Postulación Policial")
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "👤 Postulante", value: `<@${user.id}>` },
        { name: "📎 OOC", value: data.ooc || "N/A" },
        { name: "🪪 Datos IC", value: data.ic || "N/A" },
        { name: "💬 Motivación", value: data.motivacion || "N/A" },
        { name: "🚓 Casos policiales (IC)", value: data.casos || "N/A" },
        { name: "⚖️ Situaciones y toma de decisiones (IC)", value: data.decisiones || "N/A" },
        { name: "🧠 Test de actitud y psicológico (IC)", value: data.psico || "N/A" }
      )
      .setTimestamp();
  }
};
