import Button from "../../commons/components/Button/Button";
import successVerified from "../../assets/images/SucessVerified/successVerified.svg";
import { useNavigate } from "react-router-dom";

export default function SuccessVerifyEmailPage() {
  const name = "John D.";
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[75%] min-w-fit h-[85%] min-h-fit mt-[15%] bg-white rounded-t-xl py-6 px-4 shadow-dropShadow text-center">
        <div className="m-auto text-center space-y-12">
          <img src={successVerified} className="mx-auto mt-[76px]" />
          <div className="space-y-12">
            <div className="space-y-3">
              <h1 className="text-4xl">Verified</h1>
              <p className="font-light text-[#8899A8] text-2xl leading-loose">
                Your account has successfully created.
              </p>
              <hr className="w-[50%] mx-auto" />
            </div>
            <div>
              <p className="font-light text-[#8899A8] text-2xl mt-12 leading-loose">
                Welcome, {name}
              </p>
              <Button
                id="to-sign-in"
                text="Continue"
                buttonType="submit"
                onClick={() => navigate("/sign-in")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
