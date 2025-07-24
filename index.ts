import { checkAlbQuota } from "./serviceQuota/albQuota";
import { handleAlert } from "./alerts/thresholdCheck";

(async () => {
  const { usage, limit } = await checkAlbQuota();
  await handleAlert("ALB", usage, limit);
})();
