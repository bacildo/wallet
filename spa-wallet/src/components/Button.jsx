export default function Button({ title, type }) {
  return (
    <button
      type={type}
      className="rounded w-full font-bold text-white text-2xl bg-gradient-to-r from-[#00bfff] to-[#00ff14]"
    >
      {title}
    </button>
  );
}
