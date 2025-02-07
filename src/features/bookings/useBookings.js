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

  // For Sorting
  const currentSortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = currentSortBy.split("-");
  const sortBy = { field, direction };

  // Pagination
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  return { data, isPending, error, count };
};
