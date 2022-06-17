import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import "./Display.css";

export default function DisplayAllPairs(props) {
  return (
    <TableContainer component={Paper} className="app-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">PAIR</TableCell>
            <TableCell align="center">Chart</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pairDB.map((pair) => (
            <TableRow>
              <TableCell className="TD">{pair.pairs}</TableCell>
              <TableCell>
                <Link
                  name={pair.pairs}
                  onClick={props.clickForChart}
                  to={`/chart/${pair.pairs}`}
                >
                  Click for Chart
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  name={pair._id}
                  onClick={props.delete}
                >
                  Delete Pair
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
