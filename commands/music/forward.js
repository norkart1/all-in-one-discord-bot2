const { Client, Message, MessageEmbed } = require("discord.js");
const functions = require("../../handlers/function");
const config = require("../../config/config.json");
const distube = require("../../utils/etc/player");

module.exports = {
  name: "forward",
  aliases: ["fwd", "for"],
  useage: "forward <DURATION>",
  description: "Forwards the Song forward: seconds",
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

    //get queue
    let queue = distube.getQueue(message);

    //if no queue return error
    if (!queue)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "There is nothing playing!"
      );

    //get the seektime
    let seektime = queue.currentTime + Number(args[0]) * 1000;
    if (seektime >= queue.songs[0].duration * 1000)
      seektime = queue.songs[0].duration * 1000 - 1;

    //seek
    distube.seek(message, Number(seektime));

    //Send info message
    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "FORWARD!",
      `Forwarded the song for \`${Number(args[0])} seconds\``
    );
  },
};
