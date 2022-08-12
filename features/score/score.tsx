import React, { useEffect, useReducer, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectText } from '../randomtext/randomTextSlice';
import { selectTotalScore, textLen } from '../score/scoreSlice';

import styles from './randomText.module.css';

import { Text, Grid, Spacer } from "@nextui-org/react";


export default function Score() {

    const random_text_from_store = useAppSelector(selectText);
    const get_total = useAppSelector(selectTotalScore);

    let hash = {};

    const text = random_text_from_store.trim();
    const trimmedText = text.length


    // const populateHash = () => {
    //     for(let i = 0; i < selectText.length; i++){

    //     }
    // }

    const dispatch = useAppDispatch();


    const handleClick = async (e:any) => {
        // Create and dispatch the thunk function itself
        //await dispatch(())
    }

    useEffect(() => {
        dispatch(textLen(trimmedText))
    }, [trimmedText])



    return (      
        <>
            <Text h6 size={15} color="black" css={{ m: 0 }}>
                Score: {get_total}
            </Text>
        </>
    );
}