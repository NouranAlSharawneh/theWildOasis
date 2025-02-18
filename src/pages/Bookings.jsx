import { useEffect } from "react";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSearchParams } from "react-router-dom";

function Bookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) {
      searchParams.set("status", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
