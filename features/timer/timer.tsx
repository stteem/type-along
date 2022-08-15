import React, { useEffect, useMemo, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTypedText } from '../score/scoreSlice';
import { isTimeup, addCustomTime, addPresetTime, selectStopTimer } from './timerSlice';

import { Grid } from "@nextui-org/react";

import styles from './timer.module.css'


export default function Timer() {

    const get_typed_text = useAppSelector(selectTypedText);
    const stop_timer = useAppSelector(selectStopTimer);
    const dispatch = useAppDispatch();

    const [preset_time, setPresetTime] = useState(1)
    const [preset_seconds, setPresetSeconds] = useState(10)

    const [custom_time, setCustomTime] = useState(0)
    const [custom_seconds, setCustomSeconds] = useState(10)
   
    const [selected_custom_time, setSelectedCustomTime] = useState(0)
    const [selected, setSelected] = useState('1')

    const [is_typing, setIsTyping] = useState("0")
    

    function handleTimeChange(e:any) {
        let strval = e.target.value
        if(strval === "1"){
            setSelected(strval)
            setPresetTime(1)
            setPresetSeconds(10)
        }
        else if(strval === "2") {
            setSelected(strval)
            setPresetTime(2) 
            setPresetSeconds(0)
        }
        else if(strval === "5") {
            setSelected(strval)
            setPresetTime(5)
            setPresetSeconds(10)
        }
        else {
            setSelected(strval)
            setSelectedCustomTime(3)
            setCustomSeconds(10)
            setCustomTime(3)
        }        
        
    }

    function handleCustomTime(e:any) {
        setCustomTime(e.target.value)
        setCustomSeconds(10)
        setSelectedCustomTime(e.target.value)
        setPresetTime(1)
        setPresetSeconds(10)
    }

    useEffect(() => {
        stop_timer === "0" ? 
        setIsTyping("0") :
        null
    })


    useEffect(() => {
        get_typed_text.length === 0 ? 
        setIsTyping("0") : 
        setIsTyping("1")

    }, [get_typed_text])

    // Count down timer for custom time
    useEffect(() => {
        
        if(is_typing === "1" && selected === "custom"){
            
            const interval = setInterval(() => {
                setCustomSeconds(custom_seconds => custom_seconds !== 0 ? custom_seconds - 1 : custom_seconds === 0 && custom_time > 0 ? 10 : custom_seconds);
                setCustomTime(custom_time => custom_time > 0 && custom_seconds === 10 ? custom_time - 1 : custom_time )
            }, 1000);
    
            return () => clearInterval(interval);
        }

    }, [is_typing, custom_seconds, selected])
    

    
    // Count down timer for preset time
    useEffect(() => {

        if (is_typing === "1" && selected !== "custom") {

            const preset_interval = setInterval(() => {
                setPresetSeconds(preset_seconds => preset_seconds !== 0 ? preset_seconds - 1 : preset_seconds === 0 && preset_time > 0 ? 10 : preset_seconds);
                setPresetTime(preset_time => preset_time > 0 && preset_seconds === 10 ? preset_time - 1 : preset_time )
            }, 1000);
    
            return () => clearInterval(preset_interval);
        }

    }, [is_typing, preset_seconds, selected])

    // Listens to typed text and resets timers when challenge is reset
    useEffect(() => {
        if(get_typed_text.length === 0){
            setCustomSeconds(10)
            setCustomTime(selected_custom_time)
            setPresetSeconds(10)
            setPresetTime(parseInt(selected))
        }
    }, [get_typed_text])


    useEffect(() => {
        if(custom_time === 0 && custom_seconds === 0) {
            dispatch(isTimeup("yes"))
        }
    },[custom_time, custom_seconds])

    

    useEffect(() => {
        if(preset_time === 0 && preset_seconds === 0) {
            dispatch(isTimeup("yes"))
        }
    },[preset_time, preset_seconds])



    useEffect(() => {

        let time = {
            custom_time: custom_time,
            custom_seconds: custom_seconds
        }
        dispatch(addCustomTime(time))

    }, [custom_time, custom_seconds])



    useEffect(() => {
        let time = {
            preset_time: preset_time,
            preset_seconds: preset_seconds
        }
        dispatch(addPresetTime(time))
    }, [preset_time, preset_seconds])



    return (      
        <Grid.Container gap={0.5}>
            <Grid>
                <label>
                    Pick time:{" "}
                    <select id={styles.timer} disabled={get_typed_text.length > 0} value={selected} onChange={handleTimeChange}>
                        <option value="1">1 min</option>
                        <option value="2">2 mins</option>
                        <option value="5">5 mins</option>
                        <option value="custom">custom</option>
                    </select>
                </label>
            </Grid>
            {
            selected === "custom" && 
            <Grid>
                <input 
                    type="number" 
                    min={0}
                    max={10}
                    id={styles.custom}
                    disabled={get_typed_text.length > 0}
                    value={selected_custom_time}
                    onChange={handleCustomTime}
                />
            </Grid>
            }
            {
                selected === "custom" ?
                <Grid>
                    { custom_time } : {custom_seconds < 10 ? `0${custom_seconds}` : custom_seconds}
                </Grid>
                :
                <Grid>
                    { preset_time } : {preset_seconds < 10 ? `0${preset_seconds}` : preset_seconds}
                </Grid>
            }
            

        </Grid.Container>
    );
}
