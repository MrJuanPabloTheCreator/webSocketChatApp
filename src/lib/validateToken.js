const validateToken = async (token) => {
    console.log('Checking token...')

    try {
        const response = await fetch(`https://xyyn5q4i1i.execute-api.us-east-1.amazonaws.com/login/?token=${token}`, {
            method: 'GET'
        });

        const result = await response.json();

        if (result.valid) {
            console.log('Token is valid')
            return true;
        } else {
            console.log('Token is invalid or expired');
            localStorage.clear();
            return false;
        }
        
    } catch (error) {
        console.log(error)
        return false;
    }
}

export default validateToken