import "../index";
import { isValidObjectId } from "mongoose";
import { MessageModel } from "../Models";

/**
 *
 * @param { object } message
 * @description
 * Receives an incoming sanitized message object.
 * Message object has fields => name, email and message
 * in the database current date and isRead statuses are added before adding
 * returns the newly created message from the DB
 * if any error occurs while adding the message, the error is thrown by the DB
 * which is caught at the Message API error handler
 * @returns new message added to the DB
 */
export async function addNewMessageToDB(message) {
  const newMessage = await MessageModel.create(message);
  if (!newMessage) throw `Couldn't add message to DB`;
  return newMessage;
}

/**
 *
 * @description
 * returns all the client messages from the DB (both read and unread)
 * if any error occurs while adding the message, the error is thrown by the DB
 * which is caught at the Message API error handler
 * @returns list of all messages
 */
export async function getAllMessagesFromDB() {
  const allMessages = await MessageModel.find();
  return allMessages;
}

/**
 *
 * @param { ObjectId } messageID
 * @param {boolean} currentReadStatus
 * Receives an incoming message ID.
 * Toggles the message's read status from DB by message ID.
 * Return the updated message
 * if any error occurs while adding the message, the error is thrown by the DB
 * which is caught at the Message API error handler
 * @returns deleted message object
 */
export async function toggleMessageReadStatus(messageID, currentReadStatus) {
  //  check if incoming messageID is a valid mongoose ObjectID
  if (!isValidObjectId(messageID)) throw "Invalid message ID";

  const editedMessage = await MessageModel.findByIdAndUpdate(
    messageID,
    {
      $set: {
        isRead: !currentReadStatus,
      },
    },
    {
      new: true,
      upsert: false,
    }
  );

  // if editedMessage is null ie messageID does not exist
  if (!editedMessage) throw `Message with ID [${messageID}] not found`;

  return editedMessage;
}

/**
 *
 * @param { ObjectId } messageID
 * @description
 * Receives an incoming message ID.
 * Deletes the message from DB by message ID.
 * Return the deleted message
 * if any error occurs while adding the message, the error is thrown by the DB
 * which is caught at the Message API error handler
 * @returns deleted message object
 */
export async function deleteMessageFromDB(messageID) {
  //  check if incoming messageID is a valid mongoose ObjectID
  if (!isValidObjectId(messageID)) throw "Invalid message ID";

  const deletedMessage = await MessageModel.findByIdAndDelete(messageID);

  // if deletedMessage is null ie messageID does not exist
  if (!deletedMessage) throw `Message with ID [${messageID}] not found`;

  return deletedMessage;
}
