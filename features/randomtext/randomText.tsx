import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addRandomTextAsync, selectText, selectStatus, resetTextArea } from './randomTextSlice';
import { selectRadio } from '../setup/setupSlice';
import { populateHashtable, storeTypedText, textLen, computeScore, resetScore } from '../score/scoreSlice';
import OneWay from '../modal/oneway';
import styles from './randomText.module.css';

import { Textarea, Loading, Button, Grid, Spacer, Modal, Image, Text, Link  } from "@nextui-org/react";


export default function RandomText() {

    const random_text_from_store = useAppSelector(selectText);
    const generated_text_status = useAppSelector(selectStatus);
    const get_radio = useAppSelector(selectRadio);

    const dispatch = useAppDispatch();

    const [copy_paste_text, setCopyPasteText] = useState('')
    const [typed_text, setTypedText] = useState('')


    const handleTypedTextChange = (e:any) => setTypedText(e.target.value);
    const handleCopyPasteChange = (e:any) => setCopyPasteText(e.target.value);


    const handleGenerateTextClick = async (e:any) => {
        // Create and dispatch the thunk function itself
        await dispatch(addRandomTextAsync())
    }


    const handleResetClick = async (e:any) => {
        // dispatch the thunk function itself
        setCopyPasteText('')
        setTypedText('')
        dispatch(resetTextArea())
        dispatch(resetScore())
    }

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    const handleKeyDown = async (e:any) => {
        if(e.keyCode === 8 || e.keyCode === 46){
            e.preventDefault();
            handler()
        }
    }

    useEffect(() => {
        if(random_text_from_store.length > 0)
        console.log('hashing')
        dispatch(populateHashtable())
    },[random_text_from_store])

    useEffect(() => {
        dispatch(storeTypedText(typed_text))
        dispatch(computeScore())
    },[typed_text])

    const text = random_text_from_store.trim();
    const trimmedText = text.length;

    useEffect(() => {
        dispatch(textLen(trimmedText))
    }, [trimmedText])



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
                                <Button className={styles.generate_button} onClick={handleGenerateTextClick}>
                                    {
                                    generated_text_status == 'loading' ?
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
                                value={copy_paste_text}
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
                        value={typed_text}
                        onChange={handleTypedTextChange}
                        onKeyDown={handleKeyDown}
                    >  
                    </Textarea>
                    <Spacer y={1}></Spacer>
                    <Button id={styles.reset_button} onClick={handleResetClick}>Reset challenge</Button>
                    </div>

                </div>
                <div>
                    <Modal noPadding open={visible} onClose={closeHandler}>
                        <Modal.Header
                        css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
                        >
                        <Text color="#363449">
                            Photo by{" "}
                            <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://unsplash.com/@kadams77?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                
                            >
                            K Adams
                            </Link>{" "}
                            on{" "}
                            <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://unsplash.com/s/photos/one-way-sign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                            >
                            Unsplash
                            </Link>
                        </Text>
                        </Modal.Header>
                        <Modal.Body>
                        <Image
                            showSkeleton
                            src="https://res.cloudinary.com/dk02ty1w8/image/upload/v1660386475/mark-duffel-U5y077qrMdI-unsplash_1_ds3cgw.jpg"
                            width={774}
                            height={350}
                        />
                        </Modal.Body>
                    </Modal>
                </div>
        </Grid.Container>
    );
}