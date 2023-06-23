export const getFormattedDate = (utcDate: any) => {
    const date = new Date(utcDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const arr = date.split(',');
    const ans = `${arr[0]}${arr[1]}`;
    return ans;
};