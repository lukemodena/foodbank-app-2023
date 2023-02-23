

export const handleLoadStyle = (size, modal) => {
    if (size > 760) {
        if (modal) {
            let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}
            return style
        } else {
            let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}
            return style
        }
        
    } else {
        if (modal) {
            let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}
            return style
        } else {
            let style = {display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}
            return style
        }
    }
} 