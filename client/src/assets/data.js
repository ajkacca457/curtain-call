export const dummyCastsData = [
  { name: "Ramin Karimloo", profile_path: "https://image.tmdb.org/t/p/original/xJGZqspJGTrN1phnK5FENyXW7Al.jpg" }, // Phantom, Les Mis
  { name: "Sutton Foster", profile_path: "https://image.tmdb.org/t/p/original/lqY2Wvm2frOUaT8vD0zNvBDR1TC.jpg" }, // Anything Goes
  { name: "Leslie Odom Jr.", profile_path: "https://image.tmdb.org/t/p/original/o2S8EjY5VEn5W2aA3uZhD8MTuf2.jpg" }, // Hamilton
  { name: "Ben Platt", profile_path: "https://image.tmdb.org/t/p/original/4TYQddcID3Zs9W1EyEeyZ1E4uRU.jpg" }, // Dear Evan Hansen
  { name: "Patti LuPone", profile_path: "https://image.tmdb.org/t/p/original/hFvIxZTRbsm5wUVnZRWqf7C2rXH.jpg" }, // Broadway legend
  { name: "Andrew Rannells", profile_path: "https://image.tmdb.org/t/p/original/zCh6kGy4KpDydRKP7YJeTVUTsvo.jpg" },
  { name: "Laura Benanti", profile_path: "https://image.tmdb.org/t/p/original/7HpMy1zkcYgr2RKHr97iSldRXaa.jpg" },
  { name: "Cynthia Erivo", profile_path: "https://image.tmdb.org/t/p/original/qFieWqTSO5EvOnuWbMuRz1MW4zF.jpg" },
  { name: "Jonathan Groff", profile_path: "https://image.tmdb.org/t/p/original/77hElG7ZtKLw0QgMC7JpNHkTXd4.jpg" },
  { name: "Lin-Manuel Miranda", profile_path: "https://image.tmdb.org/t/p/original/6G3HyZ1HckKqLPQqUcbUkB1h0dD.jpg" }
];


export const dummyShowsData = [
  {
    _id: "100001",
    id: 100001,
    title: "The Phantom of the Opera",
    overview:
      "The timeless story of love, obsession, and tragedy unfolds beneath the Paris Opera House. Featuring Andrew Lloyd Webber’s iconic score and dazzling stagecraft.",
    poster_path: "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
    genres: [
      { id: 10402, name: "Musical" },
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" },
    ],
    casts: dummyCastsData,
    release_date: "2025-09-12",
    original_language: "en",
    tagline: "Let the music of the night enchant you.",
    vote_average: 9.1,
    vote_count: 12450,
    runtime: 150,
  },
  {
    _id: "100002",
    id: 100002,
    title: "Matilda The Musical",
    overview:
      "A witty, uplifting musical about a gifted girl who overcomes her neglectful parents and tyrannical headmistress with the power of imagination and books.",
    poster_path: "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
    genres: [
      { id: 10402, name: "Musical" },
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-10-01",
    original_language: "en",
    tagline: "Sometimes you have to be a little bit naughty.",
    vote_average: 8.7,
    vote_count: 9000,
    runtime: 135,
  },
  {
    _id: "100003",
    id: 100003,
    title: "The Curious Incident of the Dog in the Night-Time",
    overview:
      "A visually stunning stage adaptation of Mark Haddon's best-selling novel, following a neurodivergent boy as he investigates a neighborhood mystery.",
    poster_path: "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ],
    casts: dummyCastsData,
    release_date: "2025-08-18",
    original_language: "en",
    tagline: "15 years old. Exceptional mind.",
    vote_average: 8.9,
    vote_count: 6850,
    runtime: 130,
  },
  {
    _id: "100004",
    id: 100004,
    title: "Swan Lake",
    overview:
      "The most famous classical ballet of all time. A breathtaking blend of drama, passion, and choreography set to Tchaikovsky’s legendary score.",
    poster_path: "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
    genres: [
      { id: 10749, name: "Romance" },
      { id: 10402, name: "Musical" },
      { id: 16, name: "Ballet" },
    ],
    casts: dummyCastsData,
    release_date: "2025-11-05",
    original_language: "en",
    tagline: "A love story that defies fate.",
    vote_average: 9.4,
    vote_count: 17200,
    runtime: 140,
  },
  {
    _id: "100005",
    id: 100005,
    title: "Hamlet",
    overview:
      "Shakespeare’s legendary tragedy reimagined in a bold, modern production. A prince grapples with revenge, madness, and existential dread.",
    poster_path: "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "Historical" },
    ],
    casts: dummyCastsData,
    release_date: "2025-09-28",
    original_language: "en",
    tagline: "To be or not to be...",
    vote_average: 9.0,
    vote_count: 15400,
    runtime: 165,
  },
  {
    _id: "100006",
    id: 100006,
    title: "Stomp",
    overview:
      "An explosive, provocative, and utterly unique percussion show combining rhythm, movement, comedy, and visual theatre in an urban symphony.",
    poster_path: "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
    genres: [
      { id: 10402, name: "Musical" },
      { id: 35, name: "Comedy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-12-10",
    original_language: "en",
    tagline: "No words. Just rhythm.",
    vote_average: 8.5,
    vote_count: 8800,
    runtime: 100,
  },
  {
    _id: "100007",
    id: 100007,
    title: "Blue Man Group",
    overview:
      "A hilarious, high-energy theatrical show that fuses art, music, comedy, and technology to create a euphoric celebration of human connection.",
    poster_path: "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    genres: [
      { id: 10402, name: "Musical" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Performance" },
    ],
    casts: dummyCastsData,
    release_date: "2025-10-22",
    original_language: "en",
    tagline: "Three men. One unforgettable experience.",
    vote_average: 8.8,
    vote_count: 9300,
    runtime: 95,
  },
];
