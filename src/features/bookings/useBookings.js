import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../ui/constants.js";

export const useBookings = () => {
  const queryClinet = useQueryClient();
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

  // Query
  const {
    data: { data, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  // pre Fetching
  if (count > currentPage * PAGE_SIZE)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });

  if (count < currentPage * PAGE_SIZE)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });

  return { data, isPending, error, count };
};
