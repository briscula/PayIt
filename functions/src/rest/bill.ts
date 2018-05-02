import {Firestore} from '@google-cloud/firestore';

import {Bill, IndexedBills} from 'models';

export const requestAllBills = async (firestore: Firestore) => {
  const billsDocuments = await firestore.collection('/bills').get();

  const bills = {} as IndexedBills;
  billsDocuments.forEach((doc) => {
    const bill = doc.data() as Bill;
    bills[bill.id] = bill;
  });

  return bills;
};

export const requestBill = async (firestore: Firestore, billId: string) => {
  const billSnapshot = await firestore.doc(`/bills/${billId}`).get();
  return billSnapshot.data() as Bill;
};
