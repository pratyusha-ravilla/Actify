// // server/src/utils/fdpTemplateBase.js
// // Base structure for FDP Attended template (exported as fdpAttendedTemplateBase)

// export const fdpAttendedTemplateBase = {
//   header: {
//     title: "ATRIA INSTITUTE OF TECHNOLOGY",
//     department: "Department of Computer Science & Engineering",
//     program: "Program: Computer Science & Design",
//     reportTitle: "FACULTY DEVELOPMENT PROGRAM (FDP) ATTENDED REPORT",
//     academicYear: "ACADEMIC YEAR 2024–25",
//     address:
//       "ATRIA INSTITUTE OF TECHNOLOGY,\nAdjacent Bangalore Baptist Hospital, Hebbal,\nBengaluru - 560 024",
//   },
//   toc: [
//     "1. INVITATION / POSTER",
//     "2. RESOURCE PERSON DETAILS",
//     "3. SESSION REPORT",
//     "4. ATTENDANCE",
//     "5. PHOTOS",
//     "6. FEEDBACK",
//   ],
//   sections: [
//     {
//       id: "summary",
//       title: "SUMMARY (SESSION REPORT)",
//       fields: [
//         "Activity Name",
//         "Coordinator",
//         "Date",
//         "Duration",
//         "PO & POs",
//         "Short Summary",
//       ],
//     },
//     {
//       id: "poster",
//       title: "INVITATION / POSTER",
//       fields: ["Poster(s) - image/pdf filenames or placeholders"],
//     },
//     {
//       id: "resourcePersons",
//       title: "RESOURCE PERSON DETAILS",
//       fields: [
//         "Name",
//         "Designation",
//         "Institution",
//         "Email",
//         "Phone",
//         "Other Information",
//       ],
//       repeatable: true,
//     },
//     {
//       id: "attendance",
//       title: "ATTENDANCE",
//       fields: ["Attendance file(s) - image/pdf filenames or placeholders"],
//     },
//     {
//       id: "photos",
//       title: "PHOTOS",
//       fields: ["Geo-tagged photo filenames or placeholders"],
//     },
//     {
//       id: "feedback",
//       title: "FEEDBACK",
//       fields: ["Feedback form(s) - image/pdf filenames or placeholders"],
//     },
//   ],
// };



// server/src/utils/fdpTemplateBase.js
export const fdpAttendedTemplateBase = {
  activityName: "Faculty Development Program on AI/ML",
  coordinator: "",
  date: "",
  duration: "",
  venue: "",
  pos: "",
  summary: "",
  tocList: [
    { slNo: "1", content: "Invitation / Poster" },
    { slNo: "2", content: "Resource Person Details" },
    { slNo: "3", content: "Session Report" },
    { slNo: "4", content: "Attendance" },
    { slNo: "5", content: "Photos" },
    { slNo: "6", content: "Feedback" }
  ],
  brochure: [],
  geoTagPhotos: [],
  attendance: [],
  attendanceFile: "",
  resourcePersons: [
    {
      name: "",
      designation: "",
      institution: "",
      email: "",
      phone: "",
      image: "",
      otherInformation: ""
    }
  ],
  feedback: "",
  createdBy: "faculty"
};
