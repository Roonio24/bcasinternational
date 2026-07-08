import { Course, SuccessStory } from "../types";

export const PRE_LOAD_COURSES: Course[] = [
  // UNITED KINGDOM
  {
    id: "uk-uwl-software",
    universityName: "University of West London",
    courseName: "BSc (Hons) Software Engineering with Cyber Security",
    country: "United Kingdom",
    duration: "3 Years (Option for 1 Year Placement)",
    intake: "September / January",
    annualTuition: "£14,750 / Year",
    estimatedLivingCost: "£13,300 / Year (London allowance)",
    entryRequirements: "Minimum CCC at standard A-Levels / Pearson BTEC Level 3 (or BCAS Foundation).",
    englishRequirement: "IELTS 6.0 (no band less than 5.5) or Pearson PTE 51.",
    scholarshipAvailable: "International Ambassador Scholarship up to £2,000 off Year 1 tuition.",
    ranking: "Named University of the Year for Student Careers (2024 Daily Mail University Guide)",
    popularityScore: 94,
    employabilityRate: "98% within 6 months"
  },
  {
    id: "uk-cov-computing",
    universityName: "Coventry University",
    courseName: "BSc (Hons) Computer Science & Artificial Intelligence",
    country: "United Kingdom",
    duration: "3 Years",
    intake: "September / January / May",
    annualTuition: "£18,250 / Year",
    estimatedLivingCost: "£9,500 / Year (Midlands economy)",
    entryRequirements: "Minimum BBB at A-Levels including Mathematics / science subjects.",
    englishRequirement: "IELTS 6.5 (minimum 5.5 in each element) or equivalent.",
    scholarshipAvailable: "Global Academic Merit Scholarship worth £1,500.",
    ranking: "Top 30 globally for International Students (QS World Rankings)",
    popularityScore: 89,
    employabilityRate: "95% in professional roles"
  },
  {
    id: "uk-cardiff-business",
    universityName: "Cardiff Metropolitan University",
    courseName: "BA (Hons) International Business Management",
    country: "United Kingdom",
    duration: "3 Years (Option for sandwich year)",
    intake: "September / January",
    annualTuition: "£15,000 / Year",
    estimatedLivingCost: "£8,800 / Year (Highly affordable Welsh capital)",
    entryRequirements: "2 Passes at London/Local A-Levels or completion of matching level 5 Higher National Diploma.",
    englishRequirement: "IELTS 6.0 with minimum 5.5 in all bands.",
    scholarshipAvailable: "Welsh Global Wales Scholarship worth up to £5,000.",
    ranking: "Ranked Top 10 in UK for Student Support Services",
    popularityScore: 92,
    employabilityRate: "96% employer satisfaction"
  },
  {
    id: "uk-port-biomed",
    universityName: "University of Portsmouth",
    courseName: "BSc (Hons) Biomedical Science (IBMS Accredited)",
    country: "United Kingdom",
    duration: "3 Years",
    intake: "September Only",
    annualTuition: "£17,900 / Year",
    estimatedLivingCost: "£10,200 / Year",
    entryRequirements: "Grades BCC at A-Level to include Chemistry, Biology or Applied Science.",
    englishRequirement: "IELTS 6.5 with at least 6.0 in reading and writing.",
    scholarshipAvailable: "South Coast Regional Scholarship of £3,000.",
    ranking: "5-Star Rating for Teaching and Facilities (QS Stars)",
    popularityScore: 85,
    employabilityRate: "94% in medical & research fields"
  },

  // AUSTRALIA
  {
    id: "aus-deakin-it",
    universityName: "Deakin University",
    courseName: "Bachelor of Information Technology",
    country: "Australia",
    duration: "3 Years",
    intake: "March / July / November",
    annualTuition: "AUD 33,800 / Year",
    estimatedLivingCost: "AUD 22,500 / Year",
    entryRequirements: "Successful High School Diploma with 70% average or equivalent foundation course.",
    englishRequirement: "IELTS 6.0 with no band less than 6.0.",
    scholarshipAvailable: "Deakin Vice-Chancellor's Academic Excellence Scholarship covering 25% of fees.",
    ranking: "Top 1% of Universities globally for IT and Computer Science",
    popularityScore: 91,
    employabilityRate: "97% graduation placement"
  },
  {
    id: "aus-swin-design",
    universityName: "Swinburne University of Technology",
    courseName: "Bachelor of Design (UX / Interaction Design)",
    country: "Australia",
    duration: "3 Years (Melboune Campus)",
    intake: "March / August",
    annualTuition: "AUD 31,500 / Year",
    estimatedLivingCost: "AUD 24,000 / Year (Melbourne living)",
    entryRequirements: "Satisfactory completion of Year 12 + Creative Portfolio review submission.",
    englishRequirement: "IELTS 6.5 with no band lower than 6.0.",
    scholarshipAvailable: "Swinburne International Excellence Scholarship up to 30% reduction.",
    ranking: "Ranked Top 50 Globally for Art and Design under 50 years old",
    popularityScore: 87,
    employabilityRate: "94% in design studios"
  },
  {
    id: "aus-woll-eng",
    universityName: "University of Wollongong",
    courseName: "Bachelor of Engineering (Hons) - Civil / Mechanical",
    country: "Australia",
    duration: "4 Years",
    intake: "February / July",
    annualTuition: "AUD 38,900 / Year",
    estimatedLivingCost: "AUD 20,000 / Year (Scenic coastal living)",
    entryRequirements: "Advanced math prerequisites. standard local A-Levels with sound B/C grades.",
    englishRequirement: "IELTS 6.5 with at least 6.0 in each subscores.",
    scholarshipAvailable: "UOW Diplomat Scholarship covering 30% of total course fees.",
    ranking: "Ranked 14th in the world in QS Top 50 Under 50",
    popularityScore: 88,
    employabilityRate: "98% within civil engineering sectors"
  },

  // CANADA
  {
    id: "can-york-business",
    universityName: "Yorkville University",
    courseName: "Bachelor of Business Administration (Project Management)",
    country: "Canada",
    duration: "3 Years (Accelerated stream available)",
    intake: "January / April / July / October",
    annualTuition: "CAD 21,500 / Year",
    estimatedLivingCost: "CAD 18,000 / Year (Toronto or Vancouver)",
    entryRequirements: "High School Diploma with minimum 65% performance average in core grades.",
    englishRequirement: "IELTS 6.5 overall or Duolingo English Test 115.",
    scholarshipAvailable: "Regional Student Bursary of CAD 3,000 per year.",
    ranking: "Accredited under Ontario/BC Degree Authorization (Highly PGWP-friendly)",
    popularityScore: 93,
    employabilityRate: "96% graduate placement rate"
  },
  {
    id: "can-seneca-it",
    universityName: "Seneca College (Polytechnic)",
    courseName: "Honours Bachelor of Technology (Software Development)",
    country: "Canada",
    duration: "4 Years (with Co-op Terms)",
    intake: "September / January",
    annualTuition: "CAD 19,800 / Year",
    estimatedLivingCost: "CAD 19,500 / Year",
    entryRequirements: "Grade 12 Senior Mathematics and high science subject marks.",
    englishRequirement: "IELTS 6.5 with no band score below 6.0.",
    scholarshipAvailable: "Entrance scholarships ranging from CAD 1,000 to CAD 2,000.",
    ranking: "Named Ontario's #1 College for Applied Technology Alliances",
    popularityScore: 95,
    employabilityRate: "99% in technology positions"
  },

  // GERMANY
  {
    id: "ger-gisma-mba",
    universityName: "GISMA University of Applied Sciences",
    courseName: "MSc International Business Management (Taught in English)",
    country: "Germany",
    duration: "1 Year / 2 Years (Berlin Campus)",
    intake: "September / January / May",
    annualTuition: "€11,800 / Year",
    estimatedLivingCost: "€10,200 / Year",
    entryRequirements: "Recognized Bachelor's Degree with minimum GPA equivalent to German 2.5 grade.",
    englishRequirement: "IELTS 6.0 or GISMA Internal Language Pass.",
    scholarshipAvailable: "Up to 30% discount via Global Leadership Scholarship.",
    ranking: "State-approved program with high-class European Business partners",
    popularityScore: 86,
    employabilityRate: "93% in Berlin corporate hubs"
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-theniniyan",
    studentName: "Theniniyan Thureshkumar",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of East London",
    courseName: "BSc (Hons) Applied Computing (Top-Up)",
    placedYear: "2025",
    testimonial: "Successfully obtained my UK Student Visa to pursue BSc (Hons) Applied Computing (Top-Up) at the University of East London. The entire process was handled professionally and seamlessly by BCAS International!",
    currentRole: "Applied Computing Scholar",
    studentImage: "/src/assets/images/theniyan.jpg"
  },
  {
    id: "story-vijenthira",
    studentName: "Vijenthira Vijayasri",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of East London",
    courseName: "BSc (Hons) Applied Computing (Top-Up)",
    placedYear: "2025",
    testimonial: "Extremely grateful to BCAS International for helping me obtain my UK Student Visa to pursue BSc (Hons) Applied Computing (Top-Up) at the University of East London. Their guidance and counselor support were excellent.",
    currentRole: "Computing & IT Aspirant",
    studentImage: "/src/assets/images/vijenthira.jpg"
  },
  {
    id: "story-ludsiya",
    studentName: "Ludsiya Manoranjithan",
    originCountry: "Sri Lanka",
    destinationUniversity: "Birmingham City University",
    courseName: "BSc (Hons) Biomedical Science with Foundation Year",
    placedYear: "2025",
    testimonial: "My journey to obtaining a UK Student Visa for a BSc (Hons) in Biomedical Science with Foundation Year at Birmingham City University was made possible by the incredible team at BCAS International. Highly recommended!",
    currentRole: "Biomedical Science Scholar",
    studentImage: "/src/assets/images/ludsiya.jpg"
  },
  {
    id: "story-janeelsan",
    studentName: "Janeelsan Kugaparan",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of Chester",
    courseName: "BA (Hons) Business Management and Administration",
    placedYear: "2025",
    testimonial: "Thanks to BCAS International, I successfully received my UK Student Visa to study BA (Hons) Business Management and Administration at the University of Chester. Their step-by-step guidance made everything effortless.",
    currentRole: "Business Management Trainee",
    studentImage: "/src/assets/images/janeelsan.jpg"
  },
  {
    id: "story-anitha",
    studentName: "Anitha Jeyaradnam",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of Hertfordshire",
    courseName: "BA (Hons) International Business Management (Top-Up)",
    placedYear: "2025",
    testimonial: "Delighted to secure my UK Student Visa for BA (Hons) International Business Management (Top-Up) at the University of Hertfordshire. BCAS International offered outstanding guidance at every milestone.",
    currentRole: "International Business Executive",
    studentImage: "/src/assets/images/anitha.jpg"
  },
  {
    id: "story-ashim",
    studentName: "Ashim Nasrus Zaman",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of Hertfordshire",
    courseName: "BSc (Hons) Computer Science (Software Engineering)",
    placedYear: "2025",
    testimonial: "A proud moment obtaining my UK Student Visa for BSc (Hons) Computer Science (Software Engineering) at the University of Hertfordshire. The visa counseling and application tracking from BCAS International were outstanding.",
    currentRole: "Software Engineering Scholar",
    studentImage: "/src/assets/images/ashim.jpg"
  },
  {
    id: "story-saranja",
    studentName: "Saranja Sivanesan",
    originCountry: "Sri Lanka",
    destinationUniversity: "University of Hertfordshire",
    courseName: "BSc (Hons) Biomedical Science (Year 2)",
    placedYear: "2025",
    testimonial: "Successfully obtained my UK Student Visa to pursue BSc (Hons) Biomedical Science (Year 2) at the University of Hertfordshire. I am extremely thankful to BCAS International for coordinating this pathway and visa logic.",
    currentRole: "Biomedical Science Researcher",
    studentImage: "/src/assets/images/saranja.jpg"
  }
];
