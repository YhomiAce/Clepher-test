import { TableColumn } from "@/components/DataTable";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TimeSeries {
  id: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

const API_KEY = "demo" ?? process.env.NEXT_PUBLIC_API_KEY;

export default function useFetchTimeSeries() {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeries[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: TableColumn[] = [
    { id: 'open', label: 'Open', minWidth: 170 },
    {
      id: 'high',
      label: 'High',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'low',
      label: 'Low',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'close',
      label: 'Close',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'volume',
      label: 'Volume',
      minWidth: 170,
      align: 'right',
    },
  ];
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const url =
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`;
      const response = await axios.get(url);
      const result: TimeSeries[] = Object.entries(
        response.data["Time Series (5min)"]
      ).map(([id, values]: [string, any]) => ({
        id,
        open: values["1. open"],
        high: values["2. high"],
        low: values["3. low"],
        close: values["4. close"],
        volume: values["5. volume"],
      }));
      setTimeSeriesData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    timeSeriesData,
    columns
  }
}
