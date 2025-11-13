import { HOURS } from "@/constants";
export function TimeCells() {
  return (
    <>
      {HOURS.map((hour, index) => {
        return (
          <div key={hour} className="relative h-24">
            {index !== 0 && (
              <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
            )}
            <div className="absolute inset-x-0 top-0 h-12 hover:bg-accent" />

            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b   border-dashed" />
            <div className="absolute inset-x-0 top-12 h-12 hover:bg-accent" />
          </div>
        );
      })}
    </>
  );
}
