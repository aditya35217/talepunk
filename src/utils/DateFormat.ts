interface FormatDateProps {
  date: any;
  hideDay?: boolean;
}

export const formatDate = ({
  date,
  hideDay = false,
}: FormatDateProps): string => {
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: hideDay ? undefined : "numeric",
  });
};

export const agoDate = (date: Date): string => {
  const now = new Date();
  const hoursDifference = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );
  const aheadTime = 18;

  if (hoursDifference < aheadTime) {
    return "just now";
  } else if (hoursDifference - aheadTime < 24) {
    return `hours ago`;
  } else if (hoursDifference - aheadTime < 168) {
    const day = Math.floor((hoursDifference - aheadTime) / 24);
    return `${day} day${day > 1 ? "s" : ""} ago`;
  } else if (hoursDifference - aheadTime < 840) {
    const week = Math.floor((hoursDifference - aheadTime) / 168);
    return `${week} week${week > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
