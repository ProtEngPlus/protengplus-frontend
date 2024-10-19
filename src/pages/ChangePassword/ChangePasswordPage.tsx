import React, { useState } from "react";
import PasswordField from "./components/PasswordWithLabel";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Button from "../../commons/components/Button/Button";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../commons/components/ModalOverlay/ConfirmOverlay";
import {
  SuccessOverlay,
  SuccessOverlayProps,
} from "../../commons/components/ModalOverlay/SuccessOverlay";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePasswordPage() {
  const form = useForm<FormValues>({
    mode: "onBlur",

    // will edit after set api
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { handleSubmit, setError, watch } = form;
  const navigate = useNavigate();

  // will edit role:Role[] after adding interface
  const [userData, setUserData] = useState<
    (FormValues & { role: string }) | null
  >(null);

  // for ConfirmOverlay
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-change-password",
    onClose: () => {
      setConfirmVisible(false);
    },
    onConfirm: async () => {
      setConfirmVisible(false);
      if (userData) {
        try {
          // await changePassword(userData); // Your logic to update password
          console.log(userData);
          setSuccessVisible(true);
        } catch (error) {
          console.error(error);
          setError("currentPassword", {
            type: "manual",
            message: "Incorrect Password",
          });
        }
      }
    },
    title: "Do you want to change the password?",
    message: "Please ensure your new password is secure and memorable.",
  };

  // for SuccessOverlay
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const SuccessProps: SuccessOverlayProps = {
    id: "success-change-password",
    onClose: () => {
      setSuccessVisible(false);
      navigate("/profile"); // Navigate to profile or another page after success
    },
    title: "Password Successfully Updated",
  };

  const onSubmit = handleSubmit(async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setError("confirmNewPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    // Set userData with all required fields and role "user"
    setUserData({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword, // Ensure this field is included
      role: "user", // Add the role field
    });

    setConfirmVisible(true);
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
      <form onSubmit={onSubmit} className="space-y-12">
        <div className="flex flex-row gap-x-7 items-center">
          <Icon icon="ph:key" className="text-gray-400 size-6" />
          <h1>Change Password</h1>
        </div>

        <PasswordField
          id="currentPassword"
          label="Current Password"
          placeholder="Current Password*"
          additionalValidation={{
            required: { value: true },
          }}
        />

        <PasswordField
          id="newPassword"
          label="New Password"
          placeholder="New Password*"
          additionalValidation={{
            required: { value: true },
            validate: (value: string) => value === watch("confirmNewPassword"),
          }}
        />

        <PasswordField
          id="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm New Password*"
          additionalValidation={{
            required: { value: true },
            validate: (value: string) =>
              value === watch("newPassword") || "Password do not match!",
          }}
        />

        <div className="flex space-x-2.5 justify-end items-end right-0 pb-[3.875rem]">
          <Button
            id="cancel-change-password"
            buttonType="cancel"
            text="Cancel"
            onClick={() => navigate("/profile")} // Navigate to profile or another page
          />

          <Button
            id="change-password"
            buttonType="submit"
            text="Save"
            type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
