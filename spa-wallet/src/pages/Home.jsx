import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { IoTrash } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";
import ErrorsInput from "../components/ErrorsInput";
import Modal from "../components/Modal";
import {
  deleteTransaction,
  getAllTransactions,
} from "../services/Transactions";
import { loggedIn } from "../services/User";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [errorsApi, setErrorsApi] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionIdToDelete, setTransactionIdToDelete] = useState(null);

  function tokenValidate() {
    const token = Cookies.get("token");
    if (!token) navigate("/login");
  }
  async function getUser() {
    try {
      const user = await loggedIn();
      setUserData(user.data);
    } catch (error) {
      setErrorsApi(error.message);
      console.error(error.message);
    }
  }
  async function getTransactions() {
    try {
      const response = await getAllTransactions();
      setTransactions(response.data);
      calculateBalance(response.data);
    } catch (error) {
      setErrorsApi(error.message);
      console.error(error.message);
    }
  }
  async function handleDelete(id) {
    try {
      await deleteTransaction(id);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
      calculateBalance(
        transactions.filter((transaction) => transaction._id !== id)
      );
      setShowConfirmModal(false);
    } catch (error) {
      setErrorsApi(error.message);
      console.error(error.message);
    }
  }

  function calculateBalance(transaction) {
    let total = 0;
    transaction.forEach((transaction) => {
      transaction.type === "input"
        ? (total += Number(transaction.value))
        : (total -= Number(transaction.value));
    });
    setBalance(total);
  }
  useEffect(() => {
    tokenValidate();
    getUser();
    getTransactions();
  }, []);
  return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2xl">
      {errorsApi && <ErrorsInput message={errorsApi} />}

      <header className="flex items-center justify-between w-full pb-4">
        <img src={wallet} alt="" className="w-32" />
        <div className="flex items-center gap-4 text-white text-2xl">
          <h1>Olá, {userData.name}!</h1>
          <Link to="/login">
            <GoSignOut />
          </Link>
        </div>
      </header>
      <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">
        {transactions.length ? (
          <ul className="w-full h-full flex flex-col justify-between">
            <div className="h-[17rem] overflow-auto p-3">
              {transactions.map((transaction, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start w-full"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base text-zinc-500">
                      {dayjs(transaction.created_at).format("DD/MM/YY")}
                    </span>

                    <span className="text-gray-950 flex items-center gap-2 ">
                      {transaction.description}
                    </span>
                  </span>

                  <span className="flex items-center gap-2 ml-auto">
                    <span
                      className={`${
                        transaction.type === "input"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      R$ {transaction.value}
                    </span>
                    <span
                      onClick={() => {
                        setShowConfirmModal(true);
                        setTransactionIdToDelete(transaction._id);
                      }}
                    >
                      <FaRegPenToSquare />
                    </span>
                    <span
                      onClick={() => {
                        setShowConfirmModal(true);
                        setTransactionIdToDelete(transaction._id);
                      }}
                    >
                      <IoTrash />
                    </span>
                  </span>
                </li>
              ))}
            </div>
            <li className="flex justify-between items-start w-full px-3">
              <span>Saldo</span>
              <span
                className={`${balance > 0 ? "text-green-800" : "text-red-800"}`}
              >
                R$ {balance}
              </span>
            </li>
          </ul>
        ) : (
          <p>Não há transações</p>
        )}
      </section>
      <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
        <Button type="button" title="Entrada" icon="plus" transaction="input" />
        <Button type="button" title="Saída" icon="minus" transaction="output" />
      </footer>
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleDelete(transactionIdToDelete)}
      />
    </main>
  );
}
