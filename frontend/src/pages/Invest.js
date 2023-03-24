import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
//mui library
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewIcon from '@mui/icons-material/Preview';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Link, Box, Button, Card, CardContent, CircularProgress, Switch, FormControlLabel, Backdrop, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, OutlinedInput, Paper, Skeleton, Stack, TextField, Typography, Alert, AlertTitle } from "@mui/material"

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
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
import { styled, typography } from '@mui/system';

const SampleNFTS = [
  { name: "CERFB", attr1: "COMMUM", attr2: "50", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/gz0JLavQc0bo9yugYS4V11waMcBvO_teKrYf95OPVnutpX0pmf6yK5K1EwiCXHHm8caykp1a9MynlqdIdu5nC7h1JR55zbIsM_8RFQ=w308" },
  { name: "CERFR", attr1: "RARE", attr2: "100", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/7Xa_rCEIpT7tmPsRVJjVOX6BpekNuhy8BQG0wAboE2q-unHY7HB1uL5Aq2AA2eopWFzpyxh__jmTQmfz4StHWC7HjdrKIuvcqQYdeA=w308" },
  { name: "CERFS", attr1: "EPIC", attr2: "200", attr3: "BRONZE", img: "https://lh3.googleusercontent.com/gu6jVs-1PE8ilpFHY6tzZi_qubJrYq5c7Quu7VZflRoSGiiK3fyU_c0vwmLcundlz1Zth0wxMkRtKmCh-_K3qoWnPa9uI5o4jhd6GQ=w308" },
]
const InvestHomePage = () => {
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
  const { activate, active, account, deactivate, connector, error, setError, library, chainId } = useWeb3React();
  const [NFTData, setNFTData] = useState([]);
  const [updatePrice, setUpdatePrice] = useState(0.1);
  const [updateToken, setUpdateToken] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveData, setSaveData] = useState({});
  const [loading, setLoading] = useState(false);
  const [myNFT, setMyNFT] = useState(false);
  const [selectData, setSelectData] = useState({ Rarities: "ALL", Bronze: "ALL" })
  const [contractOwner, setContractOwner] = useState("");
  const mint = async () => {
    try {
      const ramdom = Math.floor(Math.random() * 3);
      const NFT = SampleNFTS[ramdom];
      await axios.post(`${Config.Backend}/save`, { address: account, data: NFT }).then(async (res) => {
        const data = res.data;
        const uri = `${data.data._id}`;
        const web3 = new Web3(library.provider);
        const value = web3.utils.toWei("0.1");
        const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
        setLoading(true);
        const nft = await NFTContract.methods.mint(uri).send({ from: account, value: value });
        console.log(nft);
        load();
        setLoading(false)
      })
    } catch (e) {
      alert("Error")
      setLoading(false)
    }
  }

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

  const saveNFT = async (id) => {
    console.log(id)
    setLoading(true);
    await axios.post(`${Config.Backend}/edit`, { id: id, data: saveData }).then(async (res) => {
      const data = res.data;
      console.log(data);
      load();
      setLoading(false);
    })
  }

  const preview = (item) => {
    history.push(`/nfts/${item.tokenId}`)
    // setUpdate(true)
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

  const edit = (item) => {
    setEditData(item)
    setSaveData({
      ...saveData,
      name: item.name,
      attr1: item.attr1,
      attr2: item.attr2,
      attr3: item.attr3,
      img: item.image
    });

    setEditOpen(true)
  }

  const load = async () => {
    const web3 = new Web3(library.provider);
    const NFTContract = new web3.eth.Contract(Config.NFT.abi, Config.NFT.address);
    const allNFTS = await NFTContract.methods.allTokens().call();
    const owner = await NFTContract.methods.contractOwner().call();
    setContractOwner(owner)
    console.log(owner)
    const total = [];
    for (let i = 0; i < allNFTS.length; i++) {
      if (myNFT) {
        console.log(myNFT)
        if (allNFTS[i].owner === account) {
          await axios.post(`${Config.Backend}/get`, { id: allNFTS[i].tokenURI }).then(async (res) => {
            const res_data = res.data;
            if (selectData.Rarities === "ALL" && selectData.Bronze === "ALL") {
              total.push(putData(allNFTS[i], res_data))
            }
            else if (selectData.Rarities === "ALL") {
              if (selectData.Bronze === res_data.data.data.attr3) {
                total.push(putData(allNFTS[i], res_data))
              }
            }
            else if (selectData.Bronze === "ALL") {
              if (selectData.Rarities === res_data.data.data.attr1) {
                total.push(putData(allNFTS[i], res_data))
              }
            }
            else if (res_data.data.data.attr1 == selectData.Rarities && res_data.data.data.attr3 == selectData.Bronze) {
              total.push(putData(allNFTS[i], res_data))
            }
          })
        }
      } else {
        await axios.post(`${Config.Backend}/get`, { id: allNFTS[i].tokenURI }).then(async (res) => {
          const res_data = res.data;
          if (selectData.Rarities === "ALL" && selectData.Bronze === "ALL") {
            total.push(putData(allNFTS[i], res_data))
          }
          else if (selectData.Rarities === "ALL") {
            if (selectData.Bronze === res_data.data.data.attr3) {
              total.push(putData(allNFTS[i], res_data))
            }
          }
          else if (selectData.Bronze === "ALL") {
            if (selectData.Rarities === res_data.data.data.attr1) {
              total.push(putData(allNFTS[i], res_data))
            }
          }
          else if (res_data.data.data.attr1 == selectData.Rarities && res_data.data.data.attr3 == selectData.Bronze) {
            total.push(putData(allNFTS[i], res_data))
          }
        })
      }
    }
    setNFTData(total)
  }

  const putData = (data, resData) => {
    const web3 = new Web3(library.provider);
    console.log(resData.data)
    return {
      tokenId: data.tokenId,
      owner: data.owner,
      artist: data.artist,
      isListed: data.isListed,
      tokenURI: data.tokenURI,
      price: web3.utils.fromWei(data.price),
      image: resData.data.data.img,
      name: resData.data.data.name,
      attr1: resData.data.data.attr1,
      attr2: resData.data.data.attr2,
      attr3: resData.data.data.attr3,
      _id: resData.data._id
    }
  }

  useEffect(() => {
    if (account) {
      load();
      // change();
    } else {
      setNFTData([])
    }
  }, [account, selectData, myNFT]);

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
              <Typography variant="h3" style={{ fontWeight: 600 }}>NFT MAKETPLACE</Typography>
              <Typography variant="h6">Marketplace will be open after Minting Event</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Stack>
                <FormControlLabel control={<Switch value={myNFT} onChange={(e) => { myNFT ? setMyNFT(false) : setMyNFT(true) }} />} label="MY NFT" />
              </Stack>
              <Stack>
                <Button variant="contained" fullWidth startIcon={<AutoFixHighIcon />} onClick={() => mint()}>Mint NFT</Button>
              </Stack>
            </Stack>
          </Stack>
          <Divider />

          <Stack direction="row" justifyContent="space-around">
            <Stack>
              <Typography mx="8px" mt="8px" variant="caption" display="block" gutterBottom>
                Sort By
              </Typography>
              <CustomSelect defaultValue="high">
                <StyledOption value="high">ID:High to low</StyledOption>
                <StyledOption value="low">ID:Low to high</StyledOption>
                {/* <StyledOption value="rank-high">Rank:High to low</StyledOption>
                <StyledOption value="rank-low">Rank:Low to High </StyledOption> */}
              </CustomSelect>
            </Stack>

            <Stack>
              <Typography mx="8px" mt="8px" variant="caption" display="block" gutterBottom >
                Rarities
              </Typography>
              <CustomSelect value={selectData.Rarities} onChange={(e) => setSelectData({ ...selectData, Rarities: e })}>
                <StyledOption value="ALL">ALL</StyledOption>
                <StyledOption value="RARE">RARE</StyledOption>
                <StyledOption value="EPIC">EPIC</StyledOption>
                <StyledOption value="COMMON">COMMON</StyledOption>
                <StyledOption value="UNCOMMON">UNCOMMON</StyledOption>
                <StyledOption value="LEGENDARY">LEGENDARY</StyledOption>
              </CustomSelect>
            </Stack>

            <Stack>
              <Typography mx="8px" mt="8px" variant="caption" display="block" gutterBottom>
                Bronze
              </Typography>
              <CustomSelect value={selectData.Bronze} onChange={(e) => setSelectData({ ...selectData, Bronze: e })}>
                <StyledOption value="ALL">ALL</StyledOption>
                <StyledOption value="BRONZE">BRONZE</StyledOption>
                <StyledOption value="SILVER">SILVER</StyledOption>
                <StyledOption value="OR">OR</StyledOption>
                <StyledOption value="PLATINIUM">PLATINIUM</StyledOption>
                <StyledOption value="OBSIDIAN">OBSIDIAN</StyledOption>
              </CustomSelect>
            </Stack>
          </Stack>
          <Divider />

          <Stack mt={5}>
            <Grid container spacing={3}>
              {
                account ?
                  NFTData != "" ?
                    NFTData.map((item, key) => {
                      return (
                        <Grid item md={4} key={key}>
                          <Card sx={{ maxWidth: 345, m: 2 }}>
                            <CardHeader
                              avatar={
                                <Avatar
                                  alt="Ted talk"
                                  src={item.image}
                                />
                              }
                              action={
                                <Stack direction="row">
                                  {
                                    contractOwner == account ?
                                      <IconButton aria-label="edit" onClick={() => edit(item)}>
                                        <AutoFixHighIcon />
                                      </IconButton>
                                      :
                                      ""
                                  }
                                  <IconButton aria-label="preview" onClick={() => preview(item)}>
                                    <PreviewIcon />
                                  </IconButton>
                                </Stack>
                              }
                              title={<Stack onClick={() => preview(item)}><Typography variant="h6">{item.name}</Typography></Stack>}
                            />
                            <Box px={5}>
                              <a href={`${Config.Backend}/view?${item._id}`} target="_blank">
                                <CardMedia
                                  p={5}
                                  component="img"
                                  image={item.image}
                                  alt="NFT"
                                />
                              </a>
                            </Box>

                            <CardContent >
                              <Stack px={3} spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography variant="h6">Price</Typography>
                                  <Typography variant="h6">{item.price} BNB</Typography>
                                </Stack>
                                {
                                  item.owner == account ?
                                    item.isListed ?
                                      <>
                                        <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => { saleNFT(item.tokenId, false, item.price) }}>Not Sale</Button>
                                        <Button variant="outlined" fullWidth startIcon={<RestartAltIcon />} onClick={() => update(item.tokenId, item.price)}>Update Price</Button>
                                      </>
                                      :
                                      <>
                                        <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => { saleOfNft(item.tokenId, true, item.price) }}>Sale NFT</Button>
                                        <Button variant="outlined" fullWidth startIcon={<RestartAltIcon />} onClick={() => update(item.tokenId, item.price)}>Update Price</Button>
                                      </>
                                    :
                                    item.isListed ?
                                      <Button variant="outlined" fullWidth startIcon={<ShoppingCartIcon />} onClick={() => buyNFT(item.tokenId, item.price)}>Buy NFT</Button>
                                      :
                                      <Button variant="outlined" fullWidth disabled startIcon={<ShoppingCartIcon />}>Not Sale</Button>
                                }
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      )
                    })
                    :
                    <Grid md={12} item>
                      <Stack p={5}>
                        <Alert severity="info">
                          <AlertTitle>Info</AlertTitle>
                          There is no NFT! Please Mint your NFT.
                        </Alert>
                      </Stack>
                    </Grid>
                  :
                  <Grid md={12} item>
                    <Stack p={5}>
                      <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Please connect with your Metamask!
                      </Alert>
                    </Stack>
                  </Grid>

                // data.map((item, key) => {
                //   return (
                //     <Grid item md={4} key={key}>
                //       <Card sx={{ maxWidth: 345, m: 2 }}>
                //         <CardHeader
                //           avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                //           title={
                //             <Skeleton
                //               animation="wave"
                //               height={10}
                //               width="80%"
                //               style={{ marginBottom: 6 }}
                //             />
                //           }
                //           subheader={
                //             <Skeleton animation="wave" height={10} width="40%" />
                //           }
                //         />
                //         <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
                //         <CardContent>
                //           <React.Fragment>
                //             <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                //             <Skeleton animation="wave" height={10} width="80%" />
                //           </React.Fragment>
                //         </CardContent>
                //       </Card>
                //     </Grid>
                //   )
                // })
              }
            </Grid>
          </Stack>


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

          <Dialog fullWidth open={editOpen} onClose={() => setEditOpen(false)}>
            <DialogTitle>NFT Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Stack spacing={1}>
                    <Typography variant="caption" display="block" gutterBottom >NAME*</Typography>
                    <TextField variant="standard" value={saveData.name} onChange={(e) => setSaveData({ ...saveData, name: e.target.value })}></TextField>
                    <Typography variant="caption" display="block" gutterBottom >XP*</Typography>
                    <TextField variant="standard" value={saveData.attr2} onChange={(e) => setSaveData({ ...saveData, attr2: e.target.value })}></TextField>
                    <Stack>
                      <Typography mx="8px" mt="8px" variant="caption" display="block" gutterBottom>
                        BRONZE*
                      </Typography>
                      <CustomSelect value={saveData.attr3} onChange={(e) => { console.log(e); setSaveData({ ...saveData, attr3: e }) }}>
                        <StyledOption value="BRONZE">BRONZE</StyledOption>
                        <StyledOption value="SILVER">SILVER</StyledOption>
                        <StyledOption value="OR">OR</StyledOption>
                        <StyledOption value="PLATINIUM">PLATINIUM</StyledOption>
                        <StyledOption value="OBSIDIAN">OBSIDIAN</StyledOption>
                      </CustomSelect>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  <Box component="img" src={editData.image}></Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => saveNFT(editData.tokenURI)}>Save</Button>
              <Button variant="outlined" onClick={() => setEditOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>

        </Container>
      </Content>
    </React.Fragment>
  );
};

export default InvestHomePage;
