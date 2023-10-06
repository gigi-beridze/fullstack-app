import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get('http://localhost/scandiweb-gigiberidze/php/api/test.php');
    if(typeof response.data === 'object') {
    
      return response.data;
     }else {
      const responseData = String(response.data);
      const startIndex = responseData.indexOf('[');
      if (startIndex === -1) {
        throw new Error('Invalid response data format.');
      }
      const parsedData = JSON.parse(responseData.substring(startIndex));

      return parsedData;
    }
  } catch (error) {
    console.error(`getProducts Function Failed: ${error}`);
  }
}