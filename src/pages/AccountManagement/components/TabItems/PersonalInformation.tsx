import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../../../commons/components/Input/TextInput";
import PersonalField from "../PersonalTextfield/PersonalTextfield";
import Button from "../../../../commons/components/Button/Button";
import { Icon } from "@iconify/react";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../../../commons/components/ModalOverlay/ConfirmOverlay";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "../../../../commons/components/ModalOverlay/SuccessOverlay";
import { useState } from "react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
};

export default function PersonalInformation() {
  const form = useForm<FormValues>();
  const { handleSubmit, watch } = form;
  const navigate = useNavigate();

  // State to store form data
  const [userData, setUserData] = useState<FormValues | null>(null);

  // for ConfirmOverlay
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "update-user",
    onClose: () => {
      setConfirmVisible(false);
    },
    onConfirm: async () => {
      setConfirmVisible(false);
      if (userData) {
        try {
          // await updateUser(userData);
          console.log(userData);

          setSuccessVisible(true);
        } catch (error) {
          console.error(error);
        }
      }
    },
    title: "Do you want to confirm edit",
    message: "You made changes to this profile configuration",
  };

  //for Success Overlay
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "update-user",
    onClose: () => {
      setSuccessVisible(false);
    },
    title: "Profile Successfully Updated",
  };

  // onSubmit function
  const onSubmit = handleSubmit((data) => {
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userRole: data.userRole,
    });
    setConfirmVisible(true); // Show confirm overlay
  });

  return (
    <FormProvider {...form}>
      <ConfirmOverlay
        isVisible={isConfirmVisible}
        confirmProps={ConfirmProps}
      />
      <SuccessOverlay
        isVisible={isSuccessVisible}
        successProps={SuccessProps}
      />
      <form
        onSubmit={onSubmit}
        className="space-y-32 overflow-x-visible"
        noValidate
      >
        <div className="space-y-12">
          <div className="flex flex-row gap-x-7 items-center">
            <Icon icon="ph:user" className="text-gray-400 size-[1.875rem]" />
            <h1 className="text-[24px]">Personal Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-7 gap-y-[1.875rem]">
            <PersonalField
              type="text"
              label="First name"
              id="firstName"
              placeholder="First name*"
            />
            <PersonalField
              type="text"
              label="Last name"
              id="lastName"
              placeholder="Last name*"
            />
            <PersonalField
              type="select"
              label="Role"
              id="userRole"
              placeholder="Role*"
            />
          </div>
          <hr />
          <div className="grid grid-cols-[9.375rem_25rem] gap-5">
            {/* Disable Email Field */}
            <div className="flex flex-row gap-x-3 items-center">
              <Icon icon="ion:mail-outline" className="text-gray-400 size-6" />
              <label className="font-light">Email:</label>
            </div>
            <TextInput id="email" placeholder="Email*" disabled />

            {/*Change Password button*/}
            <div className="flex flex-row gap-x-3 items-center">
              <Icon icon="ph:key" className="text-gray-400 size-6" />
              <label className="font-light">Password:</label>
            </div>
            <Button
              id="change-password"
              buttonType="cancel"
              text="Change Password"
              onClick={() => navigate("/account-management/change-password")}
              className="min-w-fit"
            />
          </div>
        </div>
        <div className="flex space-x-2.5 justify-end items-end right-0 pb-[3.875rem]">
          <Button
            id="cancel-update-user"
            buttonType="cancel"
            text="Cancel"
            onClick={() => {
              window.location.reload();
            }}
          />
          <Button
            id="submit-update-user"
            buttonType="submit"
            text="Save"
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
