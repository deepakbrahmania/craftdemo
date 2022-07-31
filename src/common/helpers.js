export const timeStampConverter = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
}

export const relativeTimeFromNow = (timeStamp) => {
    const oneDay = 24*60*60*1000;
    if(Date.now() - timeStamp < oneDay) {
        return 'Today';
    } else {
        return new Date(timeStamp).toDateString();
    }
}

export const toLocaleDateTimeString = (timestamp) => {
    return timestamp.toISOString().slice(0, 10); 
}