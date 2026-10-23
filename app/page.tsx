import {
  Birds,
  Bride,
  DoorArt,
  Fireflies,
  Foliage,
  Frame,
  Groom,
  Heart,
  IconCalendar,
  IconClock,
  IconPin,
  Lanterns,
  Ornament,
  OrnamentV,
  Petals,
  RoseCluster,
  Sparks,
  SvgDefs,
  Vines,
  seg,
  vars,
} from "./_components/art";
import {
  Countdown,
  RevealObserver,
  ScrollScene,
  ShareButton,
} from "./_components/client";

// "بعد صلاة العصر" — approximated as 15:00 local time (UTC+3). Adjust if needed.
const EVENT_START = "2026-10-29T15:00:00+03:00";
const VENUE =
  "صالة بيت الأناقة (Elegance House) - شارع عمر المختار خلف الإغاثة الطبية";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Elegance House شارع عمر المختار")}`;
const GOOGLE_CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("حفل زفاف م. أسامة و أ. رُبا")}` +
  "&dates=20261029T120000Z/20261029T150000Z" +
  `&location=${encodeURIComponent(VENUE)}` +
  `&details=${encodeURIComponent("أفراح آل الغول — حضوركم يشرفنا ويزيد حفلنا بهجة وسروراً")}`;

export default function Home() {
  return (
    <main>
      <SvgDefs />
      <Frame />
      <Petals />

      {/* 1 — The doors open onto the title */}
      <ScrollScene className="gate" length="260svh">
        <div className="rays seg" style={seg(0.12, 0.55)} />
        <div className="gate-content">
          <h1 className="title gold seg" style={seg(0.1, 0.5)}>
            أفراحُ آلِ الغُولِ
          </h1>
          <div className="seg fade-up" style={seg(0.25, 0.55)}>
            <Ornament />
          </div>
          <p className="verse seg fade-up" style={seg(0.35, 0.65)}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
        </div>
        <div className="roses seg" style={seg(0.25, 0.65)}>
          <RoseCluster className="rc-tl" />
          <RoseCluster className="rc-tr" />
        </div>
        <div className="doors seg" style={seg(0.05, 0.5)}>
          <div className="door door-l">
            <DoorArt handle="right" />
          </div>
          <div className="door door-r">
            <DoorArt handle="left" />
          </div>
        </div>
        <div className="seal seg" style={seg(0, 0.07)}>
          <span>أ</span>
          <Heart className="seal-heart" />
          <span>ر</span>
        </div>
        <p className="hint seg" style={seg(0, 0.05)}>
          اسحب للأسفل لفتح الدعوة
          <span className="chev" aria-hidden />
        </p>
        <Birds a={0.15} b={1} />
      </ScrollScene>

      {/* 2 — Bride & groom walk toward each other */}
      <ScrollScene className="couple" length="380svh">
        <Lanterns />
        <header className="hosts seg fade-up" style={seg(0, 0.08)}>
          <div className="hosts-row">
            <span>السيد أحمد محمد الغول</span>
            <OrnamentV />
            <span>السيد موسى يوسف العمراني</span>
          </div>
          <p className="invite-line">يتشرفا بدعوتكم لحضور حفل زفاف:</p>
        </header>

        <div className="stage seg" style={seg(0.1, 0.72)}>
          <svg viewBox="0 0 300 340" className="arch" aria-hidden>
            <path
              d="M14 340V150C14 70 86 22 150 8c64 14 136 62 136 142v190"
              pathLength={1}
            />
            <path
              d="M30 340V156c0-70 64-112 120-126 56 14 120 56 120 126v184"
              pathLength={1}
            />
          </svg>
          <div className="meet seg" style={seg(0.7, 0.86)}>
            <div className="glow" />
            <Heart className="meet-heart" />
            <Sparks />
          </div>
          <figure className="person groom">
            <Groom />
            <figcaption>
              <small>نجله</small>
              <b className="gold">م. أُسامة</b>
            </figcaption>
          </figure>
          <figure className="person bride">
            <Bride />
            <figcaption>
              <small>كريمته</small>
              <b className="gold">أ. رُبا</b>
            </figcaption>
          </figure>
        </div>
      </ScrollScene>

      {/* 3 — Details */}
      <section className="details">
        <Ornament />
        <div className="date-block" data-reveal>
          <span className="date-day">يوم الخميس</span>
          <div className="date-main">
            <span>أكتوبر</span>
            <strong className="gold">29</strong>
            <span>2026</span>
          </div>
          <span className="date-full">الموافق 29 / 10 / 2026</span>
        </div>

        <div data-reveal style={vars({ "--i": 1 })}>
          <Countdown target={EVENT_START} />
        </div>

        <div className="cards">
          <article className="card" data-reveal style={vars({ "--i": 1 })}>
            <IconClock />
            <h2>الموعد</h2>
            <p>بعد صلاة العصر</p>
          </article>
          <article className="card" data-reveal style={vars({ "--i": 2 })}>
            <IconPin />
            <h2>المكان</h2>
            <p>
              صالة بيت الأناقة <span lang="en">(Elegance House)</span>
            </p>
            <p className="muted">شارع عمر المختار خلف الإغاثة الطبية</p>
            {/* <a
              className="btn"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              افتح الخريطة
            </a> */}
          </article>
        </div>

        {/* <div className="actions" data-reveal style={vars({ "--i": 2 })}>
          <a
            className="btn"
            href={GOOGLE_CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCalendar /> أضف إلى التقويم
          </a>
          <a className="btn btn-ghost" href="/wedding.ics" download>
            تقويم آيفون
          </a>
          <ShareButton text="دعوة لحضور حفل زفاف م. أسامة و أ. رُبا" />
        </div> */}
      </section>

      {/* 4 — The garden grows in */}
      <ScrollScene className="garden" length="240svh">
        <Fireflies />
        <div className="closing seg fade-up" style={seg(0.3, 0.62)}>
          <Ornament />
          <p>حضوركم يشرفنا ويزيد حفلنا بهجة وسروراً</p>
          <p className="signature gold">أسامة ♥ رُبا</p>
        </div>
        <Birds a={0.5} b={1} reverse />
        <Vines side="left" />
        <Vines side="right" />
        <Foliage />
      </ScrollScene>

      <RevealObserver />
    </main>
  );
}
