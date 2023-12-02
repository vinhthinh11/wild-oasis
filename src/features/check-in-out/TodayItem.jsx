import styled from 'styled-components';
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 11rem 2rem 10rem 1rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="blue">Unconfirmed</Tag>}
      {status === 'checked-in' && <Tag type="green">Check in</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.countryFlag}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>
      <Button as={Link} $size="small" to={`/checkin/${id}`}>
        Detail
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
