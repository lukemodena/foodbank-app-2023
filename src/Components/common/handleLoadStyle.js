

export const handleLoadStyle = (size) => {
    if (size > 760) {
        let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}
        return style
    } else {
        let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}
        return style
    }
} 