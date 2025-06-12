import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react'
import { Fragment } from 'react'
import DeleteUserModalForm from './DeleteUserModalForm'

export type User = {
  id: number
  name: string
  email: string
  position: string
}

export type DeleteUserModalProps = {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess?: () => void
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  user,
  onSuccess,
}: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>('');
  const token = localStorage.getItem('token');
  const handleDelete = async () => {
    if (!user) return
    setIsDeleting(true)
    setError('')

    try {
      console.log("Token: ", token)
      const res = await fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to delete user')
        return
      }

      alert("User Successfully deleted");
      window.location.reload();
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Unexpected error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={()=>{}} className="relative z-[999]">
        {/* Backdrop with fade animation */}
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
              <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-700 flex-shrink-0">
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Confirmation Delete User ?
                    </DialogTitle>
                </div>

              {/* BODY */}
              <div className="px-6 py-4 overflow-y-auto flex-1">
                <DeleteUserModalForm
                  user={user!}
                  onDelete={handleDelete}
                  error={error}
                  isDeleting={isDeleting}
                />
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-2 px-6 py-4 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded dark:hover:bg-gray-600  dark:bg-gray-400"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  disabled={isDeleting}
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