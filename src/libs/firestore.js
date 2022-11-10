import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import * as flyd from 'flyd'

const streamDoc = (stream) => (doc) => {
  stream(doc.data()) 
}
const handleError = err => {
  console.log(`Encountered error: ${err}`);
}

export const create = (collection, talentId) => {
  const stream = flyd.stream();
  const query = async (limit, notificationId) => {
    let startAfterDoc;
    let builder = firebase.firestore().collection(collection)
      .where('channel', '==', 'inApp')
      .where('recipientType', '==', 'talent')
      .where('recipientId', '==', talentId)
      .orderBy('date', 'desc')
      .limit(limit)
    ;
    if (notificationId){
      startAfterDoc = await firebase.firestore().collection(collection)
        .doc(`${notificationId}-inApp`)
        .get();
      console.log(startAfterDoc.data().lastEvent)
      builder = builder.startAfter(startAfterDoc);
    }
    return builder.get()
  }
    
  const getHistorical = (limit, notificationId) => {
    return query(limit, notificationId)
      .then((historical) => {
        historical.docs.forEach(streamDoc(stream))
      }, handleError)
  }
  
  const subscribe = (limit = 20) => {
    query(limit)
      .then((historical) => {
        historical.docs.reverse().forEach(streamDoc(stream))
      }, handleError)
    firebase.firestore().collection(collection)
      .where('channel', '==', 'inApp')
      .where('recipientType', '==', 'talent')
      .where('recipientId', '==', talentId)
      .orderBy('date', 'asc')
      .limitToLast(1)
      .onSnapshot(realtimeNotification => {
        realtimeNotification.docs.forEach(streamDoc(stream))
      }, handleError);
  }
  return {
    stream,
    subscribe,
    getHistorical
  }
}
