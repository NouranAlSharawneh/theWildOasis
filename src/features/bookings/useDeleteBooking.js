import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteABooking, isPending: isDeleteingBooking } = useMutation(
    {
      mutationFn: (bookingId) => deleteBooking(bookingId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        toast.success("Booking successfully deleted!");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  return { isDeleteingBooking, deleteABooking };
};
