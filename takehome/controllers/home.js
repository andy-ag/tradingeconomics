const te = require('tradingeconomics');
const indicators = require('../indicators');

function home(req, res) {
    res.render('home', {
        indicators: indicators
    });
}

async function getIndicator(req, res) {
    console.log(req.body);
    const { country: req_country, indicator: req_indicator } = req.body;
    console.log(req_country);
    console.log(req_indicator);

    // Check if the provided indicator is valid (exists in list)
    if (!indicators.includes(req_indicator)) {
        return res.status(400).json({ error: 'Invalid indicator provided.' });
    }

    try {
        const data = await te.getHistoricalData(country = req_country, indicator = req_indicator);
        console.log(data)

        // Remove meta item
        data.pop()

        // Dynamically determine the category/indicator from the data
        const indicatorCategory = data[0].Category;

        // Extract relevant data from the API response
        const dates = data.map(item => new Date(item.DateTime).toISOString().slice(0,10));
        const values = data.map(item => item.Value);

        // Data for Plotly
        const plotlyData = [{
            x: dates,
            y: values,
            type: 'scatter',
            mode: 'lines+markers',
            name: indicatorCategory
        }];

        res.json(plotlyData);

    } catch (error) {
        console.error("Error fetching data. This indicator may not be available for this country - try another one.", error);
        res.status(500).json({ error: 'Error fetching data. This indicator may not be available for this country - try another one.' });
    }
}

module.exports = {
    getIndicator,
    home
}