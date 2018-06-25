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


export const watchCompetition = (compid) =>
  db.ref(`competitions/${compid}`).once('value');
