/* eslint-disable react/react-in-jsx-scope */
/*
@index.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information '). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Header from '../../../components/header';
import { useTheme } from '@mui/material';
import { tokens } from '../../../alternative_theme';
import useMediaQuery from '@mui/material/useMediaQuery';

// HELPERS
import guests from '../helpers/guests';
import host from '../helpers/hosts';
import timeZone from '../helpers/timezone';

import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS } from '../../../graphql/user';
import { CREATE_MEETING } from '../../../graphql/metting';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function NewMeeting () {


    // const isNonMobile = useMediaQuery('(min-width:600px)');
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    // const [selectedInterview, setSelectedMeeting] = useState('');
    // const [description, setDescription] = useState('');
    // const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedStartTime, setSelectedStartTime] = useState(null);
    // const [selectedEndTime, setSelectedEndTime] = useState(null);
    // const [selectedTimeZone, setSelectedTimeZone] = useState('');
    // // const [selectedHost, setSelectedHost] = useState(null);
    // const [selectedGuests, setSelectedGuests] = useState([]);



    // const onSubmitForm = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const formData = {

    //             host_global_id: '',
    //             // guest_global_id: '',
    //             meeting_name: selectedInterview,
    //             description,
    //             date: selectedDate,
    //             start_time: selectedStartTime,
    //             end_time: selectedEndTime,
    //             time_zone: selectedTimeZone
    //         };
    //         // eslint-disable-next-line no-unused-vars
    //         const response = await saveMeetingData(formData);
    //         alert('Meeting submitted');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to submit meeting');
    //     }
    // };

    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {loading, error, data} = useQuery(GET_USERS);
    const [response, setResponse] = useState('');
    const [newMeeting] = useMutation(CREATE_MEETING );


    const handleClick = () => {
        const data = JSON.stringify({
          "host_global_id": "7",
          "guest_global_id": [
            {
              "value": "example_guest_global_id_1",
              "name": "pepito test1",
              "phone": "+59178819336"
            },
            {
              "value": "example_guest_global_id_2",
              "name": "pepito test2",
              "phone": "+59178819336"
            }
          ],
          "meeting_name": "pepe msa",
          "description": "pepes 3",
          "date": "2023-3-23",
          "start_time": "15:00",
          "end_time": "16:00",
          "time_zone": [
            {
              "value": "UTC-7",
              "label": "Pacific Daylight Time (PDT)"
            }
          ]
        });

        newMeeting({ variables: { data } })
          .then(result => setResponse(result.data.saveInterview))
          .catch(error => console.log(error));
      };

    if(loading) return <p>Loading</p>
    if(error) return <p>Error</p>

    console.log(data.users);
    console.log(guests);

    const onSubmitForm = (event) => {
        alert('Meeting Submitted');
    };

    return (
        <Box m='50px'>
            <Header title='MEETING' subtitle='Create new Meeting' />

            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Meeting'
                        sx={{ gridColumn: 'span 2' }}
                    />

                    {/* <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        label='Interview'
                        options={interview}
                        onChange={(event, value) => {
                            setSelectedMeeting(value.label);
                        }}
                        sx={{ gridColumn: 'span 2' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Meeting' />}
                    />
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ gridColumn: 'span 2' }}
                    /> */}

                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Description'
                        sx={{ gridColumn: 'span 2' }}
                    />
                </Box>
            </div>

            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Schedule</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label='Select a Date' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                    {/* <DemoContainer components={['DatePicker']} >
                            <DatePicker label='Select a Date' value={selectedDate} onChange={(newValue) => {
                                setSelectedDate(newValue);
                            }} slotProps={ { textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                    </DemoContainer> */}
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1', textAlign: 'row' }}
                    >
                        <DemoContainer components={['TimePicker']} >
                            <TimePicker label='Start time' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                        {/* <DemoContainer components={['TimePicker']} >
                            <TimePicker label='Start time' value={selectedStartTime} onChange={(newValue) => {
                                setSelectedStartTime(newValue);
                            }} slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }} />
                        </DemoContainer> */}
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label='End time' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                        {/* <DemoContainer components={['TimePicker']}>
                            <TimePicker label='End time' value={selectedEndTime} onChange={(newValue) => {
                                setSelectedEndTime(newValue);
                            }} slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }} />
                        </DemoContainer> */}
                    </LocalizationProvider>

                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        label='Time Zone'
                        options={timeZone}
                        // onChange={(event, value) => {
                        //     const newTimeZone = {
                        //         value: value.value,
                        //         label: value.label
                        //     };
                        //     setSelectedTimeZone([newTimeZone]);
                        // }}
                        sx={{ mt: 1, gridColumn: 'span 1', with: '100%' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Time Zone' />}
                    />
                </Box>
            </div>
            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Participants</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={host}
                        sx={{ gridColumn: 'span 1' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Select Host' />}
                    />
                    <Autocomplete
                        multiple
                        id='checkboxes-tags-demo'
                        options={data.users}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.firstName + option.lastName}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.firstName + option.lastName}
                            </li>
                        )}
                        sx={{ gridColumn: 'span 1' }}
                        renderInput={(params) => (
                            <TextField {...params} label='Select Guests' id='filled-basic' variant='filled' placeholder=' ' />
                        )}
                    />
                </Box>
            </div>
            <Box
                sx={{
                    my: 5,
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                }}
            >
                <Stack spacing={2} direction='row'
                    textAlign='center'
                    sx={{ '& > :not(style)': { ml: 'auto' } }}>
                    <Button
                        variant='contained'
                        style={{
                            background:
                            colors.success[100]
                        }}
                        size='medium'
                        href='#outlined-buttons'
                        onClick={ onSubmitForm }
                    >
                        Save
                    </Button>
                    <button onClick={handleClick}>Save Interview</button>
      {response && <p>{response}</p>}
                    <Button variant='contained' style={{ background: colors.secondary[100] }} size='medium' href='#outlined-buttons'>Cancel</Button>
                </Stack>
                <p style={{
                    color: colors.secondary[100],
                    marginTop: 50
                }}>Organized by: Pepito Perez</p>
            </Box>
        </Box>
    );
}