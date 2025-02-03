/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

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

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export const CabinRow = ({ cabin }) => {
  // custom hook
  const { isPending, mutate } = useDeleteCabin();
  const { isPending: isPendingCreate, createCabin } = useCreateCabin();

  const handleDupliacte = () => {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image,
    });
  };

  return (
    <TableRow role="row">
      <Img src={cabin.image} />
      <div>{cabin.name}</div>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      {cabin.discount ? (
        <Discount>{formatCurrency(cabin.discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDupliacte} disabled={isPendingCreate}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button disabled={isPending}>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={cabin.name}
              disabled={isPending}
              onConfirm={() => mutate(cabin.id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;
