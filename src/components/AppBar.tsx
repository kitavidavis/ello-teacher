import * as React from "react";
import { AppBar, Box, Button, Container, Divider, Drawer, MenuItem, PaletteMode, Toolbar, Typography } from "@mui/material";
import ToggleColorMode from "./ToggleColorMode";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const logo_style = {
    height: `40px`,
    width: "auto",
    cursor: `pointer`
}

interface AppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function ElloAppBar({ mode, toggleColorMode }: AppBarProps ) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (opened: boolean) => {
        setOpen(opened);
    }

    return (
        <div>
            <AppBar position="fixed" sx={{
                boxShadow: 0, bgcolor: "transparent", backgroundImage: 'none', mt: 2
            }}>
                <Container maxWidth="xl">
                    <Toolbar variant="regular" sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexShrink: 0,
                        borderRadius: "999px",
                        bgcolor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}>
                        <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", px: 0}}>
                            <img src="/assets/Logo.png" style={logo_style} alt="Ello" />
                            <Box sx={{display: { xs: "none", md: "flex"}}}>
                                <MenuItem sx={{ py: '6px', ml: "48px", px: "20px"}}>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                        Home
                                    </Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem sx={{ py: '6px', px: '20px'}}>
                                <Link to="/books/reading-list" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                       My Reading List
                                    </Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem sx={{ py: '6px', px: '20px'}}>
                                <Link to="/books/all-books" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                        Available Books
                                    </Typography>
                                </Link>
                                </MenuItem>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "flex"}, gap: 1.0, alignItems: "center"}}>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                            <Link to={"/books/all-books"}>
                            <Button color="info" variant="contained" sx={{borderRadius: "28px"}} startIcon={<Add />}>Explore Ello Books</Button></Link>
                        </Box>

                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant="text"
                            color="primary"
                            aria-label="menu"
                            onClick={() => {toggleDrawer(true)}}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                            <MenuIcon />
                        </Button>
                        <Drawer anchor="right" open={open} onClose={() => {toggleDrawer(false)}}>
                            <Box
                            sx={{
                                minWidth: '60dvw',
                                p: 2,
                                backgroundColor: 'background.paper',
                                flexGrow: 1,
                            }}
                            >
                            <Box
                                sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end',
                                flexGrow: 1,
                                }}
                            >
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            </Box>
                            <MenuItem sx={{ py: '6px', ml: "48px", px: "20px"}}>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                        Home
                                    </Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem sx={{ py: '6px', px: '20px'}}>
                                <Link to="/books/reading-list" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                       My Reading List
                                    </Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem sx={{ py: '6px', px: '20px'}}>
                                <Link to="/books/all-books" style={{textDecoration: "none"}}>
                                    <Typography variant="body2" color="text.primary">
                                        Available Books
                                    </Typography>
                                </Link>
                                </MenuItem>
                                <Divider />
                            <MenuItem>
                                
                            <Link to={"/books/all-books"}>
                            <Button color="info" variant="contained" sx={{borderRadius: "28px"}} startIcon={<Add />}>Explore Ello Books</Button>
                            </Link>
                        
                        </MenuItem>
                        </Box>
                    </Drawer>
                    </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default ElloAppBar;