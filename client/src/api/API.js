import * as restaurant from "./endpoints/restaurant";
import * as auth from "./endpoints/auth";
import * as group from "./endpoints/group";
import * as review from "./endpoints/review";

export default {
  ...restaurant,
  ...auth,
  ...group,
  ...review,
};
