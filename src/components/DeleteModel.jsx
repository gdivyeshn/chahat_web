import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

export default function DeleteModel({
  showModal,
  setShowModal,
  title,
  handleDelete,
  loading,
}) {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel> */}

              <div className="flex items-center px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-3 sm:flex">
                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-orange-100 rounded-full">
                      <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg font-medium text-gray-800">
                        {title}
                      </h4>
                      <p className="text-md leading-relaxed text-gray-500">
                        Are you shure you delete if click on delete then you
                        permently delete all data
                      </p>
                      {loading ? (
                        <div className="flex justify-start">
                          <div className="h-10 w-20">
                            <Loading />
                          </div>
                        </div>
                      ) : (
                        <div className="items-center gap-2 mt-3 sm:flex">
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-white bg-orange-600 rounded-md outline-none ring-offset-2 ring-orange-600 focus:ring-2"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-orange-600 focus:ring-2"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
