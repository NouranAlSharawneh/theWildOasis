import { useSearchParams } from "react-router-dom";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const last = searchParams.get("last");
    if (!last) {
      searchParams.set("last", "7");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
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
