import { green } from "@material-ui/core/colors";
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react"; import Page from "./Page";
;

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

function CropIdentifier() {
    const classes = useclasses();
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState("");

    const [soil, setSoil] = useState("");
    const [crops, setCrops] = useState([]);
    const [counter, setCounter] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

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

const CropIdentifierPage = () => <Page title="Crop Identifier" content="Upload an image to find out the best crops for your soil"><CropIdentifier /></Page>

export default CropIdentifierPage;