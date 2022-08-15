import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { checkRadio } from './setupSlice';
import { selectTypedText } from '../score/scoreSlice';
import { Radio, Text } from '@nextui-org/react';



export default function Settings() {
   
    const [checked, setChecked] = React.useState('1');
    const get_typed_text = useAppSelector(selectTypedText);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let ischecked = checked === "1" ? true : false
        dispatch(checkRadio(ischecked))
    },[checked])

    return (      
        <Radio.Group 
            label="" 
            aria-label={'Options'}
            defaultValue="1" 
            orientation="horizontal"
            value={checked}
            onChange={setChecked}
            isDisabled={get_typed_text.length > 0}
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