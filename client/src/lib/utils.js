export const isoTimeFormat = (dateTime) => {
    const date = new Date(dateTime);
    const localTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return localTime;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'TBA';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


export const SORT_TYPES = {
  NEWEST: "NEWEST",
  OLDEST: "OLDEST",
  TITLE: "TITLE",
};

export const sortShows = (shows, sortType = "NEWEST") => {
  const sorted = [...shows];

  switch (sortType) {
    case SORT_TYPES.NEWEST:
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case SORT_TYPES.OLDEST:
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

    case SORT_TYPES.TITLE:
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    default:
      return sorted;
  }
};
