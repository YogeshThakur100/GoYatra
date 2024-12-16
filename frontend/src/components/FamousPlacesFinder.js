import React, { useState } from 'react';
import { getFamousPlaces } from '../api/openai';

const FamousPlacesFinder = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleFetch = async () => {
        try {
            // Fetch the result from the API and ensure you extract the generated text
            const result = await getFamousPlaces(`Generate a list of famous places to visit in ${input} based on the number of days provided by the user ([1]). Assume the user has 8-10 hours available each day for sightseeing. Include only those places that are practical to cover within the specified time frame and format the response as bullet points.Give me only the bullet points for famous places not the explanation`);
            
            setResponse(result);
        } catch (error) {
            console.log("Error fetching the FamousPlacesFinder", error);
            setResponse('Error fetching the results.');
        }
    };

    return (
        <div>
            <h1>Famous Places Finder</h1>
            <input
                type="text"
                placeholder="Enter a location"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleFetch}>Find Places</button>
            <div>
                <h2>Results:</h2>
                <div>{response}
                </div>
            </div>
        </div>
    );
};

export default FamousPlacesFinder;
