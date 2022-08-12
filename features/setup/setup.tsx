import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { checkRadio, selectRadio } from './setupSlice';
import { Radio, Text } from '@nextui-org/react';
import styles from './setup.module.css';



export default function Settings() {

    const get_radio = useAppSelector(selectRadio);

   
    const [checked, setChecked] = React.useState('1');

    const dispatch = useAppDispatch();


    
    useEffect(() => {
        dispatch(checkRadio(checked))
    },[checked])



    return (      
        <Radio.Group 
            label="" 
            defaultValue="1" 
            orientation="horizontal"
            value={checked}
            onChange={setChecked}
            >
            <Radio value="1" >
                <Text>Generate text</Text>
            </Radio>
            <Radio value="2" >
                <Text>Copy and paste</Text>
            </Radio>
        </Radio.Group>
    );
}