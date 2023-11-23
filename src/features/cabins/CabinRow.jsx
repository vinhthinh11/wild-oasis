import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
const Button = styled.button`
  border-radius: 3px;
  border: 1px solid var(--color-grey-300);
  & :hover {
    background-color: var(-- -grey-400);
  }
  &:active,
  :focus {
    outline: 2px solid var(--color-grey-400);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: id => deleteCabins(id),
    onSuccess: () => {
      toast.success('Delete cabin successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message),
  });
  return (
    <>
      <TableRow role="row">
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? (
          <Discount>{cabin.discount}%</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Button onClick={() => setShowForm(va => !va)}>Edit</Button>
          <Button onClick={() => mutate(cabin.id)} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} closeForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
