/**
 * לוח ההופעות של דורון אדמוני.
 *
 * כדי להוסיף מועד חדש – פשוט מוסיפים אובייקט למערך `dates` של ההצגה.
 * החודשים, המיון והסינון של מועדים שעברו נבנים אוטומטית מהנתונים.
 *
 * - date:      תאריך בפורמט YYYY-MM-DD
 * - time:      שעה בפורמט HH:MM (שעון ישראל)
 * - venue:     שם האולם
 * - city:      עיר
 * - ticketUrl: קישור ישיר לרכישת כרטיסים למועד (אם אין – יוצג הקישור הרשמי של ההצגה)
 *
 * מועדים שעברו לא נמחקים מכאן – הם פשוט לא מוצגים באתר.
 */

export type Performance = {
  date: string;
  time: string;
  venue: string;
  city: string;
  ticketUrl?: string;
};

export type Show = {
  slug: string;
  title: string;
  /** שורת תיאור קצרה מאוד מתחת לשם ההצגה */
  tagline: string;
  /** תקציר ההצגה – כל פסקה היא איבר במערך */
  synopsis: string[];
  /** מאיזה אתר נלקח התקציר */
  synopsisSource: string;
  /** עמוד ההצגה הרשמי – משמש כ-fallback כשאין קישור ישיר למועד */
  officialUrl: string;
  dates: Performance[];
};

/** fallback אחרון – עמוד התיאטרון */
export const THEATRE_FALLBACK_URL = "https://ht1.co.il/";

const eventer = (code: string) => `https://www.eventer.co.il/${code}`;
const haifaBilly = (id: number) =>
  `https://ht1.smarticket.co.il/${encodeURIComponent("בילי_שוורץ_המחזמר")}/?id=${id}`;
const haifaYoman = (id: number) =>
  `https://ht1.smarticket.co.il/${encodeURIComponent("היומן")}/?id=${id}`;

export const shows: Show[] = [
  {
    slug: "mika-sheli",
    title: "מיקה שלי",
    tagline: "מחזמר משירי יאיר רוזנבלום",
    synopsis: [
      "סיפור אהבה ישראלי על רקע השנים שעיצבו דור שלם.",
      "בין אופוריית 67’ לשבר של 73’, חבורת נערות ונערים עומדת רגע לפני הגיוס – ולפני החיים.",
      "מיקה נקרעת בין שתי אהבות: גידי, אהבת נעוריה שחוזר מהמלחמה פגוע ובורח מהכול, וארי, חבר למחזור שמוצא דרך חדשה דרך האמונה וכובש את ליבה.",
      "מחזה מוזיקלי מרגש על אהבה, פרידה והתפכחות, המלווה בשיריו הבלתי נשכחים של יאיר רוזנבלום – מ״הבלדה על חדווה ושלומיק״ ו״שיר של יום חולין״, דרך ״אהוב בסיירת חרוב״ ו״שירו של צנחן״, ועד ״גשם אחרון״ ו״המנגינה היא שקובעת״.",
    ],
    synopsisSource: "to-mix",
    officialUrl: "https://www.to-mix.co.il/product/mikasheli-musical26/",
    // לבקשת דורון – מוצגים רק המועדים שבהם הוא משחק.
    dates: [
      {
        date: "2026-10-19",
        time: "21:00",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: eventer("va1ff"),
      },
      {
        date: "2026-10-20",
        time: "20:30",
        venue: "היכל התרבות",
        city: "נתניה",
        ticketUrl: eventer("zwn2f"),
      },
    ],
  },
  {
    slug: "billy-schwartz",
    title: "בילי שוורץ",
    tagline: "קומדיה מוזיקלית",
    synopsis: [
      "בילי היא מזכירה אפרורית במשרד רואי חשבון, מעבירה את ימיה בין טלפונים במשרד לבין לחץ מתמיד מצד אמא שלה, המתעקשת לחתן אותה בכל מחיר.",
      "בילי חולמת על חיים אחרים – גדולים, פורצי גבולות, מרגשים ומלאי אהבה. כל זה עומד להשתנות ביום שבו נכנס לחייה יונתן גור לביא – כוכב אופרות סבון מצליח שמציע לה לצאת איתו לדייט.",
      "היא מתאהבת בו מעל הראש, רק כדי לגלות ביום חתונתה שהחיים אינם סרט של דיסני..",
      "קומדיה מוזיקלית – אורבנית על הגשמה עצמית ואהבת אמת.",
    ],
    synopsisSource: "תיאטרון חיפה",
    officialUrl: "https://ht1.co.il/Event?Id=43862",
    dates: [
      // 09.10 ו-10.10 אינם מופיעים כרגע במערכות המכירה – מפנים לעמוד ההצגה.
      { date: "2026-10-09", time: "12:00", venue: "תיאטרון חיפה", city: "חיפה" },
      { date: "2026-10-10", time: "21:00", venue: "תיאטרון חיפה", city: "חיפה" },
      {
        date: "2026-10-11",
        time: "20:30",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaBilly(8981),
      },
      {
        date: "2026-10-24",
        time: "21:00",
        venue: "היכל התרבות",
        city: "כפר סבא",
        ticketUrl: eventer("d1p2f"),
      },
      {
        date: "2026-10-30",
        time: "12:00",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaBilly(9150),
      },
      {
        date: "2026-10-31",
        time: "18:00",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaBilly(8983),
      },
      {
        date: "2026-11-14",
        time: "18:00",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: eventer("22sff"),
      },
      {
        date: "2026-11-14",
        time: "21:00",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: eventer("52sff"),
      },
      {
        date: "2026-11-19",
        time: "20:30",
        venue: "היכל התרבות",
        city: "פתח תקווה",
        ticketUrl: eventer("7jp2f"),
      },
      {
        date: "2026-11-21",
        time: "20:30",
        venue: "היכל התרבות חבל מודיעין",
        city: "איירפורט סיטי",
        ticketUrl: eventer("ajp2f"),
      },
      {
        date: "2026-11-23",
        time: "20:30",
        venue: "היכל התרבות",
        city: "ראשון לציון",
        ticketUrl: eventer("l5dff"),
      },
      {
        date: "2026-12-26",
        time: "18:00",
        venue: "בית החייל",
        city: "תל אביב",
        ticketUrl: eventer("ng42f"),
      },
      {
        date: "2026-12-26",
        time: "21:00",
        venue: "בית החייל",
        city: "תל אביב",
        ticketUrl: eventer("cg42f"),
      },
      {
        date: "2027-01-05",
        time: "20:30",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: eventer("tqw2f"),
      },
      {
        date: "2027-01-12",
        time: "20:30",
        venue: "היכל התרבות",
        city: "מודיעין",
        ticketUrl: eventer("jjh2f"),
      },
      {
        date: "2027-01-13",
        time: "20:30",
        venue: "היכל התרבות",
        city: "מודיעין",
        ticketUrl: eventer("pwh2f"),
      },
      {
        date: "2027-01-16",
        time: "21:00",
        venue: "תיאטרון ירושלים",
        city: "ירושלים",
        ticketUrl: eventer("c4q2f"),
      },
      {
        date: "2027-02-04",
        time: "20:30",
        venue: "בית העם – היכל התרבות",
        city: "רחובות",
        ticketUrl: eventer("6y12f"),
      },
      {
        date: "2027-02-13",
        time: "21:00",
        venue: "היכל התרבות",
        city: "פתח תקווה",
        ticketUrl: eventer("8y12f"),
      },
      {
        date: "2027-06-01",
        time: "20:30",
        venue: "היכל התיאטרון",
        city: "קרית מוצקין",
        ticketUrl: eventer("pjp2f"),
      },
      {
        date: "2027-06-02",
        time: "20:30",
        venue: "היכל התיאטרון",
        city: "קרית מוצקין",
        ticketUrl: eventer("njp2f"),
      },
    ],
  },
  {
    slug: "hayoman",
    title: "היומן",
    tagline: "מחזמר · תיאטרון חיפה",
    synopsis: [
      "״היומן״ – המחזמר עטור השבחים מברודוויי בבכורה ארצית!",
      "מבוסס על הרומן הנמכר ביותר שהיווה השראה לסרט האייקוני.",
      "אלי ונואה, שניהם מעולמות שונים, חולקים חיים שלמים של אהבה למרות הכוחות המאיימים לפרק אותם, בדיוקן מרגש מאוד של כוחה המתמשך של האהבה.",
      "סיפור אהבה יוצא דופן על המאבק להיזכר כמה אהבנו לאהוב.",
    ],
    synopsisSource: "תיאטרון חיפה",
    officialUrl: "https://ht1.co.il/Event?Id=43815",
    dates: [
      {
        date: "2026-10-22",
        time: "20:30",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaYoman(9193),
      },
      {
        date: "2026-10-25",
        time: "20:30",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaYoman(9194),
      },
      {
        date: "2026-10-26",
        time: "20:30",
        venue: "תיאטרון חיפה",
        city: "חיפה",
        ticketUrl: haifaYoman(9195),
      },
      {
        date: "2026-11-08",
        time: "20:30",
        venue: "היכל התרבות",
        city: "פתח תקווה",
        ticketUrl: haifaYoman(9156),
      },
      {
        date: "2026-11-23",
        time: "20:30",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: haifaYoman(9152),
      },
      {
        date: "2026-11-24",
        time: "17:00",
        venue: "היכל אמנויות הבמה",
        city: "הרצליה",
        ticketUrl: haifaYoman(9161),
      },
      {
        date: "2026-12-17",
        time: "20:30",
        venue: "היכל התרבות",
        city: "ראשון לציון",
        ticketUrl: haifaYoman(8922),
      },
      {
        date: "2026-12-18",
        time: "12:00",
        venue: "היכל התרבות",
        city: "ראשון לציון",
        ticketUrl: haifaYoman(8920),
      },
      {
        date: "2026-12-19",
        time: "20:30",
        venue: "היכל התרבות",
        city: "ראשון לציון",
        ticketUrl: haifaYoman(8921),
      },
    ],
  },
];
