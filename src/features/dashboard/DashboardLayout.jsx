import styled from 'styled-components';
import Stats from './Stats';
import { useRecentBooking } from './useRecentBooking';
import { useRecentStays } from './useRecentStays';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import Today from '../check-in-out/TodayActivity';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading, bookings } = useRecentBooking();
  const { isLoading: isLoadingStay, stays, confirmStays } = useRecentStays();
  if (isLoading || isLoadingStay) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmStays={confirmStays} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmStays} />
      <SalesChart bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
