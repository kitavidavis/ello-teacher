import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';
import { Button, Pagination, TextField } from '@mui/material';
import { LOCAL_STORAGE } from '../constants';
import { Link } from 'react-router-dom';

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

export default function AllBooks() {
    const { loading, error, data } = useQuery(GET_BOOKS);

    const [raw_data, setRawData] = React.useState([]);

    const [page, setPage] = React.useState(1);

    const [size, ] = React.useState(5);

    const [search, setSearch] = React.useState("");


    React.useEffect(() => {
        if(!Array.isArray(data?.books)){
            return;
        }
        var stored_data = new Array<TableDataProps>();

        const storedData = localStorage.getItem(LOCAL_STORAGE);
    
        if(storedData){
          stored_data = JSON.parse(storedData);
        }
        
        if(data?.books && stored_data.length === 0){
            setRawData(data?.books)
        } else {
            // filter out already stored data
            let arr1 = data?.books;

            arr1.filter((obj: TableDataProps) => {
                stored_data.filter((obj2: TableDataProps) => {
                    return obj?.title !== obj2?.title
                })
            });

            setRawData(arr1);
        }
    }, [data])

    React.useEffect(() => {

    }, [page]);

    if(loading){
        return <p>Loading</p>
    }

    if(error){
        return <p>Error</p>
    }


    const addReadingList = async (idx: number) => {
        let chunk = raw_data[idx];

        let storedData = localStorage.getItem(LOCAL_STORAGE);

        if(storedData){
            let arr = JSON.parse(storedData);

            arr.push(chunk);

            localStorage.setItem(LOCAL_STORAGE, JSON.stringify(arr));

        } else {
            localStorage.setItem(LOCAL_STORAGE, JSON.stringify([chunk]))

        }

        const newRawData = raw_data.filter((_, index) => index !== idx);

        setRawData(newRawData);
    }

  return (
    <React.Fragment>
      <Title>Available Books({raw_data.length})</Title>

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
          {raw_data.filter((obj: TableDataProps) => {
            return obj?.title.toLowerCase().includes(search.toLowerCase()) || obj?.author.toLowerCase().includes(search.toLowerCase())
          }).slice((page - 1)*size, (size * page)).map((row: TableDataProps, idx: number) => (
            <TableRow key={idx}>
              <TableCell>
                <img src={`/assets/image${getRandomInt()}.webp`} height={70} width={70} style={{borderRadius: 70}} />
              </TableCell>
              <TableCell>
                {row.title}
              </TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.readingLevel}</TableCell>
              <TableCell align="right">
                <Button onClick={() => {addReadingList(idx)}} variant='contained' color='secondary' sx={{borderRadius: 28}}>Add To Reading List</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination page={page} onChange={(e: any, val: number) => {setPage(val)}} sx={{my: 10, display: 'flex', justifyContent: "flex-end"}} count={Math.ceil(raw_data.length / 5)} variant="outlined" shape="rounded" />
    </React.Fragment>
  );
}