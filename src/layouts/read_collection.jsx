import { useQuery, useMutation, useQueryClient } from "react-query";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getWorks, postWorks } from "../my-api";

function createData(id, url, title) {
  return { id, url, title };
}

const rows = [
  createData(1, "url1", "title1"),
  createData(1, "url2", "title2"),
  createData(1, "url3", "title3"),
  createData(1, "url4", "title4"),
];

export default function BasicTable() {
  const queryClient = useQueryClient();
  const query = useQuery("readworks", getWorks);
  const mutation = useMutation(postWorks, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("readworks");
    },
  });

  console.log(query.data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
