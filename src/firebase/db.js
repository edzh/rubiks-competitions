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

export const onceGetUser = (uid, cb) =>
  db.ref(`users/${uid}`).once('value', cb);


/*** COMPETITION LIST ***/
export const doCreateCompetition = (uid, compName, address, lat, lng, date, details, venue, 
      registrationLimit, 
      registrationFee,
      registrationBegin,
      registrationEnd,
      registrationRequirements,) => {
  const competitionsRef = db.ref(`competitions`);
  const competition = { 
    uid, compName, address, lat, lng, date, details, venue, 
    registrationLimit, 
    registrationFee,
    registrationBegin,
    registrationEnd,
    registrationRequirements, 
  };
  competitionsRef.push(competition);
}

export const onceGetCompetitions = () =>
  db.ref('competitions').once('value');

/*** ANNOUNCEMENT MODEL ***/
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

/*** COMPETITION VIEW ***/
export const onceGetCompetition = (compid, cb) =>
  db.ref(`competitions/${compid}`).once('value', cb);

export const watchCompetition = (compid, cb) =>
  db.ref(`competitions/${compid}`).on('value', cb);

export const watchAllCompetitions = (cb) =>
  db.ref('competitions').on('value', cb);

/* Deletes announcements, events, and relations associated with competitions */
export const deleteCompetition = (compid) => {
  db.ref(`competitions/${compid}`).remove();
  db.ref(`competitionAttendees/${compid}`).remove();
  db.ref('events').orderByChild('compid').equalTo(compid).once('value', snap => {
    snap.val() && Object.keys(snap.val()).forEach(key => {
      db.ref(`events/${key}`).remove();
      db.ref(`eventAttendees/${key}`).remove();
    })
  })
  db.ref('announcements').orderByChild('compid').equalTo(compid).once('value', snap => {
    snap.val() && Object.keys(snap.val()).forEach(key => {
      db.ref(`announcements/${key}`).remove();
    })
  })
  // 
}

export const deleteEvent = (eventid) => {
  db.ref(`events/${eventid}`).remove();
  db.ref(`eventAttendees/${eventid}`).remove();
}

/*** EVENT VIEW ***/
export const watchEvents = (compid, cb) =>
  db.ref('events').orderByChild('compid').equalTo(compid).on('value', cb);

export const doCreateEvent = (compid, name, round, startTime, endTime, date) => {
  const eventsRef = db.ref('events');
  const event = { compid, name, round, startTime, endTime, date };
  eventsRef.push(event);
}

export const doCreateEventUser = (eventid, uid, firstName, lastName) => {
  const eventUserRef = db.ref(`eventAttendees/${eventid}/${uid}`)
  eventUserRef.set({
    role: 'none',
    firstName,
    lastName,
    approved: false
  });
}

export const onceGetEvent = (eventid, cb) => 
  db.ref(`events/${eventid}`).once('value', cb);


export const onceGetUsersByEvent = (eventid, cb) =>
  db.ref('eventAttendees').orderByChild(eventid).on('value', snap => {
    !!snap.val() && Object.keys(snap.val()[eventid]).forEach(key => {
      db.ref(`users/${key}`).once('value', cb);
    })
  });

export const watchEventUsers = (eventid, cb) => 
  db.ref(`eventAttendees/${eventid}`).on('value', cb);

export const onceGetEventUsers = (eventid, cb) => 
  db.ref(`eventAttendees/${eventid}`).once('value', cb);

export const changeEventUserRole = (eventid, uid, role, cb) =>
  db.ref(`eventAttendees/${eventid}/${uid}`).child('role').set(role);

/*** ATTENDEE MODEL ***/
export const doCreateAttendee = (compid, uid, firstName, lastName) => {
  const competitionsAttendeesRef = db.ref(`competitionAttendees/${compid}/${uid}`)
  competitionsAttendeesRef.set({
    firstName,
    lastName
  });
}

export const watchAttending = (uid, cb) => 
  db.ref('competitionAttendees').orderByChild(`${uid}`).equalTo(true).once('value', cb);

export const checkUserAttendingCompetition = (uid, compid, cb) => 
  db.ref(`competitionAttendees/${compid}/${uid}`).equalTo(true).once('value', cb);

export const onceGetCompetitionsByUser = (uid, cb) => 
  db.ref('competitionAttendees').orderByChild(`${uid}`).on('child_added', snap => {
    db.ref(`competitions/${snap.key}`).once('value', cb);
  });

export const onceGetUsersByCompetition = (compid, cb) =>
  db.ref('competitionAttendees').orderByChild(compid).on('value', snap => {
    !!snap.val() && Object.keys(snap.val()[compid]).forEach(key => {
      db.ref(`users/${key}`).once('value', cb);
    })
  });

export const watchCompetitionAttendees = (compid, cb) => 
  db.ref(`competitionAttendees/${compid}`).once('value', cb);

export const test = (compid) =>
  db.ref(`event`).orderByChild('compid').equalTo(compid).remove();

export const detach = () =>
  db.ref.off();

export const onceGetUserInfo = (uid, cb) => 
  db.ref(`users/${uid}`).once('value', cb);