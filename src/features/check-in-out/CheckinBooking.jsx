import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();

  const { booking, isLoading } = useBooking();
  const { settings } = useSettings();
  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
      setBreakfast(booking?.hasBreakfast ?? false);
    },
    [booking]
  );

  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const additionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (breakfast) {
      console.log("yes sama");
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          totalPrice: totalPrice + additionalBreakfastPrice,
          extraPrice: additionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={breakfast}
          onChange={() => {
            setBreakfast((breakfast) => !breakfast);
            setConfirmPaid(() => false);
          }}
          disabled={hasBreakfast}
        >{`Additional breakfast price is ${formatCurrency(
          additionalBreakfastPrice
        )}`}</Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(() => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
        >
          {`I confirm that ${guests.fullName} has paid the total amount of ${
            !breakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + additionalBreakfastPrice
                )}(${formatCurrency(totalPrice)}+${formatCurrency(
                  additionalBreakfastPrice
                )})`
          }.`}
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
