const InfluenceStyle = {
    container: {
        padding: '20px',
        display: 'flex'
    },
    filterPart: {
        width: '400px',
        minWidth: '400px',
        marginRight: '20px'
    },
    filterContent: {
        padding: '15px 25px',
        "& .header": {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
        },
        "& .slid-filter": {
            '& .slid-item': {

            }
        },
        '& .MuiSlider-valueLabel': {
            top: -20,
            color: 'transparent',
            "& span span": {
                color: 'white',
                fontSize: 14,
                backgroundColor: '#3f51b5',
                padding: '2px 5px',
                borderRadius: 5
            }
        }
    },
    tablePart: {
        flexGrow: '10'
    },
    tableContent: {
        padding: 20,
        '& .header': {
            '& h3': {
                margin: 0
            },
            display: 'flex',
            marginBottom: '20px'
        },
        '& td': {
            padding: '3px',
            textAlign: 'center'
        }
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        '& .item-list': {
            padding: "0px 5px",
            backgroundColor: '#f5f7f9',
            margin: 2,
            border: '1px solid grey',
            borderRadius: '100px',
            display: 'inline-block',
            fontSize: '12px'
        }
    },
    formInput: {
        margin: "10px 0px"
    },
    datePart: {
        marginTop: '10px',
        display: 'flex',
        '& .date-item': {
            flex: 5
        }
    },
    rewardPart: {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'flex-start'
    },
    filePart: {
        padding: '10px',
        border: '1px dashed grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'column',
        '& img': {
            width: '50px'
        },
        '& .title': {
            fontSize: '18px'
        }
    }
}
export default InfluenceStyle;