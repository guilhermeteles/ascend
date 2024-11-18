import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface AlertProps {
  title: string;
  description: React.ReactNode; // Change from string to React.ReactNode
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}


export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <AlertDialog.Title className="text-lg font-bold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            {description}
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <AlertDialog.Cancel asChild>
              <button
                onClick={onCancel}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {cancelLabel}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
