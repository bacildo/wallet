import wallet from '../assets/wallet.png'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded c-8 w-[35rem] h-[35rem]">

     <img src={wallet} alt='' className='w-44'/>
      <form className="flex flex-col justify-center gap-4 w-fit text-2xl">
        <input
          type="email"
          placeholder="Email"
          className="rounded p-2 w-full justify-items-center"
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded p-2 w-full justity-items-center"
        />
        <button
          type="submit"
          className="rounded w-full font-bold text-white text-2xl"
        >
          Login{" "}
        </button>
      </form>
      <p className='text-white text-2xl'>
        Register your account!
      </p>
    </div>
  );
}
