

const isValidUrl = (url: string) => {
    try {
        if(new URL(url)) return false;
    } catch (error) {   
        return false;
    }
}

export {isValidUrl};