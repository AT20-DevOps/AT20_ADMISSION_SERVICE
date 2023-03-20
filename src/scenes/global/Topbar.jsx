import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'


const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="right" p={3}>
            <Box display="flex" textAlign="right">
            <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ?(
                <DarkModeOutlinedIcon />
            ) : (
                <LightModeOutlinedIcon />
            )}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>
            </Box>
    </Box>
    )
};

export default Topbar;