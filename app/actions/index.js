'use server';

import { createUser } from '@/db/queries';
import {
  findUserByCredentials,
  updateInterested,
  updateGoing,
} from '@/db/queries';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);

  if (created) {
    redirect('/login');
  }
}

async function loginUser(formData) {
  try {
    const credential = {};
    credential.email = formData.get('email');
    credential.password = formData.get('password');
    const found = await findUserByCredentials(credential);
    return found;
  } catch (err) {
    throw new Error(`user with email ${credential.email} not found`);
  }
}

async function addInterestedEvent(eventId, userId) {
  try {
    await updateInterested(eventId, userId);
  } catch (err) {
    throw err;
  }

  revalidatePath('/');
}

async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
  } catch (err) {
    throw err;
  }

  revalidatePath('/');
  redirect('/');
}

export { registerUser, loginUser, addInterestedEvent, addGoingEvent };
