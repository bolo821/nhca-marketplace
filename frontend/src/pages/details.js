import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
//mui library
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewIcon from '@mui/icons-material/Preview';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Switch, FormControlLabel, Backdrop, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, OutlinedInput, Paper, Skeleton, Stack, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
//web3
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Config from "../config/app";
//
import axios from "axios";
//
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
const SampleNFTS = [
  { name: "CERFB", attr1: "COMMUM", attr2: "50", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/gz0JLavQc0bo9yugYS4V11waMcBvO_teKrYf95OPVnutpX0pmf6yK5K1EwiCXHHm8caykp1a9MynlqdIdu5nC7h1JR55zbIsM_8RFQ=w308" },
  { name: "CERFR", attr1: "RARE", attr2: "100", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/7Xa_rCEIpT7tmPsRVJjVOX6BpekNuhy8BQG0wAboE2q-unHY7HB1uL5Aq2AA2eopWFzpyxh__jmTQmfz4StHWC7HjdrKIuvcqQYdeA=w308" },
  { name: "CERFS", attr1: "EPIC", attr2: "200", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/gu6jVs-1PE8ilpFHY6tzZi_qubJrYq5c7Quu7VZflRoSGiiK3fyU_c0vwmLcundlz1Zth0wxMkRtKmCh-_K3qoWnPa9uI5o4jhd6GQ=w308" },
]
const Details = () => {
  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };

  const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
  );

  const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
  );

  const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
  );

  const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

  const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const components = {
      Root: StyledButton,
      Listbox: StyledListbox,
      Popper: StyledPopper,
      ...props.components,
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
  });

  const history = useHistory();
  const params = useParams();
  const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
  const [NFTData, setNFTData] = useState({});
  const [updatePrice, setUpdatePrice] = useState();
  const [updateToken, setUpdateToken] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [NFTHistory, setNFTHistory] = useState([]);

  const saleNFT = async (tokenId, stat, price) => {
    try {
      const web3 = new Web3(library.provider);
      const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
      setLoading(true);
      const value = web3.utils.toWei(price.toString());
      const status = await NFTContract.methods.updateListingStatus(tokenId, stat, value).send({ from: account });
      console.log(status)
      load();
      setLoading(false);
    } catch (e) {
      console.log(e)
      alert("Error");
      setLoading(false);
    }
  }

  const buyNFT = async (tokenId, price) => {
    try {
      const web3 = new Web3(library.provider);
      const value = web3.utils.toWei(price);
      const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
      setLoading(true);
      const status = await NFTContract.methods.buy(tokenId).send({ from: account, value: value });
      console.log(status)
      load();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("Error")
    }
  }

  const update = (tokenId, price) => {
    setUpdatePrice(price)
    setOpenUpdate(true);
    setUpdateToken(tokenId);
  }

  const saveUpdatedPrice = async () => {
    try {
      const web3 = new Web3(library.provider);
      const value = web3.utils.toWei(updatePrice);
      const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
      setOpenUpdate(false);
      setLoading(true);
      const status = await NFTContract.methods.updatePrice(updateToken, value).send({ from: account });
      console.log(status)
      load();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("Error")
    }
  }

  const saleOfNft = (tokenId, status, price) => {
    setUpdatePrice(price)
    setOpenSale(true);
    setUpdateToken(tokenId);
  }

  const sale = async () => {
    try {
      const web3 = new Web3(library.provider);
      const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
      setOpenSale(false);
      setLoading(true);
      const value = web3.utils.toWei(updatePrice.toString());
      const status = await NFTContract.methods.updateListingStatus(updateToken, true, value).send({ from: account });
      console.log(status)
      load();
      setLoading(false);
    } catch (e) {
      console.log(e)
      alert("Error");
      setLoading(false);
    }
  }

  const load = async () => {
    const tokenId = params.id;
    const web3 = new Web3(library.provider);
    const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
    const unitNFT = await NFTContract.methods.tokenOfIndex(tokenId).call();
    console.log(tokenId)
    const tokenHistory = await NFTContract.methods.allHistory(tokenId).call();
    console.log(tokenHistory)
    const historyData = [];
    for (let i = 0; i < tokenHistory.length; i++) {
      console.log(tokenHistory[i].time)
      const timestamp = parseInt(tokenHistory[i].time);
      const date = new Date(timestamp * 1000);
      const correctData = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds();

      historyData.push({
        tokenId: tokenHistory[i].tokenId,
        type: i === 0 ? "Mint" : "Transfer",
        from: tokenHistory[i].from,
        to: tokenHistory[i].to,
        price: web3.utils.fromWei(tokenHistory[i].price),
        date: correctData,
      })
    }
    setNFTHistory(historyData)
    await axios.post(`${Config.Backend}/get`, { id: unitNFT.tokenURI }).then(async (res) => {
      const res_data = res.data;
      const data = {
        tokenId: unitNFT.tokenId,
        owner: unitNFT.owner,
        artist: unitNFT.artist,
        isListed: unitNFT.isListed,
        tokenURI: unitNFT.tokenURI,
        price: web3.utils.fromWei(unitNFT.price),
        image: res_data.data.data.img,
        name: res_data.data.data.name,
        attr1: res_data.data.data.attr1,
        attr2: res_data.data.data.attr2,
        attr3: res_data.data.data.attr3,
      }
      setNFTData(data)
    })
  }

  useEffect(() => {
    if (account) {
      load();
    } else {
      setNFTData([])
    }
  }, [account]);

  return (
    <React.Fragment>
      <Head title="Default Dashboard" />
      <Content>
        <Container>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Stack spacing={3} alignItems="center" justifyContent="space-between" direction="row">
            <Stack spacing={3}>
              <Typography variant="h3" style={{ fontWeight: 600 }}>NFT DETAILS</Typography>
              <Typography variant="h6">Here is NFT details.</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Stack>
                <Button variant="contained" fullWidth startIcon={<AutoFixHighIcon />} onClick={() => { history.push('/') }}>MarketPlace</Button>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack pb={10}></Stack>
          <Paper >
            <Stack p={5}>
              <Grid container spacing={5}>
                <Grid md={6} item>
                  <Box component="img" src={NFTData.image}></Box>
                  <Stack justifyContent="center" pt={3} spacing={1}>
                    <Typography textAlign="center" variant="h5" sx={{ fontWeight: 600 }}>HISTORY</Typography>
                  </Stack>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">From</TableCell>
                          <TableCell align="center">To</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          NFTHistory ?
                            NFTHistory.map((item, key) => (
                              <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center">{item.type}</TableCell>
                                <TableCell align="center">{item.from}</TableCell>
                                <TableCell align="center">{item.to}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center">{item.date}</TableCell>
                              </TableRow>
                            ))
                            :
                            ""
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid md={6} item>
                  <Stack justifyContent="center" spacing={1}>
                    <Typography textAlign="center" variant="h4" sx={{ fontWeight: 600 }}>DETAILS</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Name : </Typography>
                      <Typography variant="h7">{NFTData.name}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Price : </Typography>
                      <Typography variant="h7">{NFTData.price} BNB</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Rarities : </Typography>
                      <Typography variant="h7">{NFTData.attr1}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">XP : </Typography>
                      <Typography variant="h7">{NFTData.attr2} XP</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Bronze : </Typography>
                      <Typography variant="h7">{NFTData.attr3}</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">Owner : </Typography>
                      <Typography variant="h7">{NFTData.owner}</Typography>
                    </Stack>
                    <Divider />
                    <Stack pb={5}></Stack>
                    {
                      NFTData.owner == account ?
                        NFTData.isListed ?
                          <>
                            <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => saleNFT(NFTData.tokenId, false, NFTData.price)}>Not Sale</Button>
                            <Button variant="outlined" fullWidth startIcon={<RestartAltIcon />} onClick={() => update(NFTData.tokenId, NFTData.price)}>Update Price</Button>
                          </>
                          :
                          <>
                            <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => saleOfNft(NFTData.tokenId, true, NFTData.price)}>Sale NFT</Button>
                            <Button variant="outlined" fullWidth startIcon={<RestartAltIcon />} onClick={() => update(NFTData.tokenId, NFTData.price)}>Update Price</Button>
                          </>
                        :
                        NFTData.isListed ?
                          <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => buyNFT(NFTData.tokenId, NFTData.price)}>Buy NFT</Button>
                          :
                          <Button variant="outlined" fullWidth disabled startIcon={<ShoppingCartIcon />}>Not Sale</Button>
                    }
                  </Stack>
                </Grid>
              </Grid>

              <Dialog fullWidth open={openSale} onClose={() => setOpenSale(false)}>
                <DialogTitle>Sale NFT Price</DialogTitle>
                <DialogContent >
                  <Stack pt={5}>
                    <TextField fullWidth label="Price" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)}></TextField>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => sale()}>Sale</Button>
                </DialogActions>
              </Dialog>

              <Dialog fullWidth open={openUpdate} onClose={() => setOpenUpdate(false)}>
                <DialogTitle>Update NFT Price</DialogTitle>
                <DialogContent >
                  <Stack pt={5}>
                    <TextField fullWidth label="Price" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)}></TextField>
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => saveUpdatedPrice()}>Update</Button>
                </DialogActions>
              </Dialog>

            </Stack>
          </Paper>
        </Container>
      </Content>
    </React.Fragment>
  );
};

export default Details;
