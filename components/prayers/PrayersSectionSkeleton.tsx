function PrayersSectionSkeleton() {
  return (
    <div className="flex flex-col gap-7 px-10 py-7.5">
      {[...Array(6)].map((_, index) => {
        return (
          <div key={index} className="flex justify-between items-center">
            <div
              className="skeleton h-6 rounded-full w-28 bg-neutral-content/50"
              style={{
                backgroundImage:
                  "linear-gradient( 105deg, #0000 0% 40%, #bfbfbf 50%, #0000 60% 100% )",
              }}
            ></div>
            <div
              className="skeleton h-6 rounded-full w-28 bg-neutral-content/50"
              style={{
                backgroundImage:
                  "linear-gradient( 105deg, #0000 0% 40%, #bfbfbf 50%, #0000 60% 100% )",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default PrayersSectionSkeleton;
