import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@/components/Table/Index";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { FetchParameters } from "@/components/Table/Table.type";

const queryClient = new QueryClient();

export default function Home() {
  const fetchData = async (
    params?: FetchParameters
  ): Promise<{ data: any[]; meta: { filter_count: number } }> => {
    const accessToken = localStorage.getItem('accessToken'); 
    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`, 
      "Content-Type": "application/json",
    });

    const response = await fetch(
      "https://datacore-dev.machinevision.global/items/perusahaan_bei",
      { headers }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return {
      data: json.data,
      meta: { filter_count: json.data.length },
    };
  };

  const useDataFetchService = (
    params?: FetchParameters
  ): UseQueryResult<{ data: any[]; meta: { filter_count: number } }> => {
    return useQuery({
      queryKey: ["data"],
      queryFn: () => fetchData(params),
    });
  };

  const columns = [
    { title: "ID", field: "id" },
    { title: "Kode Saham", field: "kode_saham" },
    { title: "Nama", field: "nama" },
    { title: "Tanggal Listing", field: "tanggal_listing" },
    { title: "Sektor ID", field: "sektor_id" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Box>
          <div>test</div>
        </Box>
        <Table dataFetchService={useDataFetchService} columns={columns} />
      </>
    </QueryClientProvider>
  );
}
