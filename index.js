require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder
} = require("discord.js");

const policeHandler = require("./modules/Police/handler");
const rejectModal = require("./modules/Police/rejectModal");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// ==========================
// BOT LISTO
// ==========================
client.once("ready", () => {
  console.log("🔥 BOT ENCENDIDO CORRECTAMENTE");
  console.log(`✔ Logueado como: ${client.user.tag}`);
  console.log("⏳ Esperando comandos...");
});

// ==========================
// PANEL DE POSTULACIÓN
// ==========================
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "!panelpolicia") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("start_police")
        .setLabel("📩 Iniciar Postulación Policía")
        .setStyle(ButtonStyle.Primary)
    );

    msg.channel.send({
      content: "Haz clic para iniciar la postulación policial:",
      components: [row]
    });
  }
});

// ==========================
// INTERACCIONES
// ==========================
client.on("interactionCreate", async (interaction) => {

  // =====================================================
  // BOTONES
  // =====================================================
  if (interaction.isButton()) {

    // 🟦 INICIO DE POSTULACIÓN
    if (interaction.customId === "start_police") {
      console.log("[LOG] Botón presionado: start_police");
      return policeHandler.start(interaction);
    }

    // 🟦 BOTONES DE "SIGUIENTE"
    const handledNext = await policeHandler.handleButton(interaction);
    if (handledNext) return;

    // ===================================================================
    // 🟩 ACEPTAR POSTULACIÓN  →  accept_123456789
    // ===================================================================
    if (interaction.customId.startsWith("accept_")) {
      const userId = interaction.customId.replace("accept_", "");

      const member = await interaction.guild.members.fetch(userId).catch(() => null);

      if (!member)
        return interaction.reply({
          content: "❌ Usuario no encontrado en el servidor.",
          ephemeral: true
        });

      const roleId = process.env.APPROVED_ROLE_ID;

      try {
        await member.roles.add(roleId);
      } catch (e) {
        console.log("Error asignando rol:", e);
      }

      await interaction.reply({
        content: `✔️ Postulación **ACEPTADA**.\nRol asignado a <@${userId}>.`,
        ephemeral: false
      });

      // =====================================================
      // ✉️ LOG AL CANAL DE APROBACIONES
      // =====================================================
      const approvalLog = interaction.guild.channels.cache.get(
        process.env.APPROVAL_LOG_CHANNEL
      );

      if (approvalLog) {
        const logEmbed = new EmbedBuilder()
          .setColor("#00ff8f")
          .setTitle("👮 Postulación ACEPTADA")
          .addFields(
            { name: "📌 Usuario", value: `<@${userId}>` },
            { name: "🛂 Aprobado por", value: `<@${interaction.user.id}>` },
            { name: "📅 Fecha", value: `<t:${Math.floor(Date.now()/1000)}:F>` }
          );

        approvalLog.send({ embeds: [logEmbed] });
      }

      // =====================================================
      // ✉️ DM OFICIAL (MEJORADO)
      // =====================================================
      const acceptEmbed = new EmbedBuilder()
        .setColor("#1e90ff")
        .setTitle("🏛️ Departamento de LSPD — Resultado de Postulación")
        .setThumbnail("https://mir-s3-cdn-cf.behance.net/projects/404/d5643e165419793.Y3JvcCw5OTksNzgyLDAsMTA4.png")
        .setDescription(
          `Estimado ciudadano,\n\n` +
          `El Departamento de Policía ha finalizado la revisión de tu postulación.\n` +
          `Nos complace informarte que **has sido seleccionado para unirte oficialmente a la LSPD**.\n\n` +
          `A partir de este momento formas parte del grupo de aspirantes aprobados, y un miembro del Alto Mando se comunicará contigo para indicarte los siguientes pasos.`
        )
        .addFields(
          {
            name: "📌 ¿Qué ocurre ahora?",
            value:
              "• Serás contactado para tu capacitación inicial.\n" +
              "• Recibirás instrucciones sobre protocolos internos.\n" +
              "• Mantente atento a los canales oficiales del departamento."
          },
          {
            name: "📅 Fecha de aprobación",
            value: `<t:${Math.floor(Date.now() / 1000)}:F>`
          }
        )
        .setFooter({
          text: "Los Santos dependen de ti. Bienvenido a la fuerza.",
          iconURL: "https://mir-s3-cdn-cf.behance.net/projects/404/d5643e165419793.Y3JvcCw5OTksNzgyLDAsMTA4.png"
        });

      await member.send({ embeds: [acceptEmbed] }).catch(() => {});

      return;
    }

    // ===================================================================
    // 🟥 RECHAZAR POSTULACIÓN → deny_123456789
    // ===================================================================
    if (interaction.customId.startsWith("deny_")) {
      const userId = interaction.customId.replace("deny_", "");
      const modal = rejectModal.build(userId);
      return interaction.showModal(modal);
    }
  }

  // =====================================================
  // MANEJO DE MODALES (POSTULACIÓN)
  // =====================================================
  if (interaction.isModalSubmit()) {

    // 🔵 MODALES DEL SISTEMA POLICIAL
    if (!interaction.customId.startsWith("rejectmodal_")) {
      return policeHandler.handleModal(interaction);
    }

    // ===================================================================
    // MODAL DE RECHAZO
    // ===================================================================
    const targetId = interaction.customId.replace("rejectmodal_", "");
    const reason = interaction.fields.getTextInputValue("reject_reason");

    const member = await interaction.guild.members.fetch(targetId).catch(() => null);

    if (!member)
      return interaction.reply({
        content: "❌ No se encontró al usuario a rechazar.",
        ephemeral: true
      });

    // Respuesta visible en el canal STAFF
    await interaction.reply({
      content: `❌ Postulación **RECHAZADA** para <@${targetId}>.\n📝 Motivo: ${reason}`,
      ephemeral: false
    });

    // =====================================================
    // ✉️ LOG AL CANAL DE RECHAZOS
    // =====================================================
    const denyLog = interaction.guild.channels.cache.get(
      process.env.DENY_LOG_CHANNEL
    );

    if (denyLog) {
      const denyEmbed = new EmbedBuilder()
        .setColor("#ff4b4b")
        .setTitle("🚨 Postulación RECHAZADA")
        .addFields(
          { name: "📌 Usuario", value: `<@${targetId}>` },
          { name: "🛂 Rechazado por", value: `<@${interaction.user.id}>` },
          { name: "📝 Motivo", value: reason },
          { name: "📅 Fecha", value: `<t:${Math.floor(Date.now()/1000)}:F>` }
        );

      denyLog.send({ embeds: [denyEmbed] });
    }

    // DM al usuario
    await member.send({
      content:
        `🚨 **Resultado de tu postulación policial**\n\n` +
        `Lamentamos informarte que **no fuiste aceptado** en esta convocatoria.\n\n` +
        `📝 **Motivo del rechazo:**\n${reason}\n\n` +
        `Puedes volver a postularte más adelante.`
    }).catch(() => {});

    return;
  }
});

// ==========================
// LOGIN DEL BOT
// ==========================
client.login(process.env.DISCORD_TOKEN);

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot LSPD en funcionamiento."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Webserver activo en Render — Puerto ${PORT}`);
});