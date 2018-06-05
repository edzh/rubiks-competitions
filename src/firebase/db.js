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

export const doCreateCompetition = (organizer, compName, address, lat, lng, date) => {
  const competitionsRef = db.ref(`competitions`);
  const competition = { 
    organizer,
    compName,
    address,
    lat,
    lng,
    date,
  };
  competitionsRef.push(competition);
}

export const onceGetCompetitions = () =>
  db.ref('competitions').once('value');