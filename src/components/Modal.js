import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Modal({ isOpen, closeModal, poll }) {
  if (!poll) return <></>;

  async function setVote(pollId, label) {
    const client = new ApolloClient({
      uri: "https://pucminas-ws-gq.onrender.com/graphql",
      cache: new InMemoryCache(),
    });

    await client.mutate({
      mutation: gql`
          mutation
          addVote {
            addVote(
              pollId: "${pollId}"
              label: "${label}"
            ) 
            {
                pollId
            }
          }
      `,
    });
  }

  return (
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
                  {poll.question}
                </Dialog.Title>
                <div className="mt-2">
                  {poll.options.map((item) => (
                    <div key={uuidv4()} className="flex mb-2">
                      <div className="flex flex-grow items-center">
                        <span className="mr-2">{item.label}</span>
                        <span className="font-bold">{`${item.answers} votos`}</span>
                      </div>
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setVote(poll.pollId, item.label)}
                      >
                        Votar
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
  );
}
