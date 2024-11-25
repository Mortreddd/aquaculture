import { forwardRef, HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle, useRef } from "react";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

export interface ModalProps extends HTMLAttributes<HTMLDialogElement>, PropsWithChildren {}

function Modal({ className, children }: ModalProps, ref: Ref<ModalRef>) {
  const modalRef = useRef<HTMLDialogElement>(null);

  // Exposing methods to the parent component using `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    open() {
      modalRef.current?.showModal();
    },
    close() {
      modalRef.current?.close();
    }
  }));

  return (
    <dialog ref={modalRef} className={`modal ${className}`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}  {/* Render the modal content passed through children */}
      </div>
    </dialog>
  );
}

export default forwardRef(Modal);
