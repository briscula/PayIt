import {Firestore} from '@google-cloud/firestore';
import test from 'firebase-functions-test';

describe('onBillChange', () => {
  const testHelper = test();

  const beforeSnap = testHelper.firestore.makeDocumentSnapshot(
    {
      id: 'ID',
      description: 'Random New',
      generationDay: 15,
      expirationDay: 20,
      frequency: 'MONTHLY',
      permissions: {['UID']: 'AUTHOR'},
      type: 'BILL',
      value: 450.85,
    },
    'bills/ID',
  );

  const snap = testHelper.firestore.makeDocumentSnapshot(
    {
      id: 'ID',
      description: 'Random New',
      generationDay: 15,
      expirationDay: 25,
      frequency: 'MONTHLY',
      permissions: {['UID']: 'AUTHOR'},
      type: 'BILL',
      value: 480.85,
    },
    'bills/ID',
  );

  const dateString = '2018-02';

  const pendencyKey = `${snap.id}-${dateString}`;
  const mockedPendency = {
    id: pendencyKey,
    description: 'Random Outdated',
    expirationDay: '2018-02-20',
    value: 450.85,
    type: 'NEXT',
  };

  const mockedResult = {
    user: {uid: 'UID', payday: 10},
    pendencies: {
      id: 'UID',
      data: {
        [pendencyKey]: mockedPendency,
      },
    },
  };

  const mockFunction = jest.fn().mockReturnValue(new Promise((resolve) => resolve(mockedResult)));

  jest.mock('./rest/user', () => ({
    getUserPendencies: mockFunction,
  }));

  jest.mock('firebase-admin', () => ({firestore: () => null as Firestore}));

  const mockedComputeBill = jest.fn();
  const mockedSetPendency = jest.fn();

  jest.mock('./core/pendency', () => ({
    computeBillPendency: mockedComputeBill,
  }));

  jest.mock('./rest/pendency', () => ({
    setPendency: mockedSetPendency,
  }));

  const {onBillChange} = require('./onBillChange');
  const wrapped = testHelper.wrap(onBillChange);

  it('should call compute bill right and set pendency', async () => {
    const change = testHelper.makeChange(beforeSnap, snap);

    await wrapped(change);
    expect(mockedComputeBill).toBeCalledWith(snap.data(), {[pendencyKey]: mockedPendency}, 10);
    expect(mockedSetPendency).toBeCalled();
  });
});
