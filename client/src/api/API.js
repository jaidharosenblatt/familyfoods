import * as restaurant from "./endpoints/restaurant";
import * as auth from "./endpoints/auth";
import * as group from "./endpoints/group";

export default {
  ...restaurant,
  ...auth,
  ...group,
};
