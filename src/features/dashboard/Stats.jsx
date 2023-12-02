import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';
import { useCabin } from '../cabins/useCabins';
import Spinner from '../../ui/Spinner';

function Stats({ bookings, confirmStays }) {
  const [searchParams] = useSearchParams();
  const daysWithin = searchParams.get('last') || 1;
  const { cabins, isLoading } = useCabin();
  const numBookings = bookings.length;
  // const numStays = confirmStays.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const numCheckin = confirmStays?.length || 0;
  // calculate the occupacy rate base on the day and the number of the cabin
  const occupancyRate =
    confirmStays?.reduce((acc, stay) => acc + stay.numNights, 0) /
    (cabins?.length * daysWithin);
  console.log(occupancyRate);
  if (isLoading) return <Spinner />;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-in"
        color="indigo"
        icon={<HiOutlineBriefcase />}
        value={numCheckin}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + '%'}
      />
    </>
  );
}

export default Stats;
