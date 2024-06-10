import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Pagination, TextField } from '@mui/material';
import { LOCAL_STORAGE } from '../constants';

import { Link as RouterLink } from 'react-router-dom';

interface TableDataProps {
    coverPhotoURL: string;
    title: string;
    readingLevel: string;
    author: string;
    addedOn?: string;
}

// returns a random number between 1 and 10
function getRandomInt(){
    return Math.floor(Math.random() * 10) + 1;
}

export default function ReadingList() {
  const [data, setData] = React.useState([]);

  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);

  const [size, ] = React.useState(5);

  React.useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE);

    if(storedData){
      setData(JSON.parse(storedData));
    }
  }, []);

    const removeReadingList = (idx: number) => {
      data.splice(idx, 1);

      localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data));

      setData([...data]);

    }

  return (
    <React.Fragment>
      <Title>My Reading List({data.length})</Title>

      <TextField value={search}onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearch(event.target.value)}} sx={{my: 4, borderRadius: 28}} fullWidth label="Search by title or author" id="fullWidth" />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Reading Level</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell sx={{textAlign: "center"}} colSpan={5}>
                0 items were found on the reading list<br /><br />
                <RouterLink to={"/books/all-books"}>
                <Button sx={{borderRadius: 28}} variant='contained'>Explore Books</Button>
                </RouterLink>
                </TableCell>
            </TableRow>
          ) : null}
          {data.filter((obj: TableDataProps) => {
            return obj?.title.toLowerCase().includes(search.toLowerCase()) || obj?.author.toLowerCase().includes(search.toLowerCase())
          }).slice((page - 1)*size, (size * page)).map((row: TableDataProps, idx: number) => (
            <TableRow key={idx}>
              <TableCell>
                <img src={`/assets/image${getRandomInt()}.webp`} height={70} width={70} style={{borderRadius: 70}} />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.readingLevel}</TableCell>
              <TableCell align="right">
                <Button onClick={() => {removeReadingList(idx)}} variant="contained" color="warning" sx={{borderRadius: 28}}>Remove From My Reading List</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination page={page} onChange={(e: any, val: number) => {setPage(val)}} sx={{my: 10, display: 'flex', justifyContent: "flex-end"}} count={Math.ceil(data.length / 5)} variant="outlined" shape="rounded" />
    </React.Fragment>
  );
}