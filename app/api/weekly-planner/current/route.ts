import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getMostRecentWeeklyPlan } from "@/lib/weekly-planner";

// GET /api/weekly-planner/current — lets the Weekly Planner page resume the
// user's last saved plan on load instead of losing it on navigation.
// data: null (200) means "nothing saved yet," a normal state, not an error.
export async function GET() {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  try {
    const plan = await getMostRecentWeeklyPlan(session.user.id);
    return apiSuccess(plan);
  } catch {
    return apiServerError();
  }
}
