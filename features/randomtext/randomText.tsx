import React, { useReducer, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addRandomTextAsync, selectText, selectStatus, resetTextArea } from './randomTextSlice';
import { selectRadio } from '../setup/setupSlice';

import styles from './randomText.module.css';

import { Textarea, Loading, Button, Grid, Spacer } from "@nextui-org/react";




export default function RandomText() {

    const random_text_from_store = useAppSelector(selectText);
    const status = useAppSelector(selectStatus);
    const get_radio = useAppSelector(selectRadio);

    const [copy_paste, setCopyPasteText] = useState('')
    const [text, setText] = useState('')

    const dispatch = useAppDispatch();

    const handleChange = (e:any) => setText(e.target.value);
    const handleCopyPasteChange = (e:any) => setCopyPasteText(e.target.value);


    const handleClick = async (e:any) => {
        // Create and dispatch the thunk function itself
        await dispatch(addRandomTextAsync())
    }

    const handleResetClick = async (e:any) => {
        // Create and dispatch the thunk function itself
        setCopyPasteText('')
        setText('')
        dispatch(resetTextArea())
    }



    return (      
        <Grid.Container justify="center" >
                <div className={styles.grid}>
                
                    {
                        get_radio === '1' ?
                            <div className={styles.text_source}>
                                <Textarea 
                                    bordered
                                    id="main-text" 
                                    name="main_text" 
                                    rows={6} cols={50} 
                                    maxLength={200}
                                    placeholder={'Generate random text by clicking the "Generate text" button below'}
                                    value={random_text_from_store}
                                >
                                </Textarea>
                                <Spacer y={1}></Spacer>
                                <Button className={styles.generate_button} onClick={handleClick}>
                                    {
                                    status == 'loading' ?
                                    <Loading color="currentColor" type="points" size="sm" />
                                    : "Generate text"
                                    }
                                    
                                </Button>
                            </div>
                        :
                        <div className={styles.text_source}>
                            <Textarea 
                                bordered
                                id="copy-paste" 
                                name="copy_paste" 
                                rows={6} cols={50} 
                                maxLength={200}
                                placeholder={'Copy and paste a text to start your typing challenge'}
                                value={copy_paste}
                                onChange={handleCopyPasteChange}
                            >
                            </Textarea>
                            <Spacer y={1}></Spacer>
                            <Button disabled light className={styles.generate_button} auto></Button>
                        </div>
                    }
                
                    <Spacer y={1}></Spacer>
                
                    <div className={styles.text_source}>
                    <Textarea 
                        bordered
                        id="type-along" 
                        name="typealong" 
                        minRows={10} cols={50} 
                        maxLength={200}
                        labelPlaceholder={'Type here to begin your challenge'}
                        value={text}
                        onChange={handleChange}
                    >  
                    </Textarea>
                    <Spacer y={1}></Spacer>
                    <Button id={styles.reset_button} onClick={handleResetClick}>Reset text</Button>
                    </div>

                </div>
        </Grid.Container>
    );
}