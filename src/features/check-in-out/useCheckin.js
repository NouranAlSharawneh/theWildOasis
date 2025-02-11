import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const useCheckin = () => {
  const { bookingId } = useParams();
  const queryClinet = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClinet.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
};
