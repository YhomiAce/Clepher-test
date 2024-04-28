"use client";

import CustomPaginationActionsTable from "@/components/DataTable";
import useFetchTimeSeries from "@/hooks/useFetchTimeSeries";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const { loading, columns, timeSeriesData } = useFetchTimeSeries();
  return (
    <main className="mt-10 p-5">
      <h1 className="text-center text-2xl text-black mb-5">
        Time Series Stock Data APIs
      </h1>
      {loading ? (
        <center>
          <CircularProgress />
        </center>
      ) : (
        <CustomPaginationActionsTable columns={columns} rows={timeSeriesData} />
      )}
    </main>
  );
}
