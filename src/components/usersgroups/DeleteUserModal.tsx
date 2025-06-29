import { useState, useRef } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react'
import { Fragment } from 'react'
import DeleteUserModalForm, {DeleteUserModalFormRef} from './DeleteUserModalForm'
import Swal from '../utils/AlertContainer'

export type User = {
  id: number
  name: string
  email: string
  position: string
  updatedAt: string
}

export type DeleteUserModalProps = {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess?: () => void
  onUserDeleted?: () => void
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  user,
  onUserDeleted,
}: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>('');
  const formRef = useRef<DeleteUserModalFormRef>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to delete user');
        Swal.fire({
          text: 'Failed to delete user',
          icon: 'error',
          duration: 2000
        });
        return;
      }
      onUserDeleted?.(); // 🔁 trigger fetch
      onClose();         // ❎ close modal

    } catch (err) {
      setError('Unexpected error occurred');
      console.log('Error: ', err);
      
      Swal.fire({
        text: `Unexpected error occurred while deleting user`,
        icon: 'error',
        duration: 2000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={()=>{}} className="relative z-[999]">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4"  onClick={(e) => e.stopPropagation()}>
          {/* Panel with scale & slide-up animation */}
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-y-4 opacity-0 scale-95"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="translate-y-4 opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-fit box-border rounded-lg bg-white dark:bg-gray-900 shadow-xl overflow-hidden dark:border dark:border-gray-700 flex flex-col max-h-[90vh] xl:mt-5 z-[9999999999999]" onClick={(e) => e.stopPropagation()}>
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300 dark:border-b-gray-600 flex-shrink-0">
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Confirmation Delete User ?
                    </DialogTitle>
                </div>

              {/* BODY */}
              <div className="px-6 py-4 overflow-y-auto flex-1">
                <DeleteUserModalForm
                  user={user!}
                  ref={formRef}
                  onDelete={handleDelete}
                  error={error}
                  isDeleting={isDeleting}
                />
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-2 px-6 py-4 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-200 dark:text-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={async () => {
                    try {
                      const userSessionRaw = localStorage.getItem('user');
                      const userSession = userSessionRaw ? JSON.parse(userSessionRaw) : null;

                      if (user && userSession && user.id === userSession.id) {
                        Swal.fire({
                          text: "You can't delete your own account while logged in.",
                          icon: 'warning',
                          duration: 4000,
                        });
                        onClose();
                        return;
                      }
                      const success = await formRef.current?.submitDelete();
                      
                      if (success) {
                        onClose();
                        Swal.fire({
                          text: 'User deleted successfully',
                          icon: "success",
                          duration: 2000
                        });
                        
                        // Panggil callback untuk refresh data
                        if (onUserDeleted) {
                          onUserDeleted();
                        }
                      } else {
                        Swal.fire({
                          text: 'Failed to delete user. Please try again!',
                          icon: "error",
                          duration: 2000
                        })
                      }
                    } catch (error) {
                      console.log('Error: ', error);
                      Swal.fire({
                        text: `An error occurred while updating user!`,
                        icon: "error",
                        duration: 2000
                      })
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm'}
                </button>
              </div>
            </DialogPanel>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}