import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Cabins() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const discount = searchParams.get("discount");
    if (!discount) {
      searchParams.set("discount", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
