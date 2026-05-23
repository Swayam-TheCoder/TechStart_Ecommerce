function Toast({ message }) {

  return (

    <div className="
      fixed
      top-5
      right-5
      bg-cyan-500
      text-white
      px-5 py-3
      rounded-xl
      shadow-lg
      z-50
    ">

      {message}

    </div>
  );
}

export default Toast;