import { createQuotaResources } from "./serviceQuota/createQuota";
import { createQuotaAlarms } from "./alerts/createAlarm";

createQuotaResources();
createQuotaAlarms();

