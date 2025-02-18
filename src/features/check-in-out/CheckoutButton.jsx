import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut.js";

function CheckoutButton({ bookingId }) {
  const { mutate: checkout, isPending } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isPending}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
