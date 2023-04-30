import React, { useState,  useEffect } from 'react'
import {Configuration, OpenAIApi}  from 'openai';
import { Button, InputLabel, TextField } from '@mui/material';
import "./Search.css";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
const[input, setInput]=useState("");
const[response,setResponse]=useState("")
const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

const handleChange=async(e)=>{
   setInput(e.target.value);
}

const handleSubmit=async()=>{
  const configuration = new Configuration({
      apiKey:process.env.REACT_APP_OPENAI,
    });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);
    setOpen(true);
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: input}],
    })
  setResponse(response.data.choices[0].message.content)
  console.log(response)
}

const handleKeyPress = (event) => {
  if(event.key === 'Enter'){
    handleSubmit()
  }
}

  return (
    <div className='main'>
      <div className='text_input_container'>   
      <InputLabel type="text"><b> Ask Me Anything! </b></InputLabel> 
        <TextField type="text" fullWidth className="text_input" onChange={handleChange} onKeyPress={handleKeyPress} placeholder='Search'>Search</TextField>
      </div>
      <Button variant="outlined" onClick={handleSubmit}>
      Click for the Answer!
      </Button>
    <div className='answer'>
      <Dialog
        fullWidth
        maxWidth='lg'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Answer:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {response ? response: "Loading..."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}

export default Search