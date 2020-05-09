import * as firebase from 'firebase/app';
import moment from 'moment';
import {
  CycleConverter,
  Cycle,
  ReviewLog,
  ReviewLogConverter,
} from './../models/cycles/Cycle';
import BaseError from './../models/Error';

export default {
  addCycle(cycle) {
    if (!cycle instanceof Cycle) {
      throw new BaseError('invalid-argument', 'The cycle must be Cycle type.');
    }

    const db = firebase.firestore();

    cycle.nextReviewDate = moment().add(1, 'days').toDate();
    cycle.createdUser = this.$store.state.user.uid;
    cycle.createdDate = new Date();

    return new Promise((resolve, reject) => {
      db.collection('cycles')
        .withConverter(CycleConverter)
        .add(cycle)
        .then(function (docRef) {
          resolve(docRef.id);
        })
        .catch(function (error) {
          console.error(`Adding cycle doc failed.
          Error Code: ${error.code}
          Error Message: ${error.message}`);

          reject(error);
        });
    });
  },
  addCycleReviewLog(cycle) {
    if (!cycle instanceof Cycle) {
      throw new BaseError('invalid-argument', 'The cycle must be Cycle type.');
    }

    const db = firebase.firestore();
    const cycleDocRef = db
      .collection('cycles')
      .doc(cycle.id)
      .withConverter(CycleConverter);
    const now = new Date();

    cycle.lastReviewDate = now;

    if (now >= cycle.nextReviewDate) {
      cycle.reviewedCount += 1;

      switch (cycle.reviewedCount) {
        case 1:
          // Next time is the second review, it is 7 days later.
          cycle.nextReviewDate = moment().add(7, 'days').toDate();
          break;
        case 2:
          // Next time is the third review, it is 30 days later.
          cycle.nextReviewDate = moment().add(30, 'days').toDate();
          break;
        case 3:
          // When this cycle has been reviewed three times, it ends the cycle.
          cycle.nextReviewDate = new Date('1970-01-01');
          break;
      }
    }

    return new Promise((resolve, reject) => {
      cycleDocRef
        .set(cycle)
        .then(function () {
          const reviewLog = new ReviewLog();
          reviewLog.reviewedDate = now;

          cycleDocRef
            .collection('logs')
            .withConverter(ReviewLogConverter)
            .add(reviewLog)
            .then(function () {
              resolve();
            })
            .catch(function (error) {
              console.error(`Adding cycle log failed.
                Error Code: ${error.code}
                Error Message: ${error.message}`);

              reject(error);
            });
        })
        .catch(function (error) {
          console.error(`Updating cycle doc failed.
          Error Code: ${error.code}
          Error Message: ${error.message}`);

          reject(error);
        });
    });
  },
  deleteCycleById(id) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      const cycleDocRef = db.collection('cycles').doc(id);

      cycleDocRef
        .delete()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(`Deleting cycle doc ${id} failed.
          Error Code: ${error.code}
          Error Message: ${error.message}`);

          reject(error);
        });
    });
  },
  getCycleById(id) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      const cycleDocRef = db.collection('cycles').doc(id);

      cycleDocRef
        .withConverter(CycleConverter)
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            reject(
              new BaseError('not-found', `The cycle doc ${id} is not found.`)
            );
          }
        })
        .catch((error) => {
          console.error(`Getting cycle doc ${id} failed.
          Error Code: ${error.code}
          Error Message: ${error.message}`);

          reject(error);
        });
    });
  },
  getCycleList() {
    const self = this;

    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      const cyclesRef = db.collection('cycles');

      cyclesRef
        .withConverter(CycleConverter)
        .where('createdUser', '==', self.$store.state.user.uid)
        .where('nextReviewDate', '>', new Date('1970-01-01'))
        .orderBy('nextReviewDate')
        .get()
        .then((querySnapshot) => {
          const cycles = [];

          querySnapshot.forEach(function (doc) {
            cycles.push(doc.data());
          });

          resolve(cycles);
        })
        .catch((error) => {
          console.error(`Listing cycle docs failed.
          Error Code: ${error.code}
          Error Message: ${error.message}`);

          reject(error);
        });
    });
  },
};
