import { baseUrl } from "../../app/baseurl";


const options = {
	method: 'GET'
};


export async function fetchRandomText() {

    try {
        const response = await fetch(baseUrl, options);
        console.log({ response });
        const result = response.json();
        return result;
    } catch (error) {
        return console.log(error);
    }
}

