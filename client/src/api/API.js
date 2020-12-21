import * as restaurant from "./endpoints/restaurant";
import * as auth from "./endpoints/auth";

export default {
  ...restaurant,
  ...auth,
};
