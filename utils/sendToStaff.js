// utils/sendToStaff.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (user, data) => {
  const channelId = process.env.REVIEW_CHANNEL_ID;
  const channel = user.client.channels.cache.get(channelId);

  if (!channel) return console.log("❌ No se encontró REVIEW_CHANNEL_ID");

  const embed = new EmbedBuilder()
    .setTitle("📄 Nueva Postulación Policial")
    .setColor("#2b90ff")
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "👤 Postulante", value: `<@${user.id}>`, inline: false },
      { name: "📎 OOC", value: data.ooc || "*No enviado*", inline: false },
      { name: "🪪 Datos IC (1/2)", value: data.ic_parte1 || "*No enviado*", inline: false },
      { name: "🪪 Datos IC (2/2)", value: data.ic_parte2 || "*No enviado*", inline: false },
      { name: "💬 Motivación", value: data.motivacion || "*No enviado*", inline: false },
      { name: "🚓 Casos policiales (IC)", value: data.casos || "*No enviado*", inline: false },
      { name: "⚖️ Toma de decisiones (IC)", value: data.decisiones || "*No enviado*", inline: false },
      { name: "🧠 Psicológico", value: data.psico || "*No enviado*", inline: false }
    )
    .setFooter({ text: `ID del postulante: ${user.id}` })
    .setTimestamp();

  // Botones STAFF
  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`accept_${user.id}`)
      .setLabel("✔️ Aceptar")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId(`deny_${user.id}`)
      .setLabel("❌ Rechazar")
      .setStyle(ButtonStyle.Danger)
  );

  channel.send({ embeds: [embed], components: [buttons] });
};
