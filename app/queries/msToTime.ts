export const msToTime = (duration: number) => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30),
    months = Math.floor((duration / (1000 * 60 * 60 * 24 * 30)) % 12),
    years = Math.floor(duration / (1000 * 60 * 60 * 24 * 30 * 12));

  if (years > 0) {
    return years + "y ago";
  } else if (months > 0) {
    return months + "mo ago";
  } else if (days > 0) {
    return days + "d ago";
  } else if (hours > 0) {
    return hours + "h ago";
  } else if (minutes > 0) {
    return minutes + "m ago";
  } else if (seconds > 0) {
    return seconds + "s ago";
  } else {
    return "now";
  }
};
