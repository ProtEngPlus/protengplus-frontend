import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "./Button";
import { useState } from "react";
import {
  InputProteinOverlay,
  InputProteinOverlayProps,
} from "../CreateJob/InputProteinOverlay/InputProteinOverlay";

export default function ViewButton({
  inputProtein,
  disable,
}: {
  inputProtein: string;
  disable?: boolean;
}) {
  // input protein overlay
  const [isProteinVisible, setProteinVisible] = useState(false);

  const InputProteinProps: InputProteinOverlayProps = {
    inputProtein: inputProtein,
    onClose: () => {
      setProteinVisible(false);
    },
  };

  return (
    <div>
      <InputProteinOverlay
        isVisible={isProteinVisible}
        inputProteinProps={InputProteinProps}
      />

      <Button
        disabled={disable}
        id="btn-view-protein"
        buttonType="cancel"
        type="button"
        text="View"
        className="w-fit px-3 py-2 font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-3 text-pep-dark-gray"
        onClick={() => {
          setProteinVisible(true);
        }}
      >
        <Icon icon="carbon:view" className="size-[30px] text-pep-gray" />
      </Button>
    </div>
  );
}
