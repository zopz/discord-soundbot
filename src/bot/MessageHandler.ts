import { Message } from 'discord.js';
import './discord/Message';

import * as ignoreList from '@util/db/IgnoreList';
import * as approvedChannelList from '@util/db/ApprovedChannelList';
import { config } from '@util/Container';
import CommandCollection from './CommandCollection';

export default class MessageHandler {
  private readonly commands: CommandCollection;
  public readonly VALIDCHANNELS = `Valid Channels: ${approvedChannelList}`;

  constructor(commands: CommandCollection) {
    this.commands = commands;
  }

  public handle(message: Message) {
    if (!this.isValidMessage(message)) return;
    if (!this.isValidChannel(message)) return;

    const messageToHandle = message;
    messageToHandle.content = message.content.substring(config.prefix.length);

    this.commands.execute(message);
  }

  private isValidChannel(message: Message) {
    if (approvedChannelList.count() === null) {
      return true;
    } else {
      if (approvedChannelList.exists(message.channel.id)) {
        return true;
      } else {
        message.reply(this.VALIDCHANNELS);
        message.delete();
        return;
      }
    }
  }

  private isValidMessage(message: Message) {
    return (
      !message.author.bot &&
      !message.isDirectMessage() &&
      message.hasPrefix(config.prefix) &&
      !ignoreList.exists(message.author.id)
    );
  }
}
