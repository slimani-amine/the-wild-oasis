import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../../hooks/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../../hooks/useCheckin";
import { useSettings } from "../../hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking = [], isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreackfast, setBreackfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);
  const moveBack = useMoveBack();
  const { checkin, isChechingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  if (isLoading || isLoadingSettings) {
    <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numberGuests,
    hasBreakfast,
    numberNights,
  } = booking;

  const optionalBreackfastPrice =
    settings?.breakfastPrice * numberNights * numberGuests;

  function handleCheckin() {
    if (!confirmPaid) {
      return;
    }
    if (addBreackfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfastPrice,
          totalPrice: totalPrice + optionalBreackfastPrice,
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

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreackfast}
            onChange={() => {
              setBreackfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breackfast"
          >
            Want to add breackfast for {formatCurrency(optionalBreackfastPrice)}{" "}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disable={confirmPaid || isChechingIn}
          id="confirm"
        >
          I confirm that {guests?.fullName} has paid the total amount of
          {!addBreackfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreackfastPrice)}
          (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreackfastPrice
              )} )`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChechingIn}>
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
