import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabin } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { cabins, isLoading } = useCabin();
  // get params form the url to filter
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resource="Cabins" />;

  // check if the data is loading, display the spinner
  // this to filter cabins
  const filterValue = searchParams.get('discount') || 'all';
  let filterCabin;
  switch (filterValue) {
    case 'no-discount':
      filterCabin = cabins.filter(cabin => cabin.discount === 0);
      break;
    case 'with-discount':
      filterCabin = cabins.filter(cabin => cabin.discount !== 0);
      break;
    default:
      filterCabin = cabins;
  }
  // this for sort cabin
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifieder = direction === 'asc' ? 1 : -1;
  const sortCabin = filterCabin.sort(
    (a, b) => (a[field] - b[field]) * modifieder
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabin}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
