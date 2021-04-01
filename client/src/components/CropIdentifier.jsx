import DateFnsUtils from "@date-io/date-fns";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import axios from "axios";
import { Form, Formik, useField } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import base64 from "base-64";

const BASE_URL = "http://localhost:8000/";

const MyTextField = ({
    placeholder,
    type = "text",
    fullWidth = true,
    multiline = false,
    ...props
}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
            type={type}
            fullWidth={fullWidth}
            multiline={multiline}
        />
    );
};

const useclasses = makeStyles((theme) => ({
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
    hidden: {
        display: "none",
    },
    image: {
        width: "90%"
    }
}));

export default function CropIdentifier() {
    const classes = useclasses();
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState("");

    const [soil, setSoil] = useState("");
    const [crops, setCrops] = useState([]);
    const [counter, setCounter] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    // if (isEditPage) {
    //     axios
    //         .get(BASE_URL + `products/${productId}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setProduct(res.data.data);
    //             setProductType(checkType(res.data.data));
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsLoading(false));
    // }
    // }, [isEditPage]);

    const onInputChange = (e) => {
        const fileUpload = e.target.files[0];
        setFile(fileUpload);
        setFileUrl(URL.createObjectURL(fileUpload))
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        setCounter(1);
        setIsLoading(true);
        const data = new FormData();
        data.append('file', file);
        const response = await axios.post("https://48ed072a5a88.ngrok.io/upload", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        setSoil(response.data[0]);
        setCrops(response.data.splice(1));
        setIsLoading(false);

        console.log(response.data);
    }

    return (
        <Container>
            <header>
                <div
                    className="heading"
                    style={{ textAlign: "center", padding: "15px" }}
                >
                    <Typography variant="h4" style={{ color: "black" }}>
                        <u>Find your Crop</u>
                    </Typography>
                </div>
            </header>
            <Container maxWidth="sm">
                <Paper style={{ padding: 16 }} elevation={2}>
                    <Grid container alignItems="flex-start" spacing={4}>
                        <Grid item xs={12}>
                            <p>Upload your soil image here ⬇️ </p>
                            <label htmlFor="import-button" hidden>Crop Image</label>
                            <input
                                id="import-button"
                                onChange={onInputChange}
                                type="file"
                            />
                        </Grid>
                        {!!file && <Grid item xs={12}>
                            <img className={classes.image} src={fileUrl} alt="Crop" />
                        </Grid>}
                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={handleUpload}
                                disabled={isLoading}
                            >
                                submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <br />
            <br />
            {
                counter === 1 &&
                (<Container maxWidth="sm">
                    {
                        isLoading ? <CircularProgress /> : <><p>Your soil type is : <b>{soil}</b></p>
                            <br />
                            <br />
                            <h3>Here are the crops best suited for your soil</h3>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Crops</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {crops.map((row, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell component="th" scope="row">
                                                    {row}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer></>
                    }

                </Container>)
            }

        </Container>
    );
}
