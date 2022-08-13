import { useAppSelector } from '../../app/hooks';
import { selectTotalScore, selectChallengeScore } from '../score/scoreSlice';

import { Text } from "@nextui-org/react";



export default function Score() {

    const get_total = useAppSelector(selectTotalScore);
    const get_score = useAppSelector(selectChallengeScore);

    return (      
        <>
            <Text h6 size={15} color="black" css={{ m: 0 }}>
                Score: {get_score} / {get_total}
            </Text>
        </>
    );
}