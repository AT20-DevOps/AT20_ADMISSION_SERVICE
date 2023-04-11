import { Box, Button, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/header';
import { tokens } from '../../alternative_theme';

export const initialValues = {
    userName: '',
    lastName: '',
    email: '',
    password:'',
    contact: '',
    rol: ''
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    userName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().password('invalid password').required('required'),
    contact: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required')
});

const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleFormSubmit = () => {

    };

    return (
        <Box m='50px'>
            <Header title='EDIT USER' subtitle='Edit User Profile' />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display='grid'
                            gap='30px'
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                            sx={{
                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                            }}
                        >
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='First Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                name='firstName'
                                error={!!touched.userName && !!errors.userName}
                                helperText={touched.userName && errors.userName}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Last Name'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name='lastName'
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: 'span 2' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label='Contact Number'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.contact}
                                name='contact'
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: 'span 4' }}
                            />
                        </Box>
                        <Box display='flex' justifyContent='end' mt='20px'>
                            <Button type='submit' style={{ background: colors.primary[100] }} variant='contained'>
                                Edit profile
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;
