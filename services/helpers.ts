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

export const formatDate = (unixDate: number) => {
  const date = new Date(unixDate * 1000);
  return date.toISOString().split("T")[0];
};

export const gameIsReleased = (selectedGame: VideoGame) => {
  return new Date() > new Date(selectedGame.first_release_date * 1000);
};

export const movieIsReleased = (selectedMovie: Movie) => {
  return movieReleaseDatePassed(selectedMovie.release_date);
};

export const movieReleaseDatePassed = (release_date: string) => {
  return new Date() > new Date(release_date);
};
