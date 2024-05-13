import { animate } from "framer-motion";

export const buttonClick = {
    whileTap : {scale:0.90}
};
export const Fadeinout = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

export const slideTop={
    initial:{opacity:0,y:30},
    animate:{opacity:1,y:0},
    exit:{opacity:0,y:30}
}

export const unknowFadeInout =(i)=>{
    
    return {
        initial:{opacity:0,y:50},
        animate:{opacity:1,y:0},
        exit:{opacity:0,y:50},
        transition:{duration:0.3,delay:1*0.15},
        key:{i},



    };
}