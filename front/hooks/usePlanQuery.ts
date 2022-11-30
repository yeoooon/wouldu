import { useQuery } from "@tanstack/react-query";
import { getDayPlan } from "../services/api/planner";

const usePlanQuery = (day: string) => {
  return useQuery(["plan", day], () => getDayPlan(day), { staleTime: 60 * 1000 });
};

export default usePlanQuery;
