import Button from "../../../commons/components/Button/Button";

interface ResendModalProps {
  onClick: () => Promise<void>; // Expecting an async function
}

export default function ResendModal({ onClick }: ResendModalProps) {
  return (
    <div className="modal-container border border-[#DFE4EA] rounded-lg px-8 py-5 space-y-11 w-fit mx-auto">
      <div className="modal-content">
        <h1 className="leading-loose">Haven't receive an email yet ?</h1>
        <label className="font-light leading-6">
          Click here to request a new verification email
        </label>
      </div>
      <Button
        id="resend-email"
        buttonType="submit"
        text="Resent Verification Email"
        className="min-w-fit"
        onClick={onClick}
      />
    </div>
  );
}
