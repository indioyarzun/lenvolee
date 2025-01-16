import { Calendar, Client } from "@/payload-types";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { PaginatedDocs } from "payload";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(isoWeek);

export const generateCalendar = (
  calendar: Calendar,
  clients: PaginatedDocs<Client>,
) => {
  const allCommands = clients.docs.reduce<{ [key: number]: number }>(
    (acc, client) => {
      return (
        client.commandes?.reduce<{ [key: number]: number }>((acc, command) => {
          const week = dayjs(command.date).isoWeek();
          if (acc[week]) {
            acc[week] += command.quantity;
          } else {
            acc[week] = command.quantity;
          }
          return acc;
        }, acc) ?? {}
      );
    },
    {},
  );

  const currentDate = dayjs();
  let startDate = dayjs(calendar.startDate);
  if (currentDate.isAfter(startDate)) {
    startDate = currentDate;
  }
  const endDate = dayjs(calendar.endDate);

  const startDateWeek = startDate.isoWeek();
  const endDateWeek = endDate.isoWeek();

  const weeks = new Array(endDateWeek - startDateWeek).fill(
    calendar.productionPerWeek,
  );

  const calendarWithQuantities = weeks.reduce<{
    [key: number]: { date: Dayjs; quantity: number }[];
  }>((acc, week, index) => {
    const currentWeek = index + startDateWeek;
    const currentDate = startDate.isoWeek(currentWeek).startOf("isoWeek");
    const currentMonth = currentDate.month();

    const data = {
      date: currentDate,
      quantity: week - (allCommands[currentWeek] ?? 0),
    };
    if (!acc[currentMonth]) {
      acc[currentMonth] = [data];
    } else {
      acc[currentMonth].push(data);
    }

    return acc;
  }, {});

  return calendarWithQuantities;
};
