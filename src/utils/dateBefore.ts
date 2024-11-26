export const dateBefore = (date: Date) => {
    const currentDate = new Date();
    const dateBefore = new Date(date);
    const diffTime = Math.abs(currentDate.getTime() - dateBefore.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        return 'Today';
    }
    if (diffDays === 1) {
        return 'Yesterday';
    }
    return `${diffDays} days ago`;
}
