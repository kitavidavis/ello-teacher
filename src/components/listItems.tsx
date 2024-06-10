import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { BookmarkAdd } from '@mui/icons-material';
import { Link } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <Link sx={(theme) => ({textDecoration: "none", color: theme.palette.mode === "light" ? "#000000" : "#ffffff"})} href="/books/all-books">
    <ListItemButton title='All Books'>
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="All Books" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
        <React.Fragment>
        <ListSubheader component="div" inset>
          My Collection
        </ListSubheader>
        <Link sx={(theme) => ({textDecoration: "none", color: theme.palette.mode === "light" ? "#000000" : "#ffffff"})} href="/books/reading-list">
        <ListItemButton title='My Reading List'>
          <ListItemIcon>
          <BookmarkAdd />
          </ListItemIcon>
          <ListItemText primary="My Reading List" />
        </ListItemButton>
        </Link>
      </React.Fragment>
);