import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // For Filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // For Soring
  const currentSortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = currentSortBy.split("-");
  const sortBy = { field, direction };

  const { data, isPending, error } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { data, isPending, error };
};
