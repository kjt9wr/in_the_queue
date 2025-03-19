import { RELEASE_STATUS } from "@/constants/enums";

export const determineReleaseStatus = (show: TVShow) => {
  if (show.status === "Ended") {
    return RELEASE_STATUS.FINISHED;
  }
  const lastAirDate = new Date(show.last_air_date);

  if (isOver30DaysAgo(lastAirDate)) {
    return RELEASE_STATUS.AWAITING;
  } else {
    return RELEASE_STATUS.AIRING;
  }
};

const isOver30DaysAgo = (date: Date) => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return date < thirtyDaysAgo;
};
