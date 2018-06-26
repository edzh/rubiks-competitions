import { db } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreateCompetition = (uid, compName, address, lat, lng, date) => {
  const competitionsRef = db.ref(`competitions`);
  const competition = { uid, compName, address, lat, lng, date };
  competitionsRef.push(competition);
}

export const onceGetCompetitions = () =>
  db.ref('competitions').once('value');


export const doCreateAnnouncement = (uid, compid, title, body, date) => {
  const announcementsRef = db.ref('announcements');
  const announcement = { uid, compid, title, body, date };
  announcementsRef.push(announcement);
}

export const onceGetAnnouncements = (compid) =>
  db.ref('announcements').orderByChild('compid').equalTo(compid).once('value');

export const watchAnnouncements = (compid, cb) =>
  db.ref('announcements').orderByChild('compid').equalTo(compid).on('value', cb);

export const deleteAnnouncement = (announcementid) =>
  db.ref(`announcements/${announcementid}`).remove();

export const watchCompetition = (compid, cb) =>
  db.ref(`competitions/${compid}`).on('value', cb);

export const watchAllCompetitions = (cb) =>
  db.ref('competitions').on('value', cb);

export const watchEvents = (compid, cb) =>
  db.ref('events').orderByChild('compid').equalTo(compid).on('value', cb);

export const doCreateEvent = (compid, name, startTime, endTime, date) => {
  const eventsRef = db.ref('events');
  const event = { compid, name, startTime, endTime, date };
  eventsRef.push(event);
}

export const doCreateAttendee = (compid, uid, firstName, lastName) => {
  const competitionsAttendeesRef = db.ref(`competitionAttendees/${compid}/${uid}`)
  const userRef = db.ref(`users/${uid}`);
  // const attendee = { firstName, lastName };
  competitionsAttendeesRef.set(true);
}

export const detach = () =>
  db.ref.off();
