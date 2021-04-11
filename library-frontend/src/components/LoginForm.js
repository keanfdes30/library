import React,{ useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UseStyles from './Styles'
import Copyright from './Copyright'


const LoginForm = ({page, username, email, phone, password, handleLogin, handleRegister, handle}) => {
    const [form,setForm] = useState("login")
    const classes = UseStyles();
    if (page !== "login" )
        return null

    const login = () => {
        return (            
            <Container component="main" maxWidth="xs"  >
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username} 
                        onChange={({target})=>handle("setUsername", target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} 
                        onChange={({target})=>handle("setPassword", target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid item>
                        <Link href="#" variant="body2" onClick={()=> setForm("register")}>
                            Don't have an account? Sign Up
                        </Link>
                    </Grid> 
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          );
        }
    const register = () => {
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleRegister}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username} 
                            onChange={({target})=>handle("setUsername", target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email} 
                            onChange={({target})=>handle("setEmail", target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="mobile. no."
                            label="Mobile. no."
                            name="mobile. no."
                            autoComplete="mobile. no."
                            autoFocus
                            value={phone} 
                            onChange={({target})=>handle("setPhone", target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password} 
                            onChange={({target})=>handle("setPassword", target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" onClick={()=> setForm("login")}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          );
    }
    return (
        <div>
            {form==="login" && login()}
            {form==="register" && register()}
        </div>
    );
};

export default LoginForm;