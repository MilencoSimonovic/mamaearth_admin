import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from '@material-ui/core/IconButton';

import MaterialTable from 'material-table';

import FilterListIcon from '@material-ui/icons/FilterList';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import axios from 'axios';

import Header from 'component/Header.js';

import style from 'assets/jss/InfluenceStyle.js';

const useStyles = makeStyles(style);

var maxSub = 0;
var maxPost = 0;
var maxEv = 0;
function Influence() {
    const classes = useStyles();
    const [accountType, setAccountType] = React.useState(0);
    const [follow, setFollow] = React.useState([0, 100]);
    const [relevant, setRelevant] = React.useState([0, 100]);
    const [post, setPost] = React.useState([0, 100]);
    const [engagement, setEngagement] = React.useState(0);
    const [recentPost, setRecentPost] = React.useState(0);
    const [verifyFlg, setVerifyFlg] = React.useState('no');
    const [previous, setPrevious] = React.useState(0);
    const [mamaCollaboration, setMamaCollaboration] = React.useState('yes');
    const [male, setMale] = React.useState([30, 60]);
    const [female, setFemale] = React.useState([30, 60]);
    const [age, setAge] = React.useState([30, 60]);
    const [userList, setUserList] = React.useState([]);
    const [userList1, setUserList1] = React.useState([]);
    const [campaignModal, setCampaignModal] = React.useState(false);
    const [campaignName, setCampaignName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [startDate, setStateDate] = React.useState("2017-05-24");
    const [endDate, setEndDate] = React.useState("2017-05-24");
    const [reward, setReward] = React.useState([0]);
    const [load, setLoad] = React.useState(false);
    const [preveiwImage, setPreviewImage] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [fileProgress, setFileProcess] = React.useState(0);
    const [videoUrl, setVideoUrl] = React.useState("");
    const [videoName, setVideoName] = React.useState("");
    const [youTubeVideo, setYoutubeVideo] = React.useState(false);
    const [youtubeVideoList, setYoutubeVideoList] = React.useState([]);

    function rewardAdd() {
        var rew = reward;
        rew.push(0);
        setReward(rew);
        setLoad(!load);
    }
    function rewardChange(e, index) {
        var rew = reward;
        rew[index] = e.target.value
        setReward(rew);
        setLoad(!load);
    }
    function backImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let newFile = e.target.files[0];
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(newFile);
        var formData = new FormData();
        formData.append('file', newFile);
        axios.post(`${window.$host_url}upload-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
            }
        })
            .then(res => {

                setImageURL(res.data.data.url);
            })
            .catch(err => {
                console.log(err)
            })
    }
    function videoChange(e) {
        e.preventDefault();
        let newFile = e.target.files[0];
        setVideoName(newFile.name);
        const file_size = newFile.size;
        var formData = new FormData();
        formData.append("file", newFile);
        axios.post(`${window.$host_url}upload-file`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                setFileProcess((progressEvent.loaded / file_size) * 100);
            },
        })
            .then((res) => {
                setVideoUrl(res.data.data.url);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function createCampaign() {
        const data = {
            "query": [],
            "name": campaignName,
            "description": description,
            "price": reward,
            "categories": ["Skin"],
            "start_at": startDate + " 00:00:00",
            "end_at": endDate + " 00:00:00",
            "video_url": videoUrl,
            "image_url": imageURL
        }
        axios.post(`${window.$host_url}campaigns/save`, data)
            .then(res => {
                setCampaignName("");
                setDescription("");
                setStateDate('2017-05-24');
                setEndDate('2017-05-24');
                setReward([0]);
                setImageURL("");
                setPreviewImage("");
                setVideoUrl("");
                setVideoName("");
                setCampaignModal(false);
            })
            .catch(err => {
                console.log(err)
            })
    }
    function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : false;
    }
    function openYoutube(data) {
        console.log(data);
        setYoutubeVideo(true);
        if (data !== undefined) {
            var video_list = [];
            for (var i in data.videoData) {
                var video_data = {
                    name: data.videoData[i].name,
                    viewCount: data.videoData[i].videoInfo.viewCount,
                    likeCount: data.videoData[i].videoInfo.likeCount,
                    dislikeCount: data.videoData[i].videoInfo.dislikeCount,
                    commentCount: data.videoData[i].videoInfo.commentCount
                }
                video_list.push(video_data);
            }
            console.log(video_list);
            setYoutubeVideoList(video_list)
        }
        else {
            setYoutubeVideoList([]);
        }
    }
    function followChange(value) {
        setFollow(value);
        var user_list = [];
        for (var i in userList1) {
            if (userList1[i].follow >= value[0] && userList1[i].follow < value[1]) {
                user_list.push(userList1[i]);
            }
        }
        setUserList(user_list);
    }
    function relevantChange(value) {
        setRelevant(value);
        var user_list = [];
        for (var i in userList1) {
            if (userList1[i].engagement >= value[0] && userList1[i].engagement < value[1]) {
                user_list.push(userList1[i]);
            }
        }
        setUserList(user_list);
    }
    function postChange(value) {
        setPost(value);
        var user_list = [];
        for (var i in userList1) {
            if (userList1[i].post >= value[0] && userList1[i].post < value[1]) {
                user_list.push(userList1[i]);
            }
        }
        setUserList(user_list);
    }
    function verifyChange(e) {
        setVerifyFlg(e.target.value);
        var user_list = [];
        if (e.target.value === 'no') {
            for (var i in userList1) {
                if (userList1[i].verify === 0) {
                    user_list.push(userList1[i]);
                }
            }
        }
        else {
            for (var i in userList1) {
                if (userList1[i].verify === 1) {
                    user_list.push(userList1[i]);
                }
            }
        }

        setUserList(user_list);
    }
    React.useEffect(() => {
        axios.post(`${window.$host_url}user/read`, {})
            .then((res) => {
                var user_list = [];
                var user_data = {};
                console.log(res.data.result)
                for (var i in res.data.result) {
                    var totalViewCounter = 0;
                    if (res.data.result[i].video_data.videoData !== undefined) {
                        for (var j in res.data.result[i].video_data.videoData) {
                            totalViewCounter += parseInt(res.data.result[i].video_data.videoData[j].videoInfo.viewCount);
                        }
                        if (maxSub < res.data.result[i].video_data.videoData.subscriber) {
                            maxSub = res.data.result[i].video_data.videoData.subscriber
                        }
                        if (maxPost < res.data.result[i].video_data.videoData.length) {
                            maxPost = res.data.result[i].video_data.videoData.length
                        }
                        if (maxEv < totalViewCounter) {
                            maxEv = totalViewCounter
                        }
                    }
                    user_data = {
                        img: res.data.result[i].info.image,
                        name: res.data.result[i].info.name,
                        follow: res.data.result[i].video_data.subscriber !== undefined ? res.data.result[i].video_data.subscriber : 0,
                        post: res.data.result[i].video_data.videoData !== undefined ? res.data.result[i].video_data.videoData.length : 0,
                        relevant: 0,
                        engagement: totalViewCounter,
                        category: res.data.result[i].categories,
                        video: res.data.result[i].videos,
                        youtubeVideo: res.data.result[i].video_data,
                        id: res.data.result[i].auth.uid,
                        verify: res.data.result[i].info.kyc_flg
                    }
                    user_list.push(user_data);
                }
                setUserList(user_list);
                setUserList1(user_list);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <>
            <Header />
            <div className={classes.container}>
                <div className={classes.filterPart}>
                    <Paper className={classes.filterContent}>
                        <div className="header">
                            <FilterListIcon />
                            Filters
                            <div style={{ flex: 1 }}></div>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={0}>Instagram</MenuItem>
                                    <MenuItem value={1}>Youtube</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="slid-filter">
                            <p style={{ fontSize: 18, fontWeight: 700 }}>Influence</p>
                            <div className="slid-item">
                                <p>Followers</p>
                                <Slider
                                    value={follow}
                                    onChange={(e, newValue) => followChange(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                // max={maxSub}
                                />
                            </div>
                            <div className="slid-item">
                                <p>Engagement</p>
                                <Slider
                                    value={relevant}
                                    onChange={(e, newValue) => relevantChange(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    // max={maxPost}
                                    valueLabelDisplay="on"
                                />
                            </div>
                            <div className="slid-item">
                                <p>Post</p>
                                <Slider
                                    value={post}
                                    onChange={(e, newValue) => postChange(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                // max={maxEv}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <p>Engagement rate</p>
                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                <Select
                                    value={engagement}
                                    onChange={(e) => setEngagement(e.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={0}>Any</MenuItem>
                                    <MenuItem value={1}>AAA</MenuItem>
                                    <MenuItem value={2}>BBB</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <p>Most recent post(days ago)</p>
                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                <Select
                                    value={recentPost}
                                    onChange={(e) => setRecentPost(e.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={0}>Any</MenuItem>
                                    <MenuItem value={1}>AAA</MenuItem>
                                    <MenuItem value={2}>BBB</MenuItem>
                                </Select>
                            </FormControl>
                        </div> */}
                        <div>
                            <p>Verified account</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={verifyFlg} onChange={(e) => verifyChange(e)}>
                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {/* <div>
                            <p>Previous collaboration</p>
                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                <Select
                                    value={previous}
                                    onChange={(e) => setPrevious(e.target.value)}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={0}>Any</MenuItem>
                                    <MenuItem value={1}>AAA</MenuItem>
                                    <MenuItem value={2}>BBB</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <p>Mamaearth collaboration</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={mamaCollaboration} onChange={(e) => setMamaCollaboration(e.target.value)}>
                                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="slid-filter">
                            <p style={{ fontSize: 18, fontWeight: 700 }}>Audience gender</p>
                            <div className="slid-item">
                                <p>Male</p>
                                <Slider
                                    value={male}
                                    onChange={(e, newValue) => setMale(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                />
                            </div>
                            <div className="slid-item">
                                <p>Female</p>
                                <Slider
                                    value={female}
                                    onChange={(e, newValue) => setFemale(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                />
                            </div>
                            <div className="slid-item">
                                <p>Audience age</p>
                                <Slider
                                    value={age}
                                    onChange={(e, newValue) => setAge(newValue)}
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                />
                            </div>
                        </div> */}
                    </Paper>
                </div>
                <div className={classes.tablePart}>
                    <Paper className={classes.tableContent}>
                        <div className="header">
                            <h3>Discover new influencers</h3>
                            <div style={{ flex: 1 }}></div>
                            <Button variant="contained" color="primary" onClick={() => { setCampaignModal(true) }}>
                                Create Campaign
                            </Button>
                        </div>

                        <MaterialTable
                            title=""
                            columns={[
                                {
                                    title: '@username',
                                    field: 'imageUrl',
                                    render: rowData =>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={rowData.img} style={{ width: 40, borderRadius: '50%', marginRight: '10px' }} alt="avatar" />
                                            <span>@{rowData.name.split(" ")[0]}</span>
                                        </div>
                                },
                                { title: 'Followers', field: 'follow' },
                                { title: 'Posts', field: 'post' },
                                { title: 'Engagement', field: 'engagement' },
                                {
                                    title: 'View',
                                    field: 'youtubeVideo',
                                    render: rowData =>
                                        <div>
                                            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => { openYoutube(rowData.youtubeVideo) }}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </div>
                                },
                                {
                                    title: 'Preferred categories',
                                    field: 'category',
                                    render: rowData =>
                                        <div className={classes.categories}>
                                            {rowData.category.map(function (item, i) {
                                                return (
                                                    <div key={i} className="item-list">{item}</div>
                                                )
                                            })}
                                        </div>
                                },
                            ]}
                            data={userList}
                            detailPanel={rowData => {
                                return (
                                    rowData.video.length === 0 ? (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '400px',
                                            padding: '15px 0px',
                                            fontSize: 25,
                                            fontWeight: 700,
                                            textAlign: "center",
                                            margin: 'auto'
                                        }}>
                                            The user didn't upload any video
                                        </div>
                                    ) : (
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <iframe
                                                    title="myFrame"
                                                    width="400"
                                                    height="315"
                                                    src={
                                                        rowData.video[rowData.video.length - 1].video_url.includes('youtube') ? (
                                                            `https://www.youtube.com/embed/${youtubeParser(rowData.video[rowData.video.length - 1].video_url)}`
                                                        ) : (
                                                                rowData.video[rowData.video.length - 1].video_url
                                                            )}
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                    allowfullscreen
                                                />
                                            </div>

                                        )

                                )
                            }}
                            options={{
                                selection: true,
                                search: true
                            }}
                        />
                    </Paper>
                </div>
            </div>
            <Dialog
                open={campaignModal}
                onClose={() => { setCampaignModal(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Create Campaign"}</DialogTitle>
                <DialogContent>
                    <div id="alert-dialog-description">
                        <TextField
                            id="name"
                            label="Campaign Name"
                            variant="outlined"
                            onChange={(e) => setCampaignName(e.target.value)}
                            value={campaignName}
                            fullWidth
                            className={classes.formInput}
                        />
                        <TextField
                            id="description"
                            label="Campaign Description"
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            fullWidth
                            className={classes.formInput}
                        />
                        <div className={classes.datePart}>
                            <TextField
                                id="start"
                                label="Start Date"
                                variant="outlined"
                                onChange={(e) => setStateDate(e.target.value)}
                                value={startDate}
                                fullWidth
                                className={"date-item"}
                                type="date"
                            />
                            <TextField
                                id="end"
                                label="End Date"
                                variant="outlined"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                                fullWidth
                                className="date-item"
                                style={{ marginLeft: '10px' }}
                                type="date"
                            />
                        </div>

                        <div className={classes.rewardPart}>
                            <div>
                                {reward.map(function (item, i) {
                                    return (
                                        <TextField
                                            id={`${i}reward`}
                                            label={`${i + 1}th Reward`}
                                            variant="outlined"
                                            onChange={(e) => rewardChange(e, i)}
                                            value={item}
                                            fullWidth
                                            className={classes.formInput}
                                            type="number"
                                            size="small"
                                            key={i}
                                        />
                                    )
                                })}
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <Button color="primary" onClick={rewardAdd} style={{ marginTop: '10px', minWidth: '170px' }}>
                                Add More Reward
                            </Button>
                        </div>
                        <p className="title">Background Image</p>
                        <div className={classes.filePart}>
                            {preveiwImage === "" ? (
                                <label htmlFor="image" style={{ textAlign: 'center' }}>
                                    <img src={require('assets/img/file-default.png')} alt="default" />
                                    <p>Upload Image</p>
                                </label>
                            ) : (
                                    <div style={{ display: 'flex' }}>
                                        <img src={preveiwImage} alt="default" style={{ width: '70%', marginRight: 30 }} />
                                        <IconButton aria-label="delete" onClick={() => {
                                            setImageURL("");
                                            setPreviewImage("");
                                        }}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </div>
                                )}
                            <input type="file" accept=".png" id="image" style={{ display: 'none' }} onChange={backImageChange} />
                        </div>
                        <br />
                        <p className="title">Video</p>
                        <div className={classes.filePart}>
                            {videoName === "" ? (
                                <label htmlFor="video" style={{ textAlign: 'center' }}>
                                    <img src={require('assets/img/file-default.png')} alt="default" />
                                    <p>Upload Video</p>
                                </label>
                            ) : (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ marginRight: '10px' }}>{videoName}</div>
                                        <div style={{ flex: 1 }}></div>
                                        <CircularProgress
                                            variant="static"
                                            value={fileProgress}
                                        />
                                        <IconButton aria-label="delete" onClick={() => {
                                            setVideoName("");
                                            setVideoUrl("");
                                        }}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </div>
                                )}

                            <input type="file" id="video" style={{ display: 'none' }} onChange={videoChange} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => { createCampaign() }}
                        color="primary"
                        fullWidth variant="contained"
                        disabled={
                            (
                                campaignName !== "" &&
                                description !== "" &&
                                imageURL !== "" &&
                                videoUrl !== ""
                            ) ? false : true
                        }
                    >
                        Create Campaign
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={youTubeVideo}
                onClose={() => { setYoutubeVideo(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                <DialogContent>
                    <MaterialTable
                        title="Youtube Video List"
                        columns={[
                            {
                                title: 'Video Name',
                                field: 'name',
                                render: rowData => {
                                    return (
                                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{rowData.name}</span>
                                    )
                                }
                            },
                            { title: 'View', field: 'viewCount' },
                            { title: 'Like', field: 'likeCount' },
                            { title: 'Dislike', field: 'dislikeCount' },
                            { title: 'Comment', field: 'commentCount' },
                        ]}
                        data={youtubeVideoList}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setYoutubeVideo(false) }} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default Influence;