import React from 'react';
import s from "./TreeAnimalCarousel.module.css";
import { useUserAnimalData } from '@/hooks/useUserAnimals';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default function TreeAnimalCarousel({ session, width = '800px', spacing = '1rem' }) {
    const { data, status } = useUserAnimalData(session.user.id);

    const [{ x }, set] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2;
        const dir = xDir < 0 ? -1 : 1;  // Direction of drag
        set({ x: down ? mx : trigger ? dir * window.innerWidth : 0 });
    });

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'error') return <div>Error...</div>;

    return (
        <div className={s.container} style={{ maxWidth: width }}>
            <div className={s.content}>
                <animated.div {...bind()} className={s.carousel} style={{ x }}>
                    <div className={s.items}>
                        {data.map((animal) => (
                            <div key={animal.animal_id} className={s.item} style={{ margin: spacing }}>
                                {animal.animal_name}
                            </div>
                        ))}
                    </div>
                </animated.div>
            </div>
        </div>
    );
}
