import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";
import { getAllTransactions } from "../services/Transactions";
import { loggedIn } from "../services/User";
import ErrorsInput from "../components/ErrorsInput";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [errorsApi, setErrorsApi] = useState("");

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

  async function calculateBalance(transaction) {
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
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text 2xl">
      {errorsApi && <ErrorsInput message={errorsApi} />}

      <header className="flex items-center justify-between w-full pb-4">
        <img src={wallet} alt="" className="w-32"></img>
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
                      {dayjs(transaction.created_at).format("DD/MM")}
                    </span>
                    {transaction.description}
                  </span>
                  <span
                    className={`${
                      transaction.type === "input"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    R$ {transaction.value}
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
        <Button type="button" title="Input" icon="plus" transaction="input" />
        <Button
          type="button"
          title="Output"
          icon="minus"
          transaction="output"
        />
      </footer>
    </main>
  );
}
