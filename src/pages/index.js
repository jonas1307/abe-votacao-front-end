import { Inter } from "next/font/google";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function closeModal(id) {
    setPoolId(null);
    setIsOpen(false);
  }

  function openModal(id) {
    setPoolId(id);
    setIsOpen(true);
  }
  let [isOpen, setIsOpen] = useState(false);
  let [poolId, setPoolId] = useState(null);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-around p-24 ${inter.className}`}
    >
      <h1 className="text-2xl font-bold">Sistema de pesquisas</h1>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        {/* <h2 className={`mb-3 text-2xl font-semibold group text-center`}>
          Não existem pesquisas cadastradas
        </h2> */}
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={() => openModal(1)}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Pergunta número 1?{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={() => openModal(2)}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Pergunta número 2?{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>{" "}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    PoolId: {poolId}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">XPTO</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
