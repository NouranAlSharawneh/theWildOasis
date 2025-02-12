import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending } = useBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { mutate, isPending: isPendingCheckOut } = useCheckOut();
  const { isDeleteingBooking, deleteABooking } = useDeleteBooking();

  if (isPending) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => {
              navigate(`/checkin/${id}`);
            }}
            icon={<HiArrowDownOnSquare />}
          >
            Check-in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            disabled={isPendingCheckOut || status === "checked-out"}
            onClick={() => {
              mutate(id);
              // moveBack();
            }}
            icon={<HiArrowUpOnSquare />}
          >
            Check-out
          </Button>
        )}

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button icon={<HiTrash />} variation="danger">
              Delete a booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleteingBooking}
              onConfirm={() =>
                deleteABooking(id, {
                  onSettled: () => moveBack(),
                })
              }
              resourceName={"booking"}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
