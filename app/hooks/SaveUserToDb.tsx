'use client';

import { useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function SaveUserToDb() {
  useEffect(() => {
    const userData = localStorage.getItem('studysync_user');
    if (userData) {
      const user = JSON.parse(userData);
      const userRef = doc(collection(db, 'users'), user.id);
      setDoc(userRef, user, { merge: true });
    }
  }, []);

  return null;
}
