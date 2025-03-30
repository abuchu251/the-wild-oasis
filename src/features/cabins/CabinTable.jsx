import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import useCabins from "./useCabins";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   width: auto;
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  // 1) Filter
  const currentFilter = searchParams.get("discount") || "all";
  let filteredCabins;
  if (currentFilter === "all") filteredCabins = cabins;
  if (currentFilter === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (currentFilter === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // 2) Sort
  const currentSort = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = currentSort.split("-");
  console.log(field);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  console.log(sortedCabins);
  if (isLoading) return <Spinner />;
  return (
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
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
