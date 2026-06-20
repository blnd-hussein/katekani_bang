function HeaderSkeleton() {
  return (
    <>
      <div
        className="skeleton h-10 rounded-full w-62 bg-neutral-content/50"
        style={{
          backgroundImage:
            "linear-gradient( 105deg, #0000 0% 40%, #bfbfbf 50%, #0000 60% 100% )",
        }}
      ></div>

      <div
        className="skeleton h-9 rounded-full w-42 bg-neutral-content/50"
        style={{
          backgroundImage:
            "linear-gradient( 105deg, #0000 0% 40%, #bfbfbf 50%, #0000 60% 100% )",
        }}
      ></div>
    </>
  );
}

export default HeaderSkeleton;
