import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Checkbox from "../../ui/Checkbox.jsx";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner.jsx";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.js";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckin } from "./useCheckin.js";
import { useSettings } from "../settings/useSettings.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isPending: isPendingSettings, data: settings } = useSettings();
  const { isPending, booking } = useBooking();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking?.isPaid]);

  const { mutate, isPending: isCheckingIn } = useCheckin();
  if (isPending || isPendingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings?.breakfastPrice * numGuests * numNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      mutate({
        breafast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      mutate({ breafast: {} });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => {
            setConfirmPaid((confirm) => !confirm);
          }}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfast)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
