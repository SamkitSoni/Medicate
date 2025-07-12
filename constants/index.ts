import { title } from "process";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  name: '',
  email: '',
  phone: '',
  dob: new Date(),
  gender: 'male', // This should match one of the values in the z.enum(["male", "female", "other"])
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedications: '',
  medicalHistory: '',
  identificationType: '',
  identificationNumber: '',
  identificationDocument: [], // This should be an array of File objects or an empty array
  privacyConsent: false,
  treatmentConsent: false,
  disclosureConsent: false,
};



export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
  "Adhar Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const Specialities = [
  {
    name: "Cardiology",
  },
  {
    name: "Dermatology",
  },
  {
    name: "Neurology",
  },
  {
    name: "Pediatrics",
  },
  {
    name: "Psychiatry",
  },
  {
    name: "Surgery",
  },
];

export const Experience = [
  {
    year: "less than 1 year",
  },
  {
    year: "1+ year of experience",
  },
  {
    year: "2+ years of experience",
  },
  {
    year: "3+ years of experience",
  },
  {
    year: "5+ years of experience",
  },
  {
    year: "10+ years of experience",
  },
];
export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export const hightlightsSlides = [
  {
    id: 1,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
  {
    id: 2,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
  {
    id: 3,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
  {
    id: 4,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
  {
    id: 5,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
  {
    id: 6,
    videoDuration: 10,
    src:  "/assets/videos/hero.mp4",
  },
]

export const footerLinks = [
 {
  id: 1,
  label: "Privacy Policy",
  href: "/privacy-policy"
 },
 {
  id: 2,
  label: "Refund Policy",
  href: "/refund-policy"
 },
 {
  id: 3,
  label: "Terms & Conditions",
  href: "/terms-and-conditions"
 },
];

export enum FormFieldType {
  INPUT = "input",
  FILE = "file",
  TEXTAREA="textarea",
  PHONE_INPUT="phoneInput",
  CHECKBOX="checkbox",
  DATE_PICKER="datePicker",
  SELECT="select",
  SKELETON="skeleton",

}

export const subscriptionPlans = [
  {
    id: "basicPlan",
    title: 'Basic Plan',
    description: 'Ideal for small practices looking to establish their presence.',
    amount: 199,
    btn: "border-2 border-green-500 text-lg text-green-500 w-full",
    card: "w-full dark:border-white rounded-lg  h-[75vh] md:w-1/3 lg:w-1/4",
    head: "",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"
      },
      {
        id:2,
        title:"Unlimited appointment slots.",
        img: "/assets/icons/check.svg",
      },
      {
        id:3,
        title:"Increase visibility to potential patients.",
        img: "/assets/icons/close-red.svg",

      },
      {
        id:4,
        title:"Advanced upcoming features.",
        img: "/assets/icons/close-red.svg"
      },
    ]

  },
  {
    id: "expertCarePlus",
    title: 'ExpertCare Plus',
    description: 'Perfect for growing practices seeking advanced features.',
    amount: 249,
    btn: "bg-green-500 text-white hover:bg-green-300 text-lg w-full",
    card: "w-full border border-green-500 rounded-lg shadow-md  h-[75vh] md:w-1/3 lg:w-1/4",
    head: "(Most doctors choice)",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"

      },
      {
        id:2,
        title:"Increase visibility to potential patients.",
        img: "/assets/icons/check.svg"
      },
      {
        id:3,
        title:"Unlimited appointment slots.",
        img: "/assets/icons/check.svg"
      },
      {
        id:4,
        title:"Advanced upcoming features.",
        img: "/assets/icons/close-red.svg"
      },
    ]
  },
  {
    id: "eliteCarePremier",
    title: 'EliteCare Premier',
    description: 'Comprehensive plan for large practices aiming for excellence.',
    amount: 299,
    btn: "border-2 border-green-500 text-lg text-green-500 w-full",
    card: "w-full border-white h-[75vh] rounded-lg  md:w-1/3 lg:w-1/4",
    head: "",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"
      },
      {
        id:2,
        title:"Increase visibility to potential patients.",
        img: "/assets/icons/check.svg"
      },
      {
        id:3,
        title:"Unlimited appointment slots.",
        img: "/assets/icons/check.svg"
      },
      {
        id:4,
        title:"Advanced upcoming features.",
        img: "/assets/icons/check.svg"
      },
    ]
  },
];

export const projects = [
  {
    title: "Easy Appointment Booking",
    description:
      "Schedule appointments with top doctors in just a few clicks.",
    link: "https://stripe.com",
  },
  {
    title: "Certified Specialists",
    description:
      "Consult with highly qualified and experienced professionals.",
    link: "https://netflix.com",
  },
  {
    title: "Secure Medical Records",
    description:
      "Your privacy is our priority. Your data is safe with us.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Instant Access to Medical Records",
    description:
      "Your medical history and reports are always accessible, right at your fingertips.",
    link: "https://amazon.com",
  },
  {
    title: "Doctor Reviews and Ratings",
    description:
      "Read real user reviews and ratings to choose the right doctor for you.",
    link: "https://microsoft.com",
  },
];

export const patientsubscriptionPlans = [
  {
    id: "basic",
    title: 'Basic',
    button: "Choose Now",
    description: 'Ideal for small practices looking to establish their presence.',
    amount: 149,
    btn: "border-2 border-green-500 text-lg text-green-500 w-full",
    card: "w-full border-white rounded-lg  h-[75vh] md:w-1/3 lg:w-1/4",
    head: "",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"
      },
      {
        id:2,
        title:"Visibility to doctors.",
        img: "/assets/icons/check.svg",
      },
      {
        id:3,
        title:"Urgent appointment booking",
        img: "/assets/icons/close-red.svg",
      },
      {
        id:4,
        title:"Adding medical history",
        img: "/assets/icons/close-red.svg"
      },
    ]

  },
  {
    id: "plus",
    title: 'Plus',
    button: "Get Started",
    description: 'Perfect for growing practices seeking advanced features.',
    amount: 249,
    btn: "bg-green-500 text-white shadow-md hover:bg-green-300 text-lg w-full",
    card: "w-full  border-green-500 rounded-lg shadow-md dark:shadow-lg h-[75vh] md:w-1/3 lg:w-1/4",
    head: "(Most popular)",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"

      },
      {
        id:2,
        title:"Visibility to doctors.",
        img: "/assets/icons/check.svg"
      },
      {
        id:3,
        title:"Urgent appointment booking.",
        img: "/assets/icons/check.svg"
      },
      {
        id:4,
        title:"Adding medical history",
        img: "/assets/icons/check.svg"
      },

      {
        id:5,
        title:"Upcoming advanced features",
        img: "/assets/icons/close-red.svg"
      },


    
    ]
  },
  {
    id: "premium",
    title: 'Premium',
    button: "Choose Now",
    description: 'Comprehensive plan for large practices aiming for excellence.',
    amount: 299,
    btn: "border-2 border-green-500 text-lg text-green-500 w-full",
    card: "w-full border-white h-[75vh] rounded-lg  md:w-1/3 lg:w-1/4",
    head: "",
    features:[
      {
        id:1,
        title:"Green verification tick.",
        img: "/assets/icons/check.svg"
      },
      {
        id:2,
        title:"Visibility to doctors.",
        img: "/assets/icons/check.svg"
      },
      {
        id:3,
        title:"Urgent appointment booking.",
        img: "/assets/icons/check.svg"
      },
      {
        id:4,
        title:"Adding medical history",
        img: "/assets/icons/check.svg"
      },
      {
        id:5,
        title:"Upcoming advanced features",
        img: "/assets/icons/check.svg"
      },
    ]
  },
];


export const sidebarLinks = [
  {
    imgURL: '/assets/icons/calendar2.svg',
    route: '/new-appointment',
    label: "Reserve Slot",
  },
  {
    imgURL: '/assets/icons/plus.svg',
    route: '/add-record',
    label: 'Add Records',
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/profile',
    label: 'Profile',
    requiresAuth: true,
  },
  
];

export const doctorsidebarLinks = [
  {
    imgURL: '/assets/icons/dashboard.svg',
    route: '/dashboard',
    label: 'Dashboard',
  },
  {
    imgURL: '/assets/icons/logo-icon.svg',
    route: '/dashboard/subscribe',
    label: 'Pricing',
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/profile',
    label: 'Profile',
    requiresAuth: true,
  },
  
];
