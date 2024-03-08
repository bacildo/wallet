import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text 2xl">
      <header className="flex items-center justify-between w-full pb-4">
        <img src={wallet} alt="" className="w-32"></img>
        <div className="flex items-center gap-4 text-white text-2xl">
          <h1>Olá!</h1>
          <Link to="/login">
            <GoSignOut />
          </Link>
        </div>
      </header>
      <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">Nothing to show yet!</section>
      <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
        <Button type="button" title="Input" icon="plus" />
        <Button type="button" title="Output" icon="minus" />
      </footer>
    </main>
  );
}
