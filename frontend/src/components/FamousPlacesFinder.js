import React, { useState } from "react";
import { getFamousPlaces } from "../api/openai";
import { TextField, Button, Typography, Box, Paper, Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const FamousPlacesFinder = () => {
    const [input, setInput] = useState("");
    const [days, setDays] = useState("");
    const [response, setResponse] = useState("");

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Checks if the screen is smaller than "sm" (600px)

    const handleFetch = async () => {
        try {
            const result = await getFamousPlaces(
                `Generate a list of famous places to visit in ${input} based on the number of days provided by the user ${days}. Assume the user has 8-10 hours available each day for sightseeing. Include only those places that are practical to cover within the specified time frame and format the response as bullet points.Give me only the bullet points for famous places not the explanation`
            );
            setResponse(result);
        } catch (error) {
            console.log("Error fetching the FamousPlacesFinder", error);
            setResponse("Error fetching the results.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                padding: isSmallScreen ? "15px" : "30px",
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    padding: isSmallScreen ? "20px" : "40px",
                    textAlign: "center",
                    background: "white",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "750px",
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        marginBottom: "20px",
                        letterSpacing: "1.2px",
                        fontSize: isSmallScreen ? "1.8rem" : "2.5rem",
                    }}
                >
                    Famous Places Finder
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        marginBottom: "30px",
                        color: "#666",
                        fontStyle: "italic",
                        fontSize: isSmallScreen ? "0.9rem" : "1rem",
                    }}
                >
                    Enter your destination and the number of days to explore tailored recommendations!
                </Typography>
                <Grid container spacing={isSmallScreen ? 2 : 3}>
                    {/* Location Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Enter Location"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            sx={{
                                backgroundColor: "#f9f9f9",
                                borderRadius: "5px",
                            }}
                        />
                    </Grid>
                    {/* Days Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type="number"
                            label="Enter Days"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            sx={{
                                backgroundColor: "#f9f9f9",
                                borderRadius: "5px",
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleFetch}
                    sx={{
                        marginTop: "30px",
                        backgroundColor: "#3f51b5",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: isSmallScreen ? "10px 0" : "15px 0",
                        fontSize: isSmallScreen ? "14px" : "16px",
                        borderRadius: "10px",
                        textTransform: "none",
                        transition: "background-color 0.3s ease",
                        ":hover": {
                            backgroundColor: "#2c387e",
                        },
                    }}
                >
                    Find Places
                </Button>
                {response && (
                    <Box
                        mt={4}
                        p={isSmallScreen ? 2 : 4}
                        sx={{
                            background: "#f9f9f9",
                            borderRadius: "10px",
                            boxShadow: "inset 0px 4px 10px rgba(0, 0, 0, 0.1)",
                            maxHeight: "400px",
                            overflowY: "auto",
                            textAlign: "left",
                            fontSize: isSmallScreen ? "0.9rem" : "1rem",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "15px",
                                color: "#3f51b5",
                                fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                            }}
                        >
                            Results:
                        </Typography>
                        <Typography
                            sx={{
                                color: "#555",
                                lineHeight: "1.6",
                            }}
                        >
                            {response}
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default FamousPlacesFinder;
