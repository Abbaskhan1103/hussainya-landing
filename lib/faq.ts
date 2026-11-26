// Questions people type into a search box or ask an assistant, each with an
// answer that stands on its own. One source for three places: the /faq page,
// its FAQPage structured data, and /llms.txt.
//
// Every answer states only what the app does today. When a feature changes,
// change it here in the same commit: a search engine quoting a stale answer is
// worse than no answer.

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: readonly Faq[] = [
  {
    question: "What is Hussainya?",
    answer:
      "Hussainya is a free app for Shia Muslims in Australia. It brings together prayer times, the Hijri calendar, a directory of hussainiyas and Islamic centres, their programs and live streams, and everyday ibadah tools: a qibla compass, tasbih, a qadha tracker and a khums calculator.",
  },
  {
    question: "Is Hussainya free?",
    answer:
      "Yes. Hussainya is free to download on the App Store and Google Play, and you can browse it without creating an account.",
  },
  {
    question: "Which phones does Hussainya work on?",
    answer:
      "Hussainya is available for iPhone, on iOS 17.2 or later, from the App Store, and for Android phones from Google Play.",
  },
  {
    question: "How does Hussainya calculate prayer times?",
    answer:
      "Prayer times are calculated on your phone from your location, so they work offline. You can choose between five calculation methods, and either use your current location or pick a city.",
  },
  {
    question: "Does Hussainya show Shia dates such as Ashura and Eid al-Ghadir?",
    answer:
      "Yes. The Hijri calendar marks shahadat, wiladat and Eid dates, including Ashura, Arba'een and Eid al-Ghadir, and shows each day in both the Hijri and Gregorian calendars alongside the programs your centres have posted.",
  },
  {
    question: "How do I find a hussainiya or Shia Islamic centre near me?",
    answer:
      "Open the Centres tab in Hussainya and browse by state or search by name. Each centre lists its address with directions, contact details, upcoming programs, announcements and live streams.",
  },
  {
    question: "Which areas does Hussainya cover?",
    answer:
      "The centre directory covers hussainiyas and Islamic centres across Australia. Program times are shown in your own time zone.",
  },
  {
    question: "Can I watch a majlis live in Hussainya?",
    answer:
      "Yes. When a centre goes live on YouTube you can watch the stream inside the app, and you can choose to be notified when a centre you have favourited goes live or posts a new program.",
  },
  {
    question: "Do I need an account to use Hussainya?",
    answer:
      "No. You can browse centres, programs and prayer times without an account. Signing in with Apple, Google or email lets you save favourite centres and RSVP to programs.",
  },
  {
    question: "How do I add my centre to Hussainya, or correct its details?",
    answer:
      "Write to support@hussainya.com or use the contact form at hussainya.com/contact. Centre managers keep their own details and programs up to date, and anyone can suggest an update to a centre from inside the app.",
  },
  {
    question: "What does Hussainya do with my location and data?",
    answer:
      "Hussainya collects only what it needs. Your location stays on your device, where prayer times and the qibla direction are worked out, and nothing is sold. The privacy policy at hussainya.com/privacy has the detail.",
  },
  {
    question: "What ibadah tools are in Hussainya?",
    answer:
      "Four: a tasbih counter that includes Tasbeeh al-Zahra, a qadha tracker for prayers you owe, a step-by-step khums calculator, and a qibla compass. There are also home screen widgets for prayer times, the Hijri date and today's programs.",
  },
  {
    question: "What is a hussainiya?",
    answer:
      "A hussainiya, also written husayniyya or hussainia, is a hall where Shia Muslims gather for majalis and commemorations, above all in Muharram to remember Imam Husayn (AS). The app takes its name from it.",
  },
  {
    question: "Who makes Hussainya?",
    answer:
      "A small, distributed group of engineers, designers and community members who work on it in the evenings and at weekends, in the spirit of khidmah. You can reach them at support@hussainya.com.",
  },
];
