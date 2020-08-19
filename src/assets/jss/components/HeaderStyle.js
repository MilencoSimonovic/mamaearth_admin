const HeaderStyle = {
    content: {
        background: '#09a4e3'
    },
    toolContent: {

    },
    menu: {
        display: 'flex',
        flexGrow: '10',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '& .menu-item': {
            padding: '20px 2px',
            margin: '0px 20px'
        },
        '& .active': {
            borderBottom: '2px solid white',
            fontWeight: '700'
        }
    }
}

export default HeaderStyle;