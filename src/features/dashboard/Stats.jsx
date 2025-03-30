import {
  HiOutlineBanknotes,
  HiOutlineBars2,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, totalCabins }) {
  const numBookings = bookings.length;
  const sales = confirmedStays.reduce((arr, curr) => arr + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation = Math.round(
    (confirmedStays.reduce((arr, curr) => arr + curr.numNights, 0) /
      (numDays * totalCabins)) *
      100
  );

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        color="blue"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        color="indigo"
        value={checkins}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupation rate"
        color="yellow"
        value={`${occupation}%`}
      />
    </>
  );
}

export default Stats;
