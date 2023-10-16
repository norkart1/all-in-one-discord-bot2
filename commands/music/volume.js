const { Client, Message, MessageEmbed } = require("discord.js");
const functions = require("../../handlers/function");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "volume",
  aliases: ["vol"],
  useage: "volume <VOLUME number>",
  description: "Changes volume",
  category: "music",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "Nothing playing!"
      );

    //if member not connected return error
    if (!message.member.voice.channel)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " You must join a Voice Channel"
      );

    //if they are not in the same channel, return error
    if (message.member.voice.channel.id != message.guild.me.voice.channel.id)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " You must join my Voice Channel: " +
          ` \`${
            message.guild.me.voice.channel.name
              ? message.guild.me.voice.channel.name
              : ""
          }\``
      );

    //if no arguments, return error
    if (!args[0])
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " Please add a valid Volume Number",
        "The Number must be between `0` and `500`"
      );

    //get the Number count if too big return error
    if (Number(args[0]) > 500 && Number(args[0]) < 0)
      return functions.embedbuilder(
        client,
        "null",
        message,
        config.colors.no,
        "Not valid Number",
        "Please use a volume Number between `0` and `500`"
      );

    //send information message
    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "VOLUME!",
      `changed volume to \`${args[0]} %\``
    );

    //set the volume
    await distube.setVolume(message , args[0])
  },
};
