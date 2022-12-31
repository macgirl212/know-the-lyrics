const setSubtitle = (selectedSection: number, setSection: Function): void => {
    switch (selectedSection) {
        case -1:
            setSection('Chorus');
            break;
        case 0:
            setSection('1st Verse');
            break;
        case 1:
            setSection('2nd Verse');
            break;
        case 2:
            setSection('3rd Verse');
            break;
    }
}

export default setSubtitle;