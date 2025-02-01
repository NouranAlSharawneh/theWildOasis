import { useState } from "react";
import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

const AddCabin = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModel((isOpenModel) => !isOpenModel)}>
        Add new cabin
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
