const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const url = "https://046d-2409-40c1-51-cabd-b740-216f-a04f-3922.ngrok-free.app/classify"; // Replace with your ngrok URL
const imagePath = "test.png"; // Replace with your actual image file

async function classifyImage() {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));

        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        console.log(\nStatus Code: ${response.status});
        console.log(Raw Response Text: ${JSON.stringify(response.data, null, 2)});

        if (response.status === 200) {
            console.log("\n *Classification Results*\n" + "=".repeat(30));
            response.data.results.forEach(result => {
                console.log(` ${result.label.charAt(0).toUpperCase() + result.label.slice(1)}: ${result.score.toFixed(4)}`);
            });
            console.log("\n *Content Status:*", response.data.status);
        } else {
            console.log(" API returned an empty response or error.");
        }
    } catch (error) {
        console.error(" Error:", error.message || "An error occurred.");
    }
}

classifyImage();