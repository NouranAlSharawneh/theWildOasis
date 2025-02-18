import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import { useRecentBookings } from "../features/dashboard/useRecentBookings.js";
import { useRecentStays } from "../features/dashboard/useRecentStays.js";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner.jsx";

function Dashboard() {
  const { bookings, isPending: isPendingRecentBookings } = useRecentBookings();

  const {
    stays,
    confirmedStays,
    isPending: isPendingRecentStays,
  } = useRecentStays();

  if (isPendingRecentBookings || isPendingRecentStays) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
