export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  seats: number;
  description: string;
};

export const events: EventItem[] = [
  {
    id: "1",
    title: "Tech Fest 2026",
    date: "2026-12-10",
    location: "Main Auditorium, Coimbatore",
    category: "Technology",
    seats: 200,
    description: "A full-day festival with talks, demos and coding contests.",
  },
  {
    id: "2",
    title: "Music Night",
    date: "2026-12-15",
    location: "Open Air Theatre",
    category: "Cultural",
    seats: 500,
    description: "An evening of live music from student and guest bands.",
  },
  {
    id: "3",
    title: "Startup Pitch Day",
    date: "2027-01-05",
    location: "Seminar Hall B",
    category: "Business",
    seats: 80,
    description: "Teams pitch their startup ideas to a panel of mentors.",
  },
];