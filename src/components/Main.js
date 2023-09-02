import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import { socket } from "@/services/socket";

const inter = Inter({ subsets: ["latin"] });

export default function Main() {
  let [isOpen, setIsOpen] = useState(false);
  let [polls, setPolls] = useState([]);
  let [poll, setPoll] = useState(null);
  let [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onPollInsert(insertedPoll) {
      let newPolls = [...polls];
      newPolls.push(insertedPoll);
      setPolls(newPolls);
    }

    function onPollUpdate(updatedPoll) {
      const newPolls = [...polls];
      const index = polls.map((e) => e.pollId).indexOf(updatedPoll.pollId);

      if (index > -1) {
        newPolls[index] = updatedPoll;
        setPolls(newPolls);
      }

      if (poll.pollId === updatedPoll.pollId) {
        setPoll(updatedPoll);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("poll-insert", onPollInsert);
    socket.on("poll-update", onPollUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("poll-insert", onPollInsert);
      socket.off("poll-update", onPollUpdate);
    };
  });

  function closeModal() {
    setPoll(null);
    setIsOpen(false);
  }

  function openModal(item) {
    setPoll(item);
    setIsOpen(true);
  }

  const { loading, error, data } = useQuery(gql`
    {
      polls {
        pollId
        question
        options {
          label
          answers
        }
      }
    }
  `);

  useEffect(() => {
    if (data && data.polls) setPolls(data.polls);
  }, [data]);

  if (loading) return <></>;

  return (
    <main
      className={`flex min-h-screen flex-col items-center lg:justify-around p-24 ${inter.className}`}
    >
      <h1 className="text-2xl font-bold">Sistema de pesquisas</h1>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        {!polls && (
          <h2 className={`mb-3 text-2xl font-semibold group text-center`}>
            Não existem pesquisas cadastradas
          </h2>
        )}
        {polls &&
          polls.map((item) => (
            <button
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              onClick={() => openModal(item)}
              key={uuidv4()}
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {`${item.question} `}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </button>
          ))}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} poll={poll} />
    </main>
  );
}
