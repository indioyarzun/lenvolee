import { FC } from "react";
import { getFarming } from "@/api";
import Title from "./Title";
import dayjs from "dayjs";
import Link from "next/link";
import { routes } from "@/routes";

const Calendar: FC<{
  data: Awaited<ReturnType<typeof getFarming>>["calendar"];
}> = ({ data }) => {
  if (!data.calendar.visible) {
    return null;
  }
  return (
    <div>
      <Title>{data.calendar.title}</Title>
      <div className="mt-16 flex flex-wrap gap-8">
        {Object.entries(data.calendarWithQuantities).map(
          ([month, monthWithQuantities]) => {
            return (
              <div key={month}>
                <div className="border-b-2 border-b-accent text-2xl capitalize">
                  {dayjs().month(Number.parseInt(month)).format("MMMM")}
                </div>
                <div>
                  {monthWithQuantities.map((weekQauntities, index) => {
                    return (
                      <div key={index} className="flex flex-col py-2">
                        <div>
                          {weekQauntities.date.format("dddd DD")} - semaine{" "}
                          {weekQauntities.date.isoWeek()}
                        </div>
                        <div></div>
                        <div className="text-nowrap">
                          <span className="border-b border-b-secondary font-bold">
                            {weekQauntities.quantity}
                          </span>{" "}
                          reines
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
        <Link
          href={routes.contact}
          className="self-center rounded-lg bg-accent/90 p-4 px-6 py-3 text-xl shadow-lg transition-transform duration-300 hover:bg-accent focus:outline-none focus:ring-4 focus:ring-accent active:scale-95"
        >
          Réserver !
        </Link>
      </div>
    </div>
  );
};

export default Calendar;
