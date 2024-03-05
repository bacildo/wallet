import { Link } from "react-router-dom";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
      <Link to="/login">
        <IoArrowBackCircleOutline className="text-white absolute top-3 left-3 text-2xl  hover:text-teal-200"/>
      </Link>
      <img src={wallet} alt="" className="w-44" />
      <form className="flex flex-col justify-center gap-4 w-full text-2xl">
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button type="submit" title="CONFIRM" />
      </form>
    </div>
  );
}
