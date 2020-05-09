import * as firebase from 'firebase/app';

const Cycle = class Cycle {
  constructor() {
    this.id = '';
    this.type = '';
    this.description = '';
    this.reviewedCount = 0;
    this.lastReviewDate = null;
    this.nextReviewDate = null;
    this.createdUser = '';
    this.createdDate = null;
  }
};

const VocabularyCycle = class VocabularyCycle extends Cycle {
  constructor() {
    super();
    this.type = 'Vocabulary';
    this.vocabulary = '';
  }
};

const ReviewLog = class ReviewLog {
  constructor() {
    this.reviewedDate = null;
  }
};

const CycleConverter = {
  toFirestore(cycle) {
    const data = {
      type: cycle.type,
      description: cycle.description,
      reviewedCount: cycle.reviewedCount,
      lastReviewDate: cycle.lastReviewDate
        ? firebase.firestore.Timestamp.fromDate(cycle.lastReviewDate)
        : null,
      nextReviewDate: cycle.nextReviewDate
        ? firebase.firestore.Timestamp.fromDate(cycle.nextReviewDate)
        : null,
      createdUser: cycle.createdUser,
      createdDate: firebase.firestore.Timestamp.fromDate(cycle.createdDate),
    };

    switch (cycle.type.toLowerCase()) {
      case 'vocabulary':
        data.vocabulary = cycle.vocabulary;
        break;
    }

    return data;
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    let cycle = null;

    switch (data.type.toLowerCase()) {
      case 'vocabulary':
        cycle = new VocabularyCycle();
        cycle.vocabulary = data.vocabulary;
        break;
      default:
        cycle = new Cycle();
        break;
    }

    cycle.id = snapshot.id;
    cycle.type = data.type;
    cycle.description = data.description;
    cycle.reviewedCount = data.reviewedCount;
    cycle.lastReviewDate = data.lastReviewDate
      ? data.lastReviewDate.toDate()
      : null;
    cycle.nextReviewDate = data.nextReviewDate
      ? data.nextReviewDate.toDate()
      : null;
    cycle.createdUser = data.createdUser;
    cycle.createdDate = data.createdDate.toDate();

    return cycle;
  },
};

const ReviewLogConverter = {
  toFirestore(reviewLog) {
    return {
      reviewedDate: reviewLog.reviewedDate
        ? firebase.firestore.Timestamp.fromDate(reviewLog.reviewedDate)
        : null,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    const reviewLog = new ReviewLog();
    reviewLog.reviewedDate = data.reviewedDate
      ? data.reviewedDate.toDate()
      : null;

    return reviewLog;
  },
};

export {
  Cycle,
  VocabularyCycle,
  CycleConverter,
  ReviewLog,
  ReviewLogConverter,
};
