import Spinner from "../../ui/Spinner.jsx";
import { CabinRow } from "./CabinRow.jsx";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

const CabinTable = () => {
  // custom hook , fee error var as well
  const { cabins, isPending } = useCabins();

  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resource={"cabins"} />;

  // For Filtering

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // For Sorting

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (direction === "asc") return a[field] > b[field] ? 1 : -1;
    if (direction === "desc") return a[field] < b[field] ? 1 : -1;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
