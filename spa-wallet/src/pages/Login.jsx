import { Link } from 'react-router-dom';
import wallet from '../assets/wallet.png'
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
     <img src={wallet} alt='' className='w-44'/>
      <form className="flex flex-col items-center justify-center gap-4 w-full text-2xl">
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>  
       <Button type="submit" title="Login"/>
      </form>
      <p className='text-white text-2xl'>
      Não possui uma conta? <Link to="/register" className='text-lime-300 hover:text-lime-500'>Clique aqui!</Link> {" "}
      </p>
    </div>
  );
}
