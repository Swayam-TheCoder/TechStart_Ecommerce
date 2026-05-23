function StarRating({ rating }) {

  return (

    <div className="
      flex
      items-center
      gap-1
    ">

      {[1,2,3,4,5].map((star) => (

        <span
          key={star}
          className={`
            text-2xl

            ${
              star <= rating
              ? "text-yellow-400"
              : "text-zinc-600"
            }
          `}
        >
          ★
        </span>

      ))}

    </div>
  );
}

export default StarRating;