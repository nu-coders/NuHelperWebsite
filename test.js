let a = [
  [
    {
      credits: '4.00',
      instructors: 'Asmaa Mohamed Abushady - Arwa Obada Kohela',
      seatsLeft: 46,
      sectionNumber: '01',
      sectionLetter: '',
      courseId: 'BIO307',
      courseName: 'Molecular and Cellular Biology',
      courseType: 'Lecture',
      schedule: [
        {
          endTime: [11, 29, 0],
          floorId: 'SUB1',
          roomId: '301',
          startTime: [8, 30, 0],
          day: 0,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lecture',
          credits: '4.00',
          section: '01',
          seatsLeft: 46,
          id: 0,
          title: 'BIO307',
          startDate: '2023-01-01T06:30:00.000Z',
          endDate: '2023-01-01T09:29:00.000Z',
        },
        {
          endTime: [15, 29, 0],
          floorId: 'SUB1',
          roomId: '301',
          startTime: [12, 30, 0],
          day: 0,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lecture',
          credits: '4.00',
          section: '01',
          seatsLeft: 46,
          id: 1,
          title: 'BIO307',
          startDate: '2023-01-01T10:30:00.000Z',
          endDate: '2023-01-01T13:29:00.000Z',
        },
      ],
    },
    {
      credits: '0.00',
      instructors: 'Fatma Elzahraa Sultan Bekhit - Laila Ashraf Hassan',
      seatsLeft: 16,
      sectionNumber: '01',
      sectionLetter: 'A',
      courseId: 'BIO307',
      courseName: 'Molecular and Cellular Biology',
      courseType: 'Lab',
      schedule: [
        {
          endTime: [11, 29, 0],
          floorId: 'RUB1',
          roomId: '365',
          startTime: [8, 30, 0],
          day: 1,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lab',
          credits: '0.00',
          section: '01A',
          seatsLeft: 16,
          id: 2,
          title: 'BIO307',
          startDate: '2023-01-02T06:30:00.000Z',
          endDate: '2023-01-02T09:29:00.000Z',
        },
        {
          endTime: [15, 29, 0],
          floorId: 'RUB1',
          roomId: '365',
          startTime: [12, 30, 0],
          day: 1,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lab',
          credits: '0.00',
          section: '01A',
          seatsLeft: 16,
          id: 3,
          title: 'BIO307',
          startDate: '2023-01-02T10:30:00.000Z',
          endDate: '2023-01-02T13:29:00.000Z',
        },
        {
          endTime: [13, 29, 0],
          floorId: 'RUB1',
          roomId: '365',
          startTime: [10, 30, 0],
          day: 6,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lab',
          credits: '0.00',
          section: '01A',
          seatsLeft: 16,
          id: 4,
          title: 'BIO307',
          startDate: '2023-01-07T08:30:00.000Z',
          endDate: '2023-01-07T11:29:00.000Z',
        },
        {
          endTime: [16, 30, 0],
          floorId: 'RUB1',
          roomId: '365',
          startTime: [13, 30, 0],
          day: 6,
          courseId: 'BIO307',
          courseName: 'Molecular and Cellular Biology',
          courseType: 'Lab',
          credits: '0.00',
          section: '01A',
          seatsLeft: 16,
          id: 5,
          title: 'BIO307',
          startDate: '2023-01-07T11:30:00.000Z',
          endDate: '2023-01-07T14:30:00.000Z',
        },
      ],
    },
    {
      credits: '2.00',
      instructors: 'Galal Raafat Elmissary',
      seatsLeft: 34,
      sectionNumber: '01',
      sectionLetter: '',
      courseId: 'ARTS201',
      courseName: 'Introduction to Photography',
      courseType: 'Lecture',
      schedule: [
        {
          endTime: [12, 29, 0],
          floorId: 'GUB1',
          roomId: '132',
          startTime: [9, 30, 0],
          day: 2,
          courseId: 'ARTS201',
          courseName: 'Introduction to Photography',
          courseType: 'Lecture',
          credits: '2.00',
          section: '01',
          seatsLeft: 34,
          id: 6,
          title: 'ARTS201',
          startDate: '2023-01-03T07:30:00.000Z',
          endDate: '2023-01-03T10:29:00.000Z',
        },
        {
          endTime: [14, 29, 0],
          floorId: 'GUB1',
          roomId: '132',
          startTime: [11, 30, 0],
          day: 3,
          courseId: 'ARTS201',
          courseName: 'Introduction to Photography',
          courseType: 'Lecture',
          credits: '2.00',
          section: '01',
          seatsLeft: 34,
          id: 7,
          title: 'ARTS201',
          startDate: '2023-01-04T09:30:00.000Z',
          endDate: '2023-01-04T12:29:00.000Z',
        },
      ],
    },
  ],
];
let displayTable = [];
for (const table of a) {
  let i = 0;
  let courses = [];
  for (const course of table) {
    course.schedule.map((meeting) => {
      meeting.courseId = course.courseId;
      meeting.courseName = course.courseName;
      meeting.courseType = course.courseType;
      meeting.credits = course.credits;
      meeting.section = course.sectionNumber + course.sectionLetter;
      meeting.seatsLeft = course.seatsLeft;
      meeting.id = i;
      meeting.title = meeting.courseId;
      meeting.startDate = new Date( // no change
        2023,
        0,
        meeting.day + 1,
        meeting.startTime[0],
        meeting.startTime[1]
      );
      meeting.endDate = new Date(2023, 0, meeting.day + 1, meeting.endTime[0], meeting.endTime[1]); // no change
      i++;
      courses.push(meeting);
    });
  }
  displayTable.push(courses);
}

console.log(displayTable);
