import React, { useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { checkRadio } from './setupSlice';
import { Radio, Text } from '@nextui-org/react';



export default function Settings() {
   
    const [checked, setChecked] = React.useState('1');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkRadio(checked))
    },[checked])

    return (      
        <Radio.Group 
            label="" 
            aria-label={'Options'}
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