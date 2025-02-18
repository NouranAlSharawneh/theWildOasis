import styled from "styled-components";
import Stats from "./Stats.jsx";
import { useRecentBookings } from "./useRecentBookings.js";
import { useRecentStays } from "./useRecentStays.js";
import Spinner from "../../ui/Spinner.jsx";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isPending: isPendingRecentBookings } = useRecentBookings();

  const {
    stays,
    confirmedStays,
    isPending: isPendingRecentStays,
    numDays,
  } = useRecentStays();

  const { cabins, isPending } = useCabins();

  if (isPendingRecentBookings || isPendingRecentStays || isPending)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        confirmStays={confirmedStays}
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>activity</div>
      <div>stay du</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
