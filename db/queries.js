import { eventModel } from '@/models/event-models';
import { userModel } from '@/models/user-model';
import mongoose from 'mongoose';

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '@/utils/data-util';

async function getAllEvents(query) {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, 'i');
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }

  return replaceMongoIdInArray(allEvents);
}

async function getEventById(id) {
  const event = await eventModel.findById(id).lean();

  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function updateInterested(eventId, userId) {
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUser = event.interested_ids.find(
      (id) => id.toString() === userId
    );
    if (foundUser) {
      event.interested_ids.pull(userId);
    } else {
      event.interested_ids.push(userId);
    }
    event.save();
  }
}

async function updateGoing(eventId, userId) {
  const event = await eventModel.findById(eventId);

  event.going_ids.push(userId);

  event.save();
}

export {
  getAllEvents,
  getEventById,
  createUser,
  findUserByCredentials,
  updateInterested,
  updateGoing,
};
